import { useSelector } from "react-redux";
import SubscriberCardComp from "./SubscriptionCard";
function SubscriberListComp() {
  
const subscribers=useSelector(state=>state.subscribers)  
const movies=useSelector(state=>state.movies)
console.log("movies",movies)

return (
              
          <div>
              {subscribers.map((subscriber,index)=>{
                  return([<SubscriberCardComp key={subscriber._id} movies={movies} subscriber={subscriber}/>,<br key={index}/>])
                })
              }
          </div>
        )
 
}
export default SubscriberListComp;