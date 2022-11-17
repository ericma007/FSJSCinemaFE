import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./context";
import { URLCINEMASERVER,APPLANDINGPAGE } from "../const";

function LoginClassicComp() {
    
    const [user,setUser]=useState("")
    const [password,setPassword]=useState("")
    const {setIsLoggedIn,setUserName}=useContext(LoginContext)
    const [error,setError]=useState(null)
    const navigate=useNavigate()
    

    const doLogin= ()=>{
        axios.post(`${URLCINEMASERVER}/login`,{userName:user,password:password})
        .then(resp=>{
            console.log("resp",resp)
            setError(null)    
            setIsLoggedIn(true)
            setUserName(user)
            navigate(APPLANDINGPAGE)
        })
        .catch(err=> {
            console.log(err.response.status); 
            console.log(err.response.data);   
            setError(err.response.data.error)
        })            
    }

    useEffect(()=>{
        //clean up function called on unmount component
        return ()=> {console.log("unmount login")}  
    },[error])

    return (
        <div>
        
        {error && <p style={{color:"red"}}>{error}</p>}    
        
            <label htmlFor="login">User name:</label>
            <input type="text" id="login" autoComplete="off" onChange={(e)=>setUser(e.target.value)}/>
            <br/>    
            <label htmlFor="pwd">Password:</label>
            <input type="password" id="pwd" onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <input type="button" value="Login" onClick={doLogin}/> <br/><br/>
                 
        <Link to="/first-login">First Login</Link><br/>
        
        </div>
    )    

}
export default LoginClassicComp;