import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css";
import Registr from "./Components/registr";
import Admin from "./Components/Dashboard/Admin";
import Ask from "./Components/Dashboard/ask";
import Home from "./Components/Home.jsx";
import Users from "./Components/Modal/users";
import Answer from "./Components/answer";
import {MdLanguage} from 'react-icons/md';
import {IoMdArrowDropdown} from 'react-icons/io';
import React  from 'react';
import { useTranslation } from 'react-i18next';
import Rules from "./Components/rule/rules";
import UserList from "./Components/userList/userList";
import Activity from "./Components/activities/activity";
import WsChat from "./Components/wsChat";
import Profile from "./Components/chat/Profile"
const lngs = {
  uzb: { nativeName: 'Uzbek' },
  rus: { nativeName: 'Russian' },
  eng: { nativeName: 'English'},
};

const App=()=> {
  const [Lang, setLang] = React.useState(false)
  const {i18n} = useTranslation();
  const admin = localStorage.getItem("isAdmin")
  return (
    <>
     <Router>
     <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/registr" component={Registr}/>
          <Route exact path="/admin" component={(admin==="true")?Admin:Home}/> 
          <Route exact path="/query" component={Ask}/>
          <Route exact path="/answer/:id" component={Answer} />
          <Route exact path="/undefined" component={Users}/>
          <Route exact path="/rule" component={Rules}/>
          <Route exact path="/userList" component={UserList}/>
          <Route exact path="/activity" component={Activity}/>
          <Route exact path="/chat" component={WsChat}/>
          <Route exact path="/profile" component={Profile}/>
      </Switch>
   </Router>
   
             
   <div className="d-flex justify-content-end ">
       {Lang &&
       <div className="d-flex bg-secondary rounded position-absolute " 
            style={{justifyContent:"flex-end",flexDirection:"column",width:"7rem",top:"5rem",}}>
            {Object.keys(lngs).map((lng) => (
               <button key={lng} 
               className="btn text-light"
               style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} 
               type="submit" onClick={() => {i18n.changeLanguage(lng);setLang(false)}}>
               {lngs[lng].nativeName}
               </button>
            ))}
         </div>}
       </div>
         <div className="btn-group position-absolute mr-1" style={{top:"2rem",right:"0"}} >
            <button className="btn d-flex text-white" onClick={()=>setLang(!Lang)} aria-current="page">
               <MdLanguage  color="white" fontSize="1.2rem"/>   
               <IoMdArrowDropdown  color="white"/>   
            </button>
            </div>    
           
    </>
  );
}
export default App;