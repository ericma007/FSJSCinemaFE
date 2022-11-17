import { useState } from "react";
import { Link } from "react-router-dom";
import {PERMISSION_LIST_ARR, PERMISSION_DESC_MAP, PERMISSION_READ_SUBSCRIPTION
        ,PERMISSION_READ_MOVIE, USERLISTPAGE} from "../const"
import { useNavigate } from "react-router-dom";
import './User.css'
import { URLCINEMASERVER } from "../const";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../appReducer"

const userUtils = require('../utils/userUtils');
const DEFAULT_SESSION_TIME_OUT=10



function AddUserComp(props) {
    
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [userName,setUserName]=useState("")
  const [userSessionTimeOut,setUserSessionTimeOut]=useState(DEFAULT_SESSION_TIME_OUT)
  const [error,setError]=useState()
  const [permissionCheckArr,setPermissionCheckArr]=useState(new Array(PERMISSION_LIST_ARR.length).fill(false))
  const navigate=useNavigate()  
  const dispatch=useDispatch()

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
      if (workingArr) return workingArr
      else return previous
    })
  }  
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    let subDetails={}
    subDetails.firstName=firstName
    subDetails.lastName=lastName
    subDetails.sessionTimeOut=userSessionTimeOut
    let permissions=userUtils.convertPermissionCheckBoxToList(permissionCheckArr)
    
    axios.post(`${URLCINEMASERVER}/adduser`,{userName,subDetails,permissions})
    .then(resp=>{
          console.log("resp",resp)
          dispatch({type:ADD_USER,payload:resp.data})  
          navigate(USERLISTPAGE)        
        })
    .catch(err=> { 
        console.log("Create User error status",err.response.status); 
        console.log("Create User error data",err.response.data);
        setError(err.response.data.error)
        })

  }

  return (<div style={{borderWidth:"2px",borderStyle:"solid",borderColor:"black",width:"80%"}}>
            New User<br/>
            {error && <p style={{color:"red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <br/>
              <label className="labellong" htmlFor="FN">First Name: </label><input type="text" id="FN" onChange={(e)=>setFirstName(e.target.value)}/><br/> 
              <label className="labellong" htmlFor="LN">Last Name: </label><input type="text" id="LN" onChange={(e)=>setLastName(e.target.value)}/><br/>
              <label className="labellong" htmlFor="US">User Name: </label><input type="text" id="US" onChange={(e)=>setUserName(e.target.value)}/><br/>
              <label className="labellong" htmlFor="MIN">Session Time Out (Min): </label><input type="number" id="MIN" min={5} max={20} step={1} defaultValue={10} 
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
                <button type="submit" >Save</button><Link to={USERLISTPAGE}><button>Cancel</button></Link>
              </form>
          </div>)
}
export default AddUserComp;