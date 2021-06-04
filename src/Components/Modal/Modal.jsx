import './modal.css'
import { Link } from 'react-router-dom';
import  axios  from 'axios';
import { Alert } from 'reactstrap';
import * as yup from 'yup';
import {useFormik} from 'formik'

const initialValues={
    username:"",
    password:"",
    }
const validationSchema=yup.object({
        username:yup.string().required("Ismingizni kiriting"),
        password:yup.string().required("Parolingizni kiriting "),
    })
const Modal = (props) => {   
   const formik = useFormik({
    initialValues,
     onSubmit: values=>{
        props.setshow(false)
      
    },
     validationSchema
    })  
    const getUsers=(values)=>{
         axios.get("http://localhost:5000/users")
        .then(res=>{
            const result=res.data;
            result.filter((item)=>{
           if(item.name===values.username && item.password===values.password)
            {
                localStorage.setItem(`isUser`, true);
                localStorage.setItem("Username",values.username);
                localStorage.setItem("isAdmin",item.admin);
                console.log("adadkkk",item)
            }
            else return null
            }) })
            .catch(err=>console.log("errormassage=>",err))
        }
  

return (
    <>
    <div className="position-absolute d-flex" style={{width:"100%",height:"100vh",zIndex:"999",backgroundColor:"rgba(0,0,0,0.7)",justifyContent:"center"}} >
        
    <div className="modalContainer position-absolute  " 
         style={{zIndex:"1", marginLeft:"0rem"}}>
             <button onClick={()=>props.setshow(false)} className="btn btn-danger position-absolute mr-2 mt-2" style={{right:"0rem"}}>
                  X
             </button>
         <form className="bg-dark" onSubmit={formik.handleSubmit}>
             <ul>
                 <li>
                   <input 
                   className="form-control"
                    id="exampleFormControlInput1"
                     type="text"
                     placeholder="Foydalanuvchi ismi yoki gmail" 
                     name="username"
                     value={formik.values.username}
                     onChange={(e)=>formik.handleChange(e)}
                     onBlur={formik.handleBlur}
                     />
                     { formik.touched.username && formik.errors.username?
                         <div className="alert alert-danger" role="alert">
                             {formik.errors.username}
                         </div>: null}
                 </li>
                 <li>
                   <input 
                   className="form-control"
                    id="exampleFormControlInput2"
                     type="password" 
                     placeholder="parol" 
                     name="password"
                     value={formik.values.password}
                     onChange={(e)=>formik.handleChange(e)}
                     onBlur={formik.handleBlur}
                     />
                     { formik.touched.password && formik.errors.password?
                         <Alert color="danger">
                             {formik.errors.password}
                         </Alert>: null}
                 </li>
                 <li>
                     <button type="Submit" onClick={getUsers(formik.values)}  className="btn btn-primary btn-block" >Kirish</button>
                 </li>
                 <li>
                    <Link to="/registr" className="text-decoration-none"> 
                      <button className="btn btn-success btn-block " onClick={()=>props.setshow(false)}>Ro'yhatdan o'tish</button>
                    </Link>
                 </li>
             </ul>
         </form>
     </div> 
    </div>
   </> )}
 
export default Modal;


