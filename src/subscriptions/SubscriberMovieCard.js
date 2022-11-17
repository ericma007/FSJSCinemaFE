import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_MOVIE } from "../appReducer";
import LinkCustomComp from "../components/LinkCustom";
import { LoginContext } from "../security/context"
const userUtils=require('../utils/userUtils')

function SubscriberMovieCardComp({movie}) {

const fullMovieList=useSelector(state=>state.movies)  
const dispatch=useDispatch()
const {permissions}=useContext(LoginContext)
const filterMovieList=()=>{
  let filteredList=fullMovieList.filter(film=>film.name===movie.name)
  let searchString=movie.name
  dispatch({type:SEARCH_MOVIE,payload:{filteredList,searchString}})
}  

return (
  <div>
    <LinkCustomComp to={'/movies/list'} enableLink={userUtils.canReadMovie(permissions)} handleClick={filterMovieList}>{movie.name}</LinkCustomComp>, {new Date(movie.date).toISOString().substring(0,10)}
    <br/>
  </div>)
}
export default SubscriberMovieCardComp;