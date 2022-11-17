import { useSelector } from "react-redux";
import MovieCardComp from "./MovieCard";
function MovieListComp() {


const movieList=useSelector(state=>state.movieList)  

      
return (

          <div>              
              {(movieList.length===0)?<h6>no movie found based on search criteria</h6>:
              movieList.map((movie,index)=>
                    {return([<MovieCardComp key={movie._id}  movie={movie}/>,<br key={index}/>])}) 
              }
          </div>
        )
}
export default MovieListComp;