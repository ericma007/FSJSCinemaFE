import { Card, CardImg, ListGroup, ListGroupItem,Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { useContext, useState } from "react";
import notfoundimagepath from "../image/broken image-1.png"
import { URLSUBSCRIPTIONSERVERPROXY} from "../const";
import { DELETE_MOVIE } from "../appReducer";
import { LoginContext } from "../security/context"
import LinkCustomComp from "../components/LinkCustom";
const userUtils=require('../utils/userUtils')

function MovieCardComp({movie}) {

const [error,setError]=useState()
const navigate=useNavigate()
const {permissions}=useContext(LoginContext)
const dispatch=useDispatch()
const movieSubscribers=useSelector(state=>state.subscribers)
                 .filter(sub=>sub?.subscriptions?.movies.some(film=>film.movieId===movie._id))
const deleteMovie=() => {
  //appeler axios movie._id
  axios.delete(`${URLSUBSCRIPTIONSERVERPROXY}/deletemovie/${movie._id}`)
  .then(resp=>{
      console.log("resp delete user",resp)
      dispatch({type:DELETE_MOVIE})  
      navigate('/movies')        
  })
  .catch(err=> { 
  console.log("Delete User error status",err.response.status); 
  console.log("Delete User error data",err.response.data);
  console.log(err.response)
  if (err.response.status===404){setError(err.response.statusText) }
  else setError(err.response.data.error)
  })
}
  
  
return (
      
          <Card className="border border-secondary border-2"> 
            {error && <Row><p style={{color:"red"}}>{error}</p></Row>} 
            <Card.Title >{movie.name}, {new Date(movie.premiered).getFullYear()}</Card.Title>
            <Card.Subtitle>
                <span key="100">genres: </span>
                {movie.genres.map((genre,index)=>
                    {return <span key={index}>{`${genre}${index<(movie.genres.length-1)?", ":""}`}
                    </span>})}
            </Card.Subtitle>
            <Card.Body>
                
                
                <Row >
                  <Col sl={2} md={2}>

                    <CardImg alt={movie.imageUrl} src={(movie.imageUrl)?movie.imageUrl:"emptyURL"} 
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.alt="no URL provided or Wrong URL"
                        currentTarget.src=notfoundimagepath}}/>
                  </Col>
                  <Col sl={7} md={7} className="border border-2">
                    <Card className="border border-0">
                      <Card.Title>Subcriptions Watched</Card.Title>
                      <Card.Body>
                        <ListGroup as="ol">
                        {(movieSubscribers.length>0) &&
                            movieSubscribers.map((sub) => 
                                  {return(
                                      <ListGroupItem as="li" key={sub._id}>
                                        <LinkCustomComp to={"/subscriptions/editsubscriber/"+sub._id} enableLink={userUtils.canUpdateSubscription(permissions)}>{sub.name}</LinkCustomComp>
                                        <span>, {new Date(sub.subscriptions.movies.find(film=>film.movieId===movie._id).date)
                                        .toLocaleDateString('en-US',{year: 'numeric',month: '2-digit',day: '2-digit'})}
                                        </span>
                                      </ListGroupItem>
                                      )})}  
                        </ListGroup>
                      </Card.Body>
                    </Card> 
                  </Col>
                  <Col sl={1} md={1}></Col>
                </Row>
            </Card.Body>
               <br/>
              
            <Row>
              <Col>
                {/* <Link to={`../../editmovie/${userUtils.canUpdateMovie(permissions)?movie._id:0}`}> */}
                <LinkCustomComp to={`/movies/editmovie/${movie._id}`} enableLink={userUtils.canUpdateMovie(permissions)}>
                  <button disabled={!userUtils.canUpdateMovie(permissions)}>Edit</button>
                </LinkCustomComp>
                {/* </Link> */}

                  <button disabled={!userUtils.canDeleteMovie(permissions)} onClick={deleteMovie} >Delete</button>
              </Col>
              <Col/> 
            </Row>
         </Card>
      
      )
}
export default MovieCardComp;