import Search from './search'
import axios from 'axios'
import * as yup from 'yup';
import{useHistory} from 'react-router-dom'
import {useFormik} from 'formik'
        const initialValues={
            name:"",
            password:'',
            email:"" ,
            admin:false ,
            user:"" 
        }

    const validationSchema=yup.object({
        name:yup.string().required("Foydalanuvchi ismi bo‘sh bo'lishi mumkin emas"),
        password:yup.string().required("Parol uzunligi 4 dan kam bo‘lmasligi kerak"),
        email: yup.string()
        .email("email address kiritishda xatolik bor")
        .required("Elektron manzil kerak - kiritilmagan")
    })

 const Form = () => {
    let history = useHistory();
    const formik = useFormik({
        initialValues,
        onSubmit: values=>{postRequest(values);
            localStorage.setItem(`isUser`, true);
            localStorage.setItem(`Username`,values.name);
            history.push("/");
            return (values.name="", values.email="",values.password="")
        },
        validationSchema
    })
    
    async function postRequest(e){
        await axios.post("http://localhost:5000/users",formik.values);
    }
    return ( 
        <>
        <div className="container-fluid" style={{backgroundColor:"#ECF0F1",height:"100vh"}} >
            <div className="row ">
                <div className="col-md-10 d-flex m-auto ">
                    <div className="col-md-8 mt-2">
                    
                        <div className=" mb-n1 p-2 text-light border-0" role="alert" style={{backgroundColor:"#3498DB"}}>
                            <h4>Yangi foydalanuvchini ro‘yxatdan o‘tkazish</h4>
                        </div>
                    <form onSubmit={formik.handleSubmit} className="bg-light p-4 mt-1 g-3 needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="validationCustom01" className="form-label">Foydalanuvchi ismi:</label>
                            <input 
                                type="text" 
                                id="validationCustom01"
                                className="form-control" 
                                onChange={(e)=>formik.handleChange(e)}
                                name="name"
                                value={formik.values.name}
                                required
                                onBlur={formik.handleBlur}
                            />
                            { formik.touched.name && formik.errors.name?
                                <div className="alert alert-danger" role="alert">
                                    {formik.errors.name}
                                </div>: null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Parol:</label>
                            <input type="password" className="form-control" 
                                onChange={(e)=>formik.handleChange(e)}
                                id="exampleInputPassword1"
                                name="password"
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            { formik.touched.password && formik.errors.password?
                                <div className="alert alert-danger" role="alert">
                                    {formik.errors.password}
                                </div>: null}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">Elektron manzilingizni kiriting:</label>
                            <input 
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(e)=>formik.handleChange(e)}
                                name="email"
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                                { formik.touched.email && formik.errors.email?
                                <div className="alert alert-danger" role="alert">
                                    {formik.errors.email}
                                </div>: null}
                            <div id="emailHelp" className="form-text">Mahfiylik: Sizning e-mail manzilingiz unchinchi shaxslarga berilmaydi va ko`rsatilmaydi.</div>
                        
                        </div>
                        <div className="mb-3 form-check p-2 w-50  ">
                            <input 
                            type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                                <button type="submit"   className="btn btn-primary" >Submit</button>
                        </form>    
                    </div>            
                    
                    <div className="col-md-4 mt-2 ml-0">
                        <Search/>
                    </div>            
                </div>
            </div>
        </div>

        
        </>
     );
}
 
export default Form;