import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink,useLocation } from "react-router-dom";
import {displayNavButton} from "../utils/displayUtils"
import { ButtonToolbar,FormControl,Button,ButtonGroup,InputGroup } from "react-bootstrap";
import { SEARCH_MOVIE} from "../appReducer";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from "../security/context"
const userUtils=require('../utils/userUtils')


function MovieNavBarComp() {
    
   
   const dispatch=useDispatch()
   const location=useLocation()
   const fullMovieList=useSelector(state=>state.movies)
   //search string initialized if search movie is called from another component 
   const initialSearchStr=useSelector(state=>state.searchString)  
   const [searchString,setSearchString]=useState(initialSearchStr)
   const {permissions}=useContext(LoginContext)
    
   
   useEffect(()=>{   
      let filteredList
      if (searchString) {
         filteredList=
         fullMovieList.filter(movie=>movie.name.toUpperCase().includes(searchString.toUpperCase()))
      }
      else filteredList=fullMovieList

      dispatch({type:SEARCH_MOVIE,payload:{filteredList,searchString}})

   },[dispatch,searchString,fullMovieList])
   
   


   /*Search Movie Button is not displayed if Add Movie Button is clicked*/ 
   const displaySearch=(pathname)=> {
      if (pathname.includes("addmovie")) return false
      else return true 
   }

   const resetSearchStr=()=> {
      setSearchString("")
   }

   
   return (
          <div>
              <nav>
                 <ButtonToolbar >  
                  <ButtonGroup> 
                     <NavLink to="list" onClick={resetSearchStr}>
                        {({ isActive })=> displayNavButton(isActive,"All Movies")}                   
                     </NavLink>
                     {userUtils.canAddMovie(permissions)?
                        <NavLink to="addmovie" onClick={resetSearchStr}>
                           {({ isActive })=> displayNavButton(isActive,"Add Movie")} 
                        </NavLink>
                        :<Button disabled style={{visibility:"hidden"}}/>
                     }
                     <Button disabled style={{visibility:"hidden"}}/>
                </ButtonGroup>
               
               {displaySearch(location.pathname) && <>          
                  <InputGroup>
                     <FormControl type="text" placeholder="Title" 
                     defaultValue={initialSearchStr}
                     onChange={(e)=>{setSearchString(e.target.value)}}/>
                     <InputGroup.Text id="btnGroupAddon">Search Movie</InputGroup.Text>
                  </InputGroup> </>
               }
             </ButtonToolbar> 
            </nav>                
              <Outlet/>  
          </div>)
}
export default MovieNavBarComp;