import { useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { LoginContext } from "./context";


function RequireAuthComp(props) {
    let {isLoggedIn}=useContext(LoginContext)
    const navigate=useNavigate() 
    
    useEffect(()=>{
        if (!isLoggedIn) {
           //Redirect them to the home page
           navigate("/")
        }
    })

    console.log("Logged In RequireAuthComp",isLoggedIn)
    
    return props.children
    

}
export default RequireAuthComp;