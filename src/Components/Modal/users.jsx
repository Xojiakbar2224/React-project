import { Modal } from "bootstrap";
import Navbar from "../Navbar";
import Search from "../search";
import React, { useState } from 'react'

const Users = () => {
const [state, setstate] = useState(false)
console.log(state)
return ( 
        <>
         <Navbar/>
         <div className="container ">
              <div className="row">
                  <div className="col-md-8">
                    <div className="alert alert-danger text-dark mt-3" role="alert">
                       Iltimos, savol berish uchun saytga kiring yoki 
                       <a href="http://localhost:3000/registr"> ro‘yxatdan o‘ting</a> 
                    </div>

                    {state && <Modal/>}
  
                  </div>
                  <div className="col-md-4">
                      <Search/>
                  </div>
              </div>
          </div>
        </>
     );
}
 
export default Users;