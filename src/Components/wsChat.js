import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import Navbar from './Navbar';
import axios from 'axios';
import { GoNoNewline } from 'react-icons/go';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class WsChat extends Component {

  state = {
    userName: '',
    isLoggedIn: false,
    messages: [],
    messageDate: [],
    isShow: false,
    modal1Visible: false,
    modal2Visible: false
  }


  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible })
  }

  sendData = (value) => {
    let payload =
    {
      user: this.state.userName,
      message: value
    }
    if (payload.message != 0) {
      axios.post("http://localhost:5000/chat", payload);
    }
  }
  getData = () => {
    axios.get("http://localhost:5000/chat")
      .then(res => {
        this.setState({
          messageDate: res.data
        })
      })
  }

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
      type: "message",
      msg: value,
      user: this.state.userName
    }));
    this.sendData(value);
      console.log(this.state.messageDate.user);
    const d = new Date();
    console.log(d.getTime() + "clock")
    this.setState({ searchVal: '' })
    window.scrollBy(0, 100);
  }
  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.getData();

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer.msg);

      if (dataFromServer.type === "message" && dataFromServer.msg != 0) {
        this.setState((state) =>
        ({
          messages: [...state.messages,
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user
          }]
        }))
      }
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main" id='wrapper' >
          {this.state.isLoggedIn ?
            <div>
              <div className="title">
                <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Websocket Chat: {this.state.userName}</Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: "50%", margin: "0 auto", paddingBottom: 50 }} id="messages">
                {this.state.messageDate && this.state.messageDate.map((message, index) =>
                  <Card
                    key={index}
                    style={{
                      width: 300, margin: '16px 4px 0 4px',
                      alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start'
                    }}
                    loading={false}
                    onMouseLeave={() => {this.setState({ isShow: false});}}
                    onMouseEnter={(e) => {this.setState({ isShow: true });localStorage.setItem("ProfileName",message.user)}}>
                    <Meta
                      avatar={
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user ? message.user[0].toUpperCase() : message.user}</Avatar>
                      }
                      title={message.user + ":"}
                      description={message.message}
                    />
                    {
                      (this.state.userName !== message.user && this.state.isShow) ?
                        <div>
                          <button
                            className="hoverme" href="#"
                            onClick={() => {this.setModal1Visible(true);}}
                            style={{ float: "right", display: "block", border: 0, backgroundColor: "white",  color: "blue" }}>View Profile
                          </button> 
                          
                          <button
                            className="hoverme" href="#"
                            style={{ float: "right", display: "block", border: 0, backgroundColor: "white", textDecoration: 'underline', color: "blue" }}>Reply
                          </button>
                         </div>
                        : ' '
                    }
                  </Card>
                )}
                {this.state.messages.map((message, index) =>
                  <Card key={index} style={{ width: 300, margin: '20px 4px 0 4px', paddingBottom: '4rem', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
                    <Meta
                      avatar={
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                      }
                      title={message.user + ":"}
                      description={message.msg}
                    />
                  </Card>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <div className="bottom">
                  <Search
                    id="send"
                    placeholder="input message and send"
                    enterButton="Send"
                    value={this.state.searchVal}
                    size="large"
                    onChange={(e) => this.setState({ searchVal: e.target.value })}
                    onSearch={value => this.onButtonClicked(value)}
                  />
                </div>
              </div>
            </div>
            :
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
              <div style={{ paddingTop: "200px", width: "40%" }}>
                <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>
                  Wellcome to our real-time Chat
                </Text>
                <Search
                  placeholder="Enter Username"
                  enterButton="Login"
                  size="large"
                  onSearch={value => this.setState({ isLoggedIn: true, userName: (value) ? value : (localStorage.getItem("Username")) })}
                />
              </div>
            </div>
          }
        </div>

        <Modal
          title={`User : ${localStorage.getItem("ProfileName")}`}
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => {this.setModal1Visible(false);localStorage.removeItem('ProfileName');}}
          onCancel={() => {this.setModal1Visible(false);localStorage.removeItem('ProfileName');}}
        >
          <div style={{ marginLeft: "3rem" }}>
            <Card style={{ width: 350, margin: '16px 4px 0 4px', display: "flex" }} loading={false} >
              <Meta avatar={<Avatar size={50} style={{ backgroundColor: '#87d068', }} >X</Avatar>}
                title={`${localStorage.getItem('ProfileName')}`}
                description={"bio: zero to hero"}
              />
              <div style={{ float: "right", margin: "1.2rem 3rem" }}>
                <Button type="link" onClick={()=>{localStorage.removeItem('ProfileName');}}>Send Message </Button>
              </div>
            </Card>
          </div>
        </Modal>
      </div>
    )
  }
}

export default WsChat;