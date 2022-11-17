import { Outlet} from "react-router-dom";

function MovieManagementComp() {
        
    return (        
              <div style={{borderWidth:"2px",borderStyle:"solid",borderColor:"black",width:"80%"}}>  
              <h3>Movies</h3> 
                <Outlet/>
              
            </div>
)}
export default MovieManagementComp;