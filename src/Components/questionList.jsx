import {useEffect, useState} from "react"
import axios from "axios";
import {TiArrowSortedDown} from "react-icons/ti"
import {TiArrowSortedUp} from "react-icons/ti"
import { Link } from 'react-router-dom'
import clip from "text-clipper"
import { Trans } from 'react-i18next';
import {FaSearch} from 'react-icons/fa'

const QuestionList = () => {
    const [state, setstate] = useState()
    const [count, setcount] = useState(false)
    const [inputValue, setinputValue] = useState("")

    const mystyle={
            width: "100%",
            height:"700px",
            overflowX:"hidden",
            overflowY:"scroll"
        }
    const handleChangeViews=async(list)=>{
                let payload = {
                    ...list,
                    viewsCount: list.viewsCount + 1}
                await axios.put(`http://localhost:5000/question/${list.id}`,payload)
               }        
          useEffect(()=>{
                    const getQuestion=()=>{
                            axios.get("http://localhost:5000/question")
                            .then(res=>{
                                const finish_result=res.data.filter((item,index)=>{
                                  if(item.status===true){
                                      setcount(index)
                                      return item;  
                                  }
                                })
                                finish_result.reverse()
                             setstate(finish_result)
                            })
                      }
                      if(inputValue===" " || inputValue===""){
                      getQuestion()}
                      else{
                        handleChangeSearch()
                      }
                  },[inputValue])

    const handleChange=(e)=>{
          setinputValue(e.target.value)
    }

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
              setstate(value)
        })
      }
  
    return ( 
        <div className="container  mb-5">
            <div className="row mt-2">
                <div className="col-md-8">
                    <div className=" mb-n1 p-1 text-light border-0" role="alert" style={{backgroundColor:"#3498DB"}}>
                         <h4 className="">
                         <Trans i18nKey="answer.link"> Oxirgi savollar va javoblar</Trans></h4>
                    </div>
                    {/* Question render list */}
                     <div className="questionBody"  style={mystyle}  >
                        {state && state.map((item,index)=>(
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
                                <div className="d-block">
                                        <Link to={`/answer/${item.id}`} onClick={()=>{handleChangeViews(item)}}  className="w-100">
                                            <p>{
                                             clip( item.title, 70)
                                           } </p>
                                        </Link>
                                        <p>
                                        <Trans i18nKey="home.main"> so‘radi 16 fevral </Trans> {item.user} (1,432 bal) </p>
                                        <Link to='' className="text-primary">{item.tags}</Link>
                                    </div> 
                             </div>
                         </div>  
                        ))}   
                    </div>    
                </div>

                    {/* Search side  */}
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
     );
}
 
export default QuestionList;