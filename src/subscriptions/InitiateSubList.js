import axios from "axios";
import {useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { INIT_SUBSCRIBERS} from "../appReducer";
import { URLSUBSCRIPTIONSERVERPROXY } from "../const";

function InitiateSubListComp() {
    
  const subscriberListToload=useSelector(state=>state.subscriberListToload)
  const dispatch=useDispatch()
  
  useEffect(()=>{
      console.log("subscriberListToload",subscriberListToload)
      if(subscriberListToload) {  
        axios.get(`${URLSUBSCRIPTIONSERVERPROXY }/subscriptionlist`)
              .then(resp=>{
                    console.log("resp subscription list",resp.data)
                    dispatch({type:INIT_SUBSCRIBERS,payload:resp.data})
                  })
              .catch(err=> { 
                  console.log("get movie list error status",err.response); 
                  })
                }      
    },[subscriberListToload,dispatch])

  return ( <div/>)
              
}
export default InitiateSubListComp;