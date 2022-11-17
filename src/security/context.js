import { createContext, useEffect, useState,useRef } from "react";
import axios from "axios";
import {URLCINEMASERVER} from "../const";
import {CONTACTADMIN, APPLANDINGPAGE, MOVIEPAGE,USERLISTPAGE,SUBSCRIPTIONPAGE} from "../const";
import { Outlet, useNavigate } from "react-router-dom";
const userUtils=require('../utils/userUtils')



export const LoginContext = createContext()

export const LoginContextProvider =() => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin,setIsAdmin]=useState(null);
    const [userName,setUserName]=useState(null)
    const [permissions,setPermissions]=useState(null)   
    const [isLoaded,setIsLoaded]=useState(false)
    const [landingPage,setLandingPage]=useState(null)  
    const [maxIdleTime,setMaxIdleTime]=useState(0)  //seconds
    const navigateRef=useRef(useNavigate())
    
    

    useEffect(()=>{
    
        if (isLoggedIn && userName && !isLoaded) {
            setIsLoaded(true)
            axios.get(`${URLCINEMASERVER}/user/${userName}`)
            .then(resp=>{
                console.log("resp user user details",resp)
                let user=resp.data
                setIsAdmin(user.userDB.isAdmin?true:false)
                setPermissions(userUtils.convertPermissionListToCheckBox(user.permissions.permissions))
                setMaxIdleTime(user.details.sessionTimeOut*60)
               })
            .catch(err=> {
            console.log("error",err)})
            }

        },[isLoaded,isLoggedIn,userName])
    
        useEffect(()=>{

            const getLandingPage=() =>{ 
                if (isAdmin===null || permissions===null) return APPLANDINGPAGE
                if (isAdmin) return USERLISTPAGE
                else if  (userUtils.canReadSubscription(permissions)) return SUBSCRIPTIONPAGE
                else if (userUtils.canReadMovie(permissions)) return MOVIEPAGE
                else return  CONTACTADMIN
            }
        
            if (isAdmin!=null && permissions!=null ) 
                {    
                    setLandingPage(getLandingPage())
                }
          
            },[permissions,isAdmin])
          
        useEffect(()=>{ 
                if (landingPage) {
                        navigateRef.current(landingPage)}
                },[landingPage])
          
    return(
        <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn,isAdmin,setIsAdmin,userName,setUserName,
                                       permissions,setPermissions,maxIdleTime,setMaxIdleTime}}>                        
            <Outlet/>
        </LoginContext.Provider>
    )

}