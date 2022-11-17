import { Outlet} from "react-router-dom";

function SubscriptionManagementComp() {
    
    return (
        
            <div style={{borderWidth:"2px",borderStyle:"solid",borderColor:"black",width:"80%"}}>
              <h2>Subscriptions</h2>
             <Outlet/>
          </div>)
}
export default SubscriptionManagementComp;