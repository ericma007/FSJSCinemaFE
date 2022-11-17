
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Form,Row,Col} from 'react-bootstrap';

import { Link } from "react-router-dom";
import { MOVIELISTPAGE} from "../const"
import { useNavigate } from "react-router-dom";
import { URLMOVIESSERVERPROXY } from "../const";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { EDIT_MOVIE } from "../appReducer"

function EditMovieComp() {
  const [error,setError]=useState()
  const navigate=useNavigate()  
  const dispatch=useDispatch()

  let {movieId}=useParams()
  
  const movie=useSelector(state=>state.movies.filter(movie=> movie._id===movieId))[0]
  const [movieName,setMovieName]=useState(movie.name)
  const [genreArray,setGenreArray]=useState(movie.genres)
  const [initGenreString]=useState(genreArray.join())
  const [movieImgURL,setMovieImgURL]=useState(movie.imageUrl)
  const [moviePremieredDate,setMoviePremieredDate]=useState(movie.premiered)
  

  //Parse Movie Genres  separated by commas   
  const handleGenreChange=(list)=>{
    setGenreArray(list.split(',').map((genre)=>genre.trim()).filter(genre=>genre.length>0))    
  }

  


  const handleSubmit=(event)=>{
    event.preventDefault();
        
    let movie={}

    movie.name=movieName
    movie._id=movieId
    movie.premiered=moviePremieredDate
    movie.genres=genreArray
    if(movieImgURL) movie.imageUrl=movieImgURL
    else movie.imageUrl="" 

    console.log("movie ",movie)
    axios.put(`${URLMOVIESSERVERPROXY}/updatemovie`,movie)
    .then(resp=>{
          console.log("resp",resp)
          dispatch({type:EDIT_MOVIE,payload:resp.data})  
          navigate(MOVIELISTPAGE)        
        })
    .catch(err=> { 
        console.log("edit movie error status",err.response.status); 
        console.log("edit movie error data",err.response.data);
        setError(err.response.data.error)
        if (err.response.status===404)setError(err.response.status+''+err.response.statusText)
        else setError(err.response.data.error)
        })
  }

  

  return (
 
    
    <Form onSubmit={handleSubmit}>
    Edit Movie
    {console.log("premiered",new Date(moviePremieredDate).toISOString().substring(0,10))} 
    {error && <p style={{color:"red"}}>{error}</p>}
    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
      <Form.Label column="true" md={2} >Name</Form.Label>
      <Col md={8}> 
        <Form.Control type="text" autoComplete="off"  onChange={(e)=>setMovieName(e.target.value)}
        placeholder="Enter Movie Title or Name" defaultValue={movieName}/>
      </Col>
    </Form.Group>
    <Form.Group  className="mb-3" controlId="formBasicGenres">
      <Row> 
        <Form.Label column="true" md={2}>Genres</Form.Label>
        <Col md={8}> 
          <Form.Control   type="text" autoComplete="off"  
            onChange={(e)=>handleGenreChange(e.target.value)}
            placeholder="Enter Genre(s) ex: Comedy, Drama, Thriller, etc.." 
            defaultValue={initGenreString}/>
        </Col>
      </Row>
      <Row>
        <Col md={2}/>
        <Col md={8}> 
            <Form.Text  md={8} muted>Genre(s) to which a movie is associated - separated by commas</Form.Text>
        </Col> 
        </Row>
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicURL">
      <Row> 
        <Form.Label column="true" md={2}>image URL</Form.Label>
        <Col md={8}> 
          <Form.Control type="url"  autoComplete="off" 
          placeholder="Enter movie image URL (optional)" 
          onChange={(e)=>setMovieImgURL(e.target.value.trim())}
          defaultValue={movieImgURL}/>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group  className="mb-3" controlId="formBasicDate">
      <Row> 
        <Form.Label column="true" md={2}>Premiered</Form.Label>
        <Col md={8}> 
          <Form.Control  type="date" placeholder="Enter date movie was premiered" 
          onChange={(e)=>setMoviePremieredDate(e.target.value)} required
          defaultValue={new Date(moviePremieredDate).toISOString().substring(0,10)}/>
        </Col>
      </Row>
      </Form.Group>
      <button type="submit" >Save</button><Link to={MOVIELISTPAGE}><button>Cancel</button></Link>
  
  </Form>
  )  
}
export default EditMovieComp;