import { FaKey } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiFillTag } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import {Link} from "react-router-dom"
import Modal from './Modal/Modal'
import {useState} from 'react'
import LoginModal from "./Modal/LoginModal";
import { useTranslation, Trans } from 'react-i18next';
const Navbar = () => {
   const [show, setshow] = useState(false)
   const isUser = localStorage.getItem('isUser')
   const userName = localStorage.getItem('Username')
   const showFunction =()=>{
      setshow(!show)
   }
   
   return ( 
        <>
        <nav className="navbar  navbar-expand-md bg-dark">   
         <div className="container-fluid">
            <Link className="navbar-brand text-white  " to="/" >Fido_Bizness </Link> 
         <div className="collapse navbar-collapse ">  
         <div className="navbar-nav text-center ">
               
               <Link to="/activity" className="nav-link  ">
                  <span ><FiActivity/>
                  <Trans i18nKey="navbar.link1">Faolliklar</Trans>
                  </span>
               </Link>
               <Link to='/' className="nav-link  ">
                  <span> <HiMenuAlt2/>
                  <Trans i18nKey="navbar.link2">Savollar</Trans></span>
               </Link>

               <Link to="/" className="nav-link  ">
                   <span> <AiFillTag/>
                   <Trans i18nKey="navbar.link3">Tegs</Trans>
                  </span>
               </Link>
               
               <Link to="/userList" className="nav-link"><span> 
                  <FaUsers/><Trans i18nKey="navbar.link4">Foydalanuvchilar</Trans></span>
               </Link> 
               
               <Link to={(isUser&&userName)?"/query":"/undefined"} className="nav-link text-success ">
                  <span> 
                     <FaQuestion/>  
                     <Trans i18nKey="navbar.link5">Savol berish</Trans>
                  </span>
               </Link>
               
               <Link to="/rule" className="nav-link  ">
                  <span>
                     <GoLaw/>
                        <Trans i18nKey="navbar.link6"> Qoidalar</Trans>
                     </span>
               </Link>
         </div>
            <div className="navbar "   >
               <button  className="w-100 rounded border-0 overflow-hidden" onClick={showFunction}>
                  <FaKey/>
                  {(isUser && userName) ? userName : "Kirish"}
               </button>
            </div>                           
            <div className="navbar "   >
               
            </div>                           
            
            </div>      
         </div>
         <div>
        </div>
       
       </nav>
      
         {show && !isUser && <Modal setshow={setshow}/>}
         {show && isUser && <LoginModal/>}
       </>);}
 
export default  Navbar;