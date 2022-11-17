import { useSelector } from "react-redux";
import UserComp from "./User";

function UserListComp() {
  
const users=useSelector(state=>state.users)
   
    
    return (
            <div>
              <h5>number of users: {users.length}</h5>
              {users.map((user,index)=>{
                  return([<UserComp key={user.details.id}  user={user}/>,<br key={index}/>])
                })
              }
          </div>
          )
    
    
}
export default UserListComp;