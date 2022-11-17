import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { USERLISTPAGE } from "../const";
import {displayNavButton} from "../utils/displayUtils"

function UserNavBarComp() {
    
  

    
    return (
          <div>  
              <nav> 
                 <NavLink to={USERLISTPAGE}>
                  {({ isActive })=> displayNavButton(isActive,"All Users")}
                </NavLink>
                <NavLink to="adduser">
                  {({ isActive })=> displayNavButton(isActive,"Add User")}
                </NavLink>
               </nav>
             <Outlet/>
          </div>)
    
    
}
export default UserNavBarComp;