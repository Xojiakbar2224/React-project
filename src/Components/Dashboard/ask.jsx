import Navbar from "../Navbar";
import Search from "../search";
import axios from "axios";
import React from 'react';
import * as yup from 'yup';
import {useFormik} from 'formik'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser' 
import {RiImageAddFill} from 'react-icons/ri'
const Ask = () => {
    const editorEl = React.useRef(null);
    const [value, setValue] = React.useState("")
    const [imgUrl, setImgUrl] = React.useState({})
    const isUser = localStorage.getItem('isUser')
    const initialValues={
            title: "",
            query: "",
            tags: "",
            viewsCount: 0,
            answerCounts: 0,
            votes: 0,
            user:localStorage.getItem("Username"),
            status:false
        }
    const validationSchema=yup.object({
            title:yup.string().required("Savolni kiritishingiz zarur"),
            tags: yup.string().required("Tag mavjud emas"),          
        })
        console.log("imagaaadad",imgUrl)
    const formik = useFormik({
            initialValues,
             onSubmit: values=>{
                getQuery()
                return(values.title='', setValue(''),values.tags='')
            },
            validationSchema
            })
    const getQuery=()=>{
         axios.post("http://localhost:5000/question",{...formik.values,imgUrl})
        .then(res=>{
            const result = res.data;
            console.log("ad",res.data)
        })
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
    React.useEffect(()=>{
            const handleCLickShow=()=>{
                const show=document.getElementById('inputValues').innerText;
                formik.values.query=show
            }
            handleCLickShow()
          })
          
    return ( 
        <>
        <Navbar/>
      { isUser && <div className="container-fluid" style={{height:"auto",backgroundColor:"#99B0AA"}} >
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="">
                    <div className=" mb-n1 p-1 text-light border-0" role="alert" style={{backgroundColor:"#3498DB"}}>
                     <h3>Savol berish</h3>
                    </div>

                    <div style={{backgroundColor:"rgb(228, 231, 231)"}}>
                    <form 
                        onSubmit={formik.handleSubmit} 
                        className=" bg-light p-4 mt-1 mb-5" 
                        noValidate
                        >
                        <div className="mb-3">
                            <label className="form-label"><h5>Savol sarlavhasi:</h5></label>
                            <input
                                className="form-control"
                                label="Savol sarlavhasini kiriting"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                type="text" 
                                name="title"
                                value={formik.values.title}
                                onChange={(e)=>formik.handleChange(e)}
                                onBlur={formik.handleBlur}
                            />
                             { formik.touched.title && formik.errors.title?
                                <div className="alert alert-danger" role="alert">
                                    {formik.errors.title}
                                </div>: null}
                        </div>
                       <div className="mb-3 ">
                       <label htmlFor="exampleInputPassword1" className="form-label">
                            <h5>Savol haqida to‘liqroq ma‘lumot:</h5>
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
                               
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                
                                config={{
                                    placeholder: "Savol...",
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
                                setValue(editor.getData())
                            }}
                        />
                        </div>
                        <div className="mb-3">
                            <div 
                                name="query"
                                value={formik.values.query}
                                className="border "
                                style={{maxWidth:"200rem",overflowWrap: "break-word",height:"100px",overflow:"scroll"}} 
                                onChange={(e)=>formik.handleChange(e)} 
                                id="inputValues">
                             {ReactHtmlParser(value)}
                            </div>        
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><h5>Teglar - so‘zlarni biriktirish uchun chiziqdan foydalaning(masalan: dasturlash-tili):</h5></label>
                            <input 
                            type="text"
                            className="form-control"
                            name="tags"
                            value={formik.values.tags}
                            onChange={(e)=>formik.handleChange(e)}
                            onBlur={formik.handleBlur}
                            />
                        </div>   
                         <button 
                            type="submit"
                            variant="contained" color="primary"
                            className="btn btn-success text-light" 
                            >Savol berish
                        </button>
                        </form>
                    </div>

                    </div>            
                    <div className="col-md-4 mt-2 ml-0">
                        <Search/>
                    </div>             
                </div>
            </div>
        </div>}
        </>
     );
}
 
export default Ask;