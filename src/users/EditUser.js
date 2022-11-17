import { useState } from "react";
import { Link } from "react-router-dom";
import {PERMISSION_LIST_ARR, PERMISSION_DESC_MAP, PERMISSION_READ_SUBSCRIPTION, PERMISSION_READ_MOVIE} from "../const"
import { useNavigate,useParams } from "react-router-dom";
import './User.css'
import { URLCINEMASERVER } from "../const";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { EDIT_USER} from "../appReducer"
const userUtils = require('../utils/userUtils');



function EditUserComp() {
    
  
  const navigate=useNavigate()  
  const dispatch=useDispatch()
  let {userId}=useParams()
  
  const user=useSelector(state=>state.users.filter(user=> user.details.id===userId))
  let details=user[0].details
  let userDB=user[0].userDB
  let permissions=user[0].permissions.permissions

  const [firstName,setFirstName]=useState(details.firstName)
  const [lastName,setLastName]=useState(details.lastName)
  const [userName,setUserName]=useState(userDB.username)
  const [created,]=useState(details.createdDate)
  const [userSessionTimeOut,setUserSessionTimeOut]=useState(details.sessionTimeOut)
  const [error,setError]=useState()
  const [permissionCheckArr,setPermissionCheckArr]=useState(userUtils.convertPermissionListToCheckBox(permissions))

  
  const handleChange=function(index) {
    setPermissionCheckArr(prevArr=>prevArr.map((status,i)=>i===index?!status:status))

    setPermissionCheckArr(prevArr =>{
      
      let previous=prevArr
      let workingArr=undefined
      
      if(!userUtils.canReadSubscription(previous) 
          && userUtils.canModifySubscription(previous)) {
            workingArr=previous.map((status,i)=>i===userUtils.indexPermission(PERMISSION_READ_SUBSCRIPTION)?!status:status)
      }
      if (workingArr) {
        previous=workingArr
        workingArr=undefined
      }
      
      if(!userUtils.canReadMovie(previous) 
          && userUtils.canModifyMovie(previous)) {
            workingArr=previous.map((status,i)=>i===userUtils.indexPermission(PERMISSION_READ_MOVIE)?!status:status)
  
      }
      if (workingArr) {
        console.log(workingArr)
        return workingArr}
      else {
        console.log(previous)
        return previous
      }
    })
  }  
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    let userDetails={}
    userDetails.firstName=firstName
    userDetails.lastName=lastName
    userDetails.sessionTimeOut=userSessionTimeOut
    let permissions=userUtils.convertPermissionCheckBoxToList(permissionCheckArr)
    
    axios.put(`${URLCINEMASERVER}/updateuser`,{userId,userName,userDetails,permissions})
    .then(resp=>{
          console.log("resp",resp)
          dispatch({type:EDIT_USER})  
          navigate('../')        
        })
    .catch(err=> { 
        console.log("Update User error status",err.response.status); 
        console.log("Update User error data",err.response.data);
        setError(err.response.data.error)
        })

    
  }

  return (<div style={{borderWidth:"2px",borderStyle:"solid",borderColor:"black",width:"80%"}}>
            Edit user <br/>
             {error && <p style={{color:"red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <br/>
              First Name: <input type="text"  onChange={(e)=>setFirstName(e.target.value)} 
                            defaultValue={firstName}/><br/> 
              Last Name: <input type="text"  onChange={(e)=>setLastName(e.target.value)}
                            defaultValue={lastName}/><br/>
              User Name: <input type="text"  onChange={(e)=>setUserName(e.target.value)}
                            defaultValue={userName}/><br/>
              Created Date: {created}<br/>
              Session Time Out (Min): <input type="number" min={5} max={20} step={1} 
                                            defaultValue={userSessionTimeOut} 
                                            onChange={(e)=>setUserSessionTimeOut(parseInt(e.target.value))}/>
                                            <br/>
              
              Permissions:<br/>
                {PERMISSION_LIST_ARR.map((permission,index)=>{
                  return  <div key={index}>
                      <input type="checkbox" 
                                checked={permissionCheckArr[index]}
                                id={`permission-check-box${index}`}
                                onChange={()=> handleChange(index)} 
                                value={permission} />
                      <label className="checklabel" htmlFor={`permission-check-box${index}`}>{PERMISSION_DESC_MAP.get(permission)}</label>
                      <br/>
                  </div>              

                })}
                <br/>
                <button type="submit" >Update</button>
                <Link to={"../"}><button>Cancel</button></Link>
              </form>
          </div>)
}
export default EditUserComp;