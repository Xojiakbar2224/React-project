import axios from "axios";
import Navbar from "../Navbar"
import React from 'react'
import {TiArrowSortedDown} from "react-icons/ti"
import {TiArrowSortedUp} from "react-icons/ti"
import { Link } from 'react-router-dom'
import clip from "text-clipper"
import { Trans } from 'react-i18next';
import {FaSearch} from 'react-icons/fa'
const Activity = () => {
    const [store, setStore] = React.useState()
    const [inputValue, setinputValue] = React.useState("")

    const getActiveQuestion=()=>{
        axios.get("http://localhost:5000/question")
        .then(res=>{
            const data=res.data.filter(item=>{
                if(item.answerCounts!==0){
                    return item;
                }
            })
            setStore(data)
        })
    }
    const handleChange=(e)=>{
        setinputValue(e.target.value)
        console.log(inputValue)
    }
    const handleChangeViews=async(list)=>{ 
        let payload = {
            ...list,
            viewsCount: list.viewsCount + 1}
        await axios.put(`http://localhost:5000/question/${list.id}`,payload)
       }
    React.useEffect(()=>{
        if(inputValue===" " || inputValue===""){
            getActiveQuestion()
        } else{
              handleChangeSearch()
            }
    },[inputValue])

    const handleChangeSearch=()=>{
        axios.get("http://localhost:5000/question")
        .then(res=>{
          const value=res.data.filter(item=>{
              if( (item.status===true)&&
                  (item.title.toLowerCase().includes(inputValue.toLowerCase()) || 
                  item.query.toLowerCase().includes(inputValue.toLowerCase()) ||
                  item.tags.toLowerCase().includes(inputValue.toLowerCase()) )
                  ){
                      return item
                  }
                
              })
              setStore(value)
        })
      }
    const mystyle={
        width: "100%",
        height:"auto",
        overflowX:"hidden",
        overflowY:"hidden"
    }
    return ( 
        <>
            <Navbar/> 
            <div className="questionBody container m-auto pt-2" >
                
                <div className="row">
             <div className="col-md-8"  style={mystyle}>
             <div className=" mt-1  p-1 text-light border-0" role="alert" style={{backgroundColor:"#3498DB"}}>
                    <h4><Trans i18nKey="navbar.link7">Aktiv bo'lgan savollar </Trans></h4>
                </div>
             {store && store.map((item,index)=>(
                <div key={index}>
                 <div className="w-100 mt-2 border d-flex p-1" 
                      style={{backgroundColor:"aliceblue"}}>
                    <div className="div text-center">
                        <div className="d-flex w-25 text-center text-white p" style={{alignItems:"center"}} >
                        <div className=" d-flex border bg-secondary p-2">
                            <span className="mr-2">
                                <TiArrowSortedUp  size="1.6em"/>
                                <TiArrowSortedDown  size="1.6em"/>
                            </span>
                            <span>
                                <h5>{item.votes}</h5>
                                <p className="w-25"><Trans i18nKey="home.vote"> ovoz</Trans></p>
                            </span>
                        </div> 

                        <div className=" d-block border bg-danger p-2">
                                <h5>{item.answerCounts}</h5>
                                <p><Trans i18nKey="home.answers">javoblar</Trans></p>
                        </div>
                    </div>
                        <p className="mt-1">{item.viewsCount} <Trans i18nKey="home.views">martta ko'rilgan</Trans></p>
                    </div>
                    <div className=" d-block  ">
                            <Link to={`/answer/${item.id}`} onClick={()=>{handleChangeViews(item)}}  className="w-100">

                                <p>{
                                 clip( item.title, 70)
                               } </p>
                            </Link>
                            <p>
                            <Trans i18nKey="home.main"> so‘radi 16 fevral </Trans> {item.user} (1,432 bal) </p>
                            <Link to='/' className="text-primary">{item.tags}</Link>
                        </div> 
                 </div>
             </div>  
            ))} 
             </div>
             <div className="col-md-4">
                <div className="div m-auto">
                    <div className="input-group p-2 w-75 m-auto " style={{backgroundColor:"#1ABC9C"}}>
                        <input 
                            type="text"
                            className="form-control"
                            name="search"
                            value={inputValue}
                            onChange={e=>{handleChange(e)}}
                            />
                        <button 
                            // onClick={clickSearch}
                        className="btn text-white" 
                        style={{backgroundColor:"#117964"}} 
                        id="btnGroupAddon">
                            <FaSearch/></button>
                        </div> 
                        <div className="bg-dark w-75 m-auto">
                            <p className=" text-white p-2 w-75 m-auto">
                            <Trans i18nKey="home.text">
                                Assalomu alaykum, 
                                yordam.uz saytimizga 
                                xush kelibsiz.
                            <br/><br/>
                                Bu saytda o'zingizni 
                                qiziqtirgan savollarga javob 
                                olishingiz va o'z sohangiz 
                                bo'yicha savollarga javob 
                                berishingiz mumkin.
                                <br/><br/>
                                Bizning Oilamizga a'zo 
                                bo'lganingiz uchun chuqur 
                                Minnatdorchilik bildiramiz!!!
                            </Trans>
                            </p>
                        </div>   
                    </div>         
                </div>
                </div>
        </div>
        
        </>
     );
}
 
export default Activity;