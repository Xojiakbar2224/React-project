import Navbar from "./Navbar"
import {useState,useEffect,useRef} from 'react'
import axios from "axios";
import Search from "./search";
import { Collapse, Button, CardBody, Card ,ButtonGroup} from 'reactstrap';
import * as yup from 'yup';
import {useFormik} from 'formik'
import { Toast, ToastBody, ToastHeader ,Jumbotron} from 'reactstrap';  
import {useParams} from 'react-router-dom'
import {Rating} from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ThumbUpAltSharp from "@material-ui/icons/ThumbUpAltSharp"
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser'
import clip from "text-clipper"
import { Trans } from 'react-i18next';
import {AiFillLike} from 'react-icons/ai'
import {RiImageAddFill} from 'react-icons/ri'
const validationSchema=yup.object({
  text:yup.string().required("Javob kiritilmadi"),})
  
  const Answer = () => {
    const [value, setValue] = useState(0);
    const {id} = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [state, setstate] = useState()
    const [answer, setAnswer] = useState()
    const [count, setcount] = useState(0)
    const isUser = localStorage.getItem('isUser')
    const userName = localStorage.getItem('Username')
    const [values, setValues] = useState("")
    const [like, setlike] = useState(false);
    const [imgUrl, setImgUrl] = useState({})
    const mystyle={width: "95%",height:"500px",overflowY:"scroll"}
    const editorEl = useRef(null);
     
        const formik = useFormik({
          initialValues:{
            text: "",
            users:localStorage.getItem('Username'),
            selectId:id 
          },
          onSubmit:values=>{ 
            return(values.text='')},
          validationSchema
          })
        const toggle = ()=>{(isUser) ? setIsOpen(!isOpen) : alert("Javob yo'llash uchun ro'yhatdan o'ting")}

        const handleCLickShow=()=>{
            const show=document.getElementById('inputValues').innerText;
            formik.values.text=show
        }
        const putDataAnswer=()=>{
              handleCLickShow()
              axios.post(`http://localhost:5000/answer`,{...formik.values,imgUrl})
              .then(res=>{
                  console.log("data->",res.data)})
              toggle()
              axios.put(`http://localhost:5000/question/${id}`,{...state,answerCounts:count+1})
              .then(res=>{
                const finish_result=res.data
                  setstate(finish_result)
         })
              }
        const  getQuestionById=()=>{
                 axios.get(`http://localhost:5000/question/${id}`)
                  .then(res=>{
                    const finish_result=res.data
                     setstate(finish_result)
                  })
                  }
        const getDataAnswer=()=>{
                 axios.get(`http://localhost:5000/answer`)
                 .then(res=>{
                     const result=res.data.filter(item=>item.selectId===id)
                     result.reverse();
                     setcount(result.length)
                     setAnswer(result)
                    }).catch(err=>console.log(err))}

        const setStyleFunction=()=>{
          axios.get(`http://localhost:5000/question/${id}`)
            .then(res=>{
              const resData=res.data;
              if(resData.LikedUser&&resData.LikedUser.includes(userName)){
                setlike(true)
                console.log("likedUser",resData.LikedUser)
              }
            })
        }            
              useEffect(()=>{
                getQuestionById()
                getDataAnswer()
                setStyleFunction()
              },[])
        const handleClickLike=()=>{
          if(isUser){
          const payload={
            ...state,
            LikedUser:state.LikedUser+=userName,
            votes:state.votes+1
          }
          axios.put(`http://localhost:5000/question/${id}`,payload)
          .then(res=>{
            const finish_result=res.data
              setstate(finish_result);
              setlike(!like);
              alert("Siz like tugmasini bosdingiz tashakkur")
              
            }) 
          }
        }
        const handleInputChange = (e) => {
          const selected = e.target.files[0];
          setImgUrl(selected)
        };
        const onImageUpload=()=>{
          const formData = new FormData();
          formData.append( "image",imgUrl);
         
          axios.post("http://127.0.0.1:8000/image/",formData)
          .then(res=>{
              console.log("data",res.data)
              const result=res.data;
              setImgUrl(result)
          })
        }
        
        
    return (  
        <>
        <Navbar/>
        <div className="container-fluid">
            <div className="row mt-1">
            <div className="col-md-10 m-auto">
              {/* savol ro'yhati */}
            {state && 
                    <div className="div ">
                      <div className=" mb-n1 m-auto p-1 col-md-10 text-light border-0" role="alert" style={{backgroundColor:"#3498DB"}}>
                         <h4 className=""><a href="/" className="text-light text-capitalize">{clip(state.title,60)}</a></h4>
                      </div>
                      {/* selected question */}
                      <div className="col-md-10 d-flex p-1 m-auto" 
                          style={{alignItems:"flex-start",justifyContent:"flex-start",flexDirection:"column"}}>
                          <Jumbotron className="w-100 mb-n1" style={{overflowWrap: "break-word"}}>
                            <h5 className="text-success">
                            <Trans i18nKey="answer.query">Savol:</Trans>
                              </h5>
                            <code className="lead">
                              {state.query}
                              {state.imgUrl && 
                              <img src={state.imgUrl.image} alt=""/>
                              }
                            </code>
                            <hr className="my-2" />
                            <p>                     
                              <Trans i18nKey="answer.query1">Savol Muallifi: </Trans>
                              <a> { state.user}</a></p>
                            <span className="lead d-flex" style={{justifyContent:"space-between"}}>
                            <Button type="button"color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
                              <Trans i18nKey="answer.queryAnswer">Javob berish</Trans>
                            </Button>
                              <span className="d-flex mr-5">
                                <span>
                                 { !like
                                 ?
                                 <a  onClick={handleClickLike} >
                                    <Tooltip className="mt-2" title="Delete">
                                        <IconButton aria-label='delete'>
                                        <ThumbUpAltSharp/>
                                        </IconButton>
                                    </Tooltip>
                                   </a>
                                 :
                                 <a  disabled onClick={handleClickLike}>
                                   <Tooltip className="mt-2" title="Add Like">
                                        <IconButton aria-label='like'>
                                        <ThumbUpAltSharp color="primary"/>
                                        </IconButton>
                                    </Tooltip>
                                   </a>
                                 }
                                </span>
                              </span>
                            </span>
                          </Jumbotron>
                          {/* Javob berish Collapse */}
                        <div className="col m-auto" role="group" aria-label="Basic mixed styles example">
                               <Collapse isOpen={isOpen}>
                                <Card>
                                    <CardBody>
                                    <form className="w-100" onSubmit={formik.handleSubmit}>
                                    <label htmlFor="floatingTextarea">
                                      <h4>
                                     <Trans i18nKey="answer.answer1">Sizning javobingiz</Trans>
                                      </h4>
                                      <div className="d-flex w-100">
                                        <input type="file" className=" bg-secondary text-white p-1" onChange={handleInputChange} />
                                        <button className="btn btn-dark rounded" onClick={onImageUpload}>
                                            <RiImageAddFill/>
                                        </button>
                                    </div>
                                      </label>
                                    <CKEditor
                                      ref={editorEl}
                                      editor={ClassicEditor}
                                      config={{
                                          placeholder: "placeholder",
                                          link: {
                                              decorators: {
                                                  checkClass: {
                                                      mode: "automatic",
                                                      callback: function(url) {
                                                          setTimeout(function() {
                                                              // valid class list
                                                              var validClassList = ["style1", "style2"];

                                                              // var linkElement = $(".ck.ck-content").find("a[href*='" + url + "']");
                                                              var content = document.querySelector(".ck.ck-content");
                                                              var linkElement = content && content.querySelector("a[href*='" + url + "']");

                                                              // split the linked class in the current link
                                                              // var splitClass = linkElement.attr("class").split(" ");
                                                              var splitClass = linkElement && linkElement.getAttribute("class").split(" ");

                                                              var commonClass =
                                                                  validClassList &&
                                                                  validClassList.filter(value => -1 !== (splitClass && splitClass.indexOf(value)));

                                                              if (commonClass.length) linkElement && linkElement.classList.remove("defaultClass");
                                                              else linkElement && linkElement.classList.add("defaultClass");
                                                          }, 500);

                                                          return true;
                                                      },
                                                      attributes: {
                                                          class: "defaultClass"
                                                      }
                                                  },
                                                  addClassStyle1: {
                                                      mode: "manual",
                                                      label: "Custom",
                                                      attributes: {
                                                          class: "highlight-link"
                                                      }
                                                  },
                                                  addClassStyle2: {
                                                      mode: "manual",
                                                      label: "Custom-2",
                                                      attributes: {
                                                          class: "custom-link-2"
                                                      }
                                                  }
                                              }
                                          }
                                      }}
                                      data={value}
                                      onChange={(event, editor) => {
                                          setValues(editor.getData())    
                                      }}/>
                                    <div 
                                          name="text"
                                          value={formik.values.text}
                                          className="border "
                                          style={{maxWidth:"200rem",overflowWrap: "break-word"}} 
                                          onChange={(e)=>formik.handleChange(e)} 
                                          id="inputValues">
                                          {ReactHtmlParser(values)}
                                      </div>           
                                    </form>
                                    </CardBody>
                                    <ButtonGroup className="w-50 pb-3 pl-3">
                                        <Button type="submit" onClick={putDataAnswer} color="primary">
                              <Trans i18nKey="answer.queryAnswer">Javob berish</Trans>
                                      </Button>
                                        <Button color="danger" onClick={toggle}>
                              <Trans i18nKey="answer.reject">bekor qilish</Trans>
                                      </Button>
                                    </ButtonGroup>
                                </Card>
                              </Collapse>
                        </div>
                      </div>
                    </div> }
                      {
                         (count!==0) ? 
                        <div className="col-lg-10 m-auto p-2 mb-5">
                        <div className="  m-auto  p-1  border-0 bg-primary"
                         role="alert">
                          <h4 ><a href="/" className="text-light text-capitalize">
                            <Trans i18nKey="home.answers">Javoblar</Trans>
                            </a></h4>
                        </div>
                        <div className="border bg-light m-auto w-100" style={answer && mystyle}>
                            {answer && answer.map((item,index)=>(
                              <div key={index} className="p-3  rounded  bg-light">
                              <Toast style={{maxWidth:"100%", margin:"0 auto"}}>
                                <ToastHeader className="d-flex" style={{flexDirection:"row"}}>
                                <h5> {index+1}. <Trans i18nKey="answer.answered">Javob berdi</Trans>: <a href={`/answer/${id}`}> {item.users}</a></h5>
                                </ToastHeader>
                                <ToastBody>
                                  <Trans i18nKey="answer.answer">Javob</Trans>: {item.text}
                                  {item.imgUrl && 
                                  <img src={item.imgUrl.image} width="50%" alt=""/>
                                  }
                                </ToastBody>
                                <ToastBody className="d-flex w-25 float-right" style={{justifyContent:"flex-end"}}>
                                    <Tooltip className="mt-2" title="Spam">
                                      <IconButton aria-label='delete'>
                                        <DeleteIcon onClick={()=>{alert("Your request has been sent to the admin")}} color="secondary" />
                                      </IconButton>
                                    </Tooltip>
                                </ToastBody>
                              </Toast>
                            </div> )
                            )} 
                        </div>
                    </div>
                        :null
                      }
                    </div>
            {/* <div className="">
                <Search/>
            </div> */}
            </div>
        </div>
        </>
    );
}
 
export default Answer;