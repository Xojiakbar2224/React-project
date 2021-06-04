import {FaUserAlt} from 'react-icons/fa'
import {ImSwitch} from 'react-icons/im'
import {RiMoneyDollarCircleLine} from 'react-icons/ri'
import Box from '@material-ui/core/Box';

const LoginModal = () => {
    const username = localStorage.getItem('Username')
    const handleClick=()=>{
        localStorage.removeItem('isUser')
        localStorage.removeItem('Username')
        localStorage.removeItem('isAdmin')
        console.log("local")}
    return ( 
       <>
        <div className="bg-dark position-absolute" style={{zIndex:"999",width:"15%",right:"2rem"}}>
            <Box  className="text-center w-100 p-2 text-white" style={{backgroundColor:"#34495E"}}>
                <span className="d-flex" style={{alignItems:"center" ,justifyContent:"space-around"}}> <FaUserAlt/> salom <a href="/" className="text-white">{username}</a></span>
            </Box>
            <Box color="text.primary w-100" className="text-center p-2 text-white" style={{backgroundColor:"#34495E"}}>
                <span className="d-flex ml-2" style={{alignItems:"center"}}> <RiMoneyDollarCircleLine size="1.5em"/> <span  className="text-white ml-3">1 ball</span></span>
            </Box>
            <Box color="text.primary w-100" className="text-center p-2 text-white" style={{backgroundColor:"#34495E"}}>
                <span className="d-flex ml-2" style={{alignItems:"center"}}> <ImSwitch size="1.5em"/> <a href="/" className="text-white ml-3" onClick={handleClick}>Log out</a></span>
            </Box>
        </div>
       </>
     );
}
 
export default LoginModal;