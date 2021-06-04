import Navbar from "../Navbar";
import React  from 'react'
import axios from 'axios'
import { Table } from 'reactstrap';
const UserList = () => {
    const [orderList, setorderList] = React.useState()


    React.useEffect(()=>{
        const getUsers =()=>{
            axios.get("http://localhost:5000/users")
            .then(res=>{
                console.log(res.data)
                const data=res.data;
                setorderList(data)
            })
        }
        getUsers()
    },[])


    return ( 
        <>
        <Navbar/>
        <div className=" my-2">
            <div className="col-md-8 m-auto ">
           
            <div style={{overflowX:"auto"}} className="bg-light">
            <Table >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Foydalanuvchi ismi</th>
                      <th>to'plagan bali</th>
                      <th>Faolliklar</th>
                      <th>kirgan sanasi</th>
                    </tr>
                  </thead>{
                        orderList && orderList.map((item,index)=>(
                        <tbody key={item.id} id="tableROW" >
                          <tr >
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>1,432 bal</td>
                            <td>15 martta</td>
                            <td>15.05.2021</td>
                          </tr>
                        </tbody>
                        ))}
                      </Table>
                    </div>
           
              </div>
        
       
        
        </div>
      </>       
     );
}
 
export default UserList;