import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {displayNavButton} from "../utils/displayUtils"

function SubscriptionNavBarComp() {
    
    return (
          <div>
              <nav> 
                 <NavLink to="list">
                   {({ isActive })=> displayNavButton(isActive,"All Members")} 
                </NavLink>
                <NavLink to="addsubscription">
                   {({ isActive })=> displayNavButton(isActive,"Add Member")} 
                </NavLink>
               </nav>
              <Outlet/>  
          </div>)
    
    
}
export default SubscriptionNavBarComp;