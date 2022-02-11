import React, { Component } from 'react'
import Navbar from "../Navbar";
import { Card, Avatar, Input, Typography, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import axios from 'axios';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const Profile = () => {
   const [state, setState] = React.useState({ 
     userName:'',
     isLoggedIn: false,
     messages: [],
     messageDate: []
     });

   const sendData = (value) => {
    let payload =
    {
      user: state.userName,
      message: value
    }
    if (payload.message != 0) {
      axios.post("http://localhost:5000/chat", payload);
    }
  }
 const getData = () => {
    axios.get("http://localhost:5000/chat")
      .then(res => {
        setState({
          messageDate: res.data
        })
      })
  }
  const onButtonClicked = (value) => {
    client.send(JSON.stringify({
      type: "message",
      msg: value,
      user: state.userName
    }));

    sendData(value);
    
   
    const d = new Date();
    console.log(d.getTime() + "clock")
   
    setState({ searchVal: '' })
    window.scrollBy(0, 100);
  }

  React.useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    getData();
    
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer.msg);

      if (dataFromServer.type === "message" && dataFromServer.msg != 0) {
        setState((state) =>
        ({messages: [...state.messages,{
            msg: dataFromServer.msg,
            user: dataFromServer.user
          }]
        }))
      }
    }
  }, [])
    return (
    <>
      <Navbar />
      <div className="title">
         <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Websocket Private Chat: {localStorage.getItem('Username')}</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: "50%", margin: "0 auto", paddingBottom: 50 }} id="messages">
                {state.messageDate && state.messageDate.map((message, index) =>
                  <Card
                    key={index}
                    style={{
                      width: 300, margin: '16px 4px 0 4px',
                      alignSelf: state.userName === message.user ? 'flex-end' : 'flex-start'
                    }}
                    loading={false}>
                    <Meta
                      avatar={
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user ? message.user[0].toUpperCase() : message.user}</Avatar>
                      }
                      title={message.user + ":"}
                      description={message.message}
                    />
                    {
                      (state.userName !== message.user ) ?
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
                  <Card key={index} style={{ width: 300, margin: '20px 4px 0 4px', paddingBottom: '4rem', alignSelf: state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
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
                    value={state.searchVal}
                    size="large"
                    onChange={(e) => setState({ searchVal: e.target.value })}
                    onSearch={value => onButtonClicked(value)}
                  />
                </div>
              </div>



    </>
  );
}

export default Profile;