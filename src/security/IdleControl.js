import {  Outlet,useNavigate} from "react-router-dom";
import { useEffect, } from "react";
import DisconnectionTimer from "./DisconnectionTimer";

/* Component  is loaded after login*/
function IdleControlComp({maxIdleTime}) {
    const navigate=useNavigate() 
    useEffect(()=>{
        let timer
        if(maxIdleTime>0) {
             timer=new DisconnectionTimer(maxIdleTime,()=>{console.log("Inactivity Timeout => logout")
                                                 navigate("/logout")}) 
        }
        return () => {if (timer) {timer.cleanUp()}}
    },[maxIdleTime,navigate])
    
     return(<Outlet/>) 
}
export default IdleControlComp;