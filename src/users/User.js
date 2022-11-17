import { Link,useNavigate } from "react-router-dom"
import { PERMISSION_DESC_MAP } from "../const"
import './User.css'
import { DELETE_USER} from "../appReducer"
import axios from "axios"
import {useDispatch} from "react-redux"
import { URLCINEMASERVER } from "../const"
import { useState } from "react"


function UserComp(props) {
    

    const [error,setError]=useState()
    let details=props.user.details
    let userDB=props.user.userDB
    let permissions= props.user.permissions.permissions
    let body="<tr><td>loading</td></tr>"
  
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const deleteUser=(id)=>{
        
        axios.delete(`${URLCINEMASERVER}/deleteuser/${id}`)
        .then(resp=>{
            console.log("resp delete user",resp)
            dispatch({type:DELETE_USER})  
            navigate('../../')        
        })
        .catch(err=> { 
        console.log("Delete User error status",err.response.status); 
        console.log("Delete User error data",err.response.data);
        console.log(err.response)
        if (err.response.status===404){setError(err.response.statusText) }
        else setError(err.response.data.error)
        })
    }

    permissions.forEach((perm,index) => {
                  
           if(index%2===0){
              if(index >0) body+=`<tr key=${index}>`
              else body=`<tr key=${index}>`
            }
            body+='<td>'+PERMISSION_DESC_MAP.get(perm)+"</td>"
            if(index%2===1) {body+="</tr>"}
            if(index===(permissions.length-1)) {
                  if(index%2===0) {
                    body+="<td/></tr>"
                  }
            }
    })
        
  return (<div style={{borderWidth:"2px",borderStyle:"solid",borderColor:"black",width:"70%"}}>
              {error && <p style={{color:"red"}}>{error}</p>}
              Name: {details.firstName} {details.lastName}<br/>
              User Name: {userDB.username}<br/>
              Session Time Out (Minutes): {details.sessionTimeOut}<br/>
              Created Data: {details.createdDate}<br/>
              Permissions:
              <table style={{borderStyle:"solid",borderColor:"blueviolet",width:"90%"}}> 
                <tbody dangerouslySetInnerHTML={{ __html: body }}/>
              </table><br/>
              <Link to={`../../edituser/${details.id}`}><button disabled={userDB.isAdmin?true:false}>Edit</button></Link> 
              <button disabled={userDB.isAdmin?true:false} onClick={()=>deleteUser(details.id)}>Delete</button>
          </div>)
}
export default UserComp;