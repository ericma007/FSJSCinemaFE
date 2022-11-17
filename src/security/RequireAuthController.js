import { useContext} from "react";
import { LoginContext } from "./context";
import IdleControlComp from "./IdleControl";

function RequireAuthControllerComp() {
    const {isLoggedIn,maxIdleTime}=useContext(LoginContext)
    
    

    const text="Access Denied"
    
    
    return (<div>
        
        {isLoggedIn && <IdleControlComp  maxIdleTime={maxIdleTime}/>}

        {!isLoggedIn &&  text }
            
    </div>)
    

}
export default RequireAuthControllerComp;