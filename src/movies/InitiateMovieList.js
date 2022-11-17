import axios from "axios";
import {useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { INIT_MOVIES } from "../appReducer";
import { URLSUBSCRIPTIONSERVERPROXY } from "../const";

function InitiateMovieListComp() {
    
  const movieListToload=useSelector(state=>state.movieListToload)
  const dispatch=useDispatch()

  useEffect(()=>{

      if (movieListToload) {
        axios.get(`${URLSUBSCRIPTIONSERVERPROXY}/movielist`)
        .then(resp =>{  
          console.log("movies",resp.data)
          dispatch({type:INIT_MOVIES,payload:resp.data})
        })
        .catch((err) =>{
          console.log("load movie list failed")
        })
     }  
  },[movieListToload,dispatch])
  
  return ( <div/>)
              
}
export default InitiateMovieListComp;