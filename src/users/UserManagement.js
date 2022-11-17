import axios from "axios";
import { URLCINEMASERVER} from "../const";
import { Outlet} from "react-router-dom";
import {useEffect} from "react";
import { INIT_USERS } from '../appReducer'
import { useDispatch,useSelector } from "react-redux";


function UserManagementComp() {
    
  const userListToload=useSelector(state=>state.userListToload)
  const dispatch=useDispatch()

  
  
  useEffect(()=>{
      console.log("useEffect user Management",new Date().toLocaleTimeString())
      console.log("userToLoad",userListToload)

      if(userListToload) {  
          axios.get(`${URLCINEMASERVER}/userlist`)
                .then(resp=>{
                      console.log("resp",resp)
                      dispatch({type:INIT_USERS,payload:resp.data})
                    })
                .catch(err=> { 
                    console.log("get user list error status",err.response.status); 
                    console.log("get user list error data",err.response.data);   
                    })
                  }
        
    },[userListToload,dispatch])
    
   
    
    return (
        
            <div style={{borderWidth:"2px",borderStyle:"solid",borderColor:"black",width:"80%"}}>
              <h3>User Management</h3>
             
             <Outlet/>
          </div>)
    
    
}
export default UserManagementComp;