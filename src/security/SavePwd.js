import axios from "axios";
import {  Fragment, useState } from "react";
import {Link } from "react-router-dom";
import { URLCINEMASERVER } from "../const";
function SavePwdComp() {
    
    const [user,setUser]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(null)
    const [done,setDone]=useState(false)
    

    const doSavePassword= ()=>{
                
        axios.post(`${URLCINEMASERVER}/savepwd`,{userName:user,password:password})
            .then(resp=>{
            console.log("resp",resp)
            setError(null)
            setDone(true)
        })
        .catch(err=> { 
            console.log(err.response.status); 
            console.log(err.response.data);   
            setError(err.response.data.error)})
    }

    
    
    return (
        <div> 
        {error && <p style={{color:"red"}}>{error}</p>}    
        
            
        {!done &&
            
            <Fragment>
            <label htmlFor="user">User name:</label><input type="text" id="user" onChange={(e)=>setUser(e.target.value)}/><br/>    
            <label htmlFor="pwd">Password: </label><input type="password" id="pwd" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <input type="button" value="First Login" onClick={doSavePassword}/> <br/><br/>
            </Fragment>
        }
        {done && <p style={{color:"blue"}}>Password defined successfully - Please login now</p>}

        <Link to="../login">Login</Link> 
        
        </div>
    )    
}
export default SavePwdComp;