import { useContext } from "react";
import { useDispatch,useSelector } from "react-redux";
import {NavLink, Outlet} from "react-router-dom"
import { RESET_SEARCH_STR } from "./appReducer";
import InitiateMovieListComp from "./movies/InitiateMovieList";
import { LoginContext } from "./security/context";
import InitiateSubListComp from "./subscriptions/InitiateSubList";
import { displayNavButton } from "./utils/displayUtils";
const userUtils=require('./utils/userUtils')

function NavBarComp() {


  const {isAdmin,permissions}=useContext(LoginContext)
  const dispatch=useDispatch()
  const fullMovieList=useSelector(state=>state.movies)



  const resetMovieSearch=()=>{
    dispatch({type:RESET_SEARCH_STR,payload:{filteredList:fullMovieList}})
  }
  
  return (
                
        <div>
          <InitiateMovieListComp/>
          <InitiateSubListComp/>
          <nav>             
                {userUtils.canReadMovie(permissions) &&
                  <NavLink to={`/movies`} onClick={resetMovieSearch}>
                     {({ isActive })=> displayNavButton(isActive,"Movies")}
                  </NavLink>
                }
                {userUtils.canReadSubscription(permissions) && 
                  <NavLink to={`/subscriptions`}>
                    {({ isActive })=> displayNavButton(isActive,"Subcriptions")}  
                  </NavLink>
                }
                {isAdmin && 
                  <NavLink to={`/user`}>
                    {({ isActive })=> displayNavButton(isActive,"User Management")}
                  </NavLink>
                }
                  <NavLink to="logout">
                    <button type="button">Logout</button>
                  </NavLink>
           <br/>
           </nav>
          <Outlet/>
      </div>)     
}
export default NavBarComp;
