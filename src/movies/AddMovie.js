import { useState } from "react";
import { Form,Row,Col} from 'react-bootstrap';

import { Link } from "react-router-dom";
import { MOVIELISTPAGE} from "../const"
import { useNavigate } from "react-router-dom";
import { URLSUBSCRIPTIONSERVERPROXY } from "../const";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_MOVIE } from "../appReducer"

function AddMovieComp() {
    
  const [movieName,setMovieName]=useState("")
  const [genreArray,setGenreArray]=useState([])
  const [movieImgURL,setImgMovieURL]=useState("")
  const [moviePremieredDate,setMoviePremieredDate]=useState("")
  const [error,setError]=useState()
  const navigate=useNavigate()  
  const dispatch=useDispatch()

  
  //Parse Movie Genres  separated by commas   
  const handleGenreChange=(list)=>{
    setGenreArray(list.split(',').map((genre)=>genre.trim()).filter(genre=>genre.length>0))    
  }


  const handleSubmit=(event)=>{
    event.preventDefault();
    
    
    let movie={}

    movie.name=movieName
    movie.premiered=(moviePremieredDate)?moviePremieredDate:new Date().toLocaleDateString('en-CA')
    movie.genres=genreArray
    if(movieImgURL) movie.imageUrl=movieImgURL
    else movie.imageUrl="" 

    console.log("movie ",movie)
    axios.post(`${URLSUBSCRIPTIONSERVERPROXY}/addmovie`,movie)
    .then(resp=>{
          console.log("resp",resp)
          dispatch({type:ADD_MOVIE,payload:resp.data})  
          navigate(MOVIELISTPAGE)        
        })
    .catch(err=> { 
        console.log("add movie error status",err.response.status); 
        console.log("add movie error data",err.response.data);
        setError(err.response.data.error)
        })
  }

  return (
    
    <Form onSubmit={handleSubmit}>
    {error && <p style={{color:"red"}}>{error}</p>}
    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
      <Form.Label column="true" md={2}>Name</Form.Label>
      <Col md={8}> 
        <Form.Control type="text" autoComplete="off"  onChange={(e)=>setMovieName(e.target.value)}
        placeholder="Enter Movie Title or Name" />
      </Col>
    </Form.Group>
    <Form.Group  className="mb-3" controlId="formBasicGenres">
      <Row> 
        <Form.Label column="true" md={2}>Genres</Form.Label>
        <Col md={8}> 
          <Form.Control   type="text" autoComplete="off"  
            onChange={(e)=>handleGenreChange(e.target.value)}
            placeholder="Enter Genre(s) ex: Comedy, Drama, Thriller, etc.." />
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
          onChange={(e)=>setImgMovieURL(e.target.value.trim())}/>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group  className="mb-3" controlId="formBasicDate">
      <Row> 
        <Form.Label column="true" md={2}>Premiered</Form.Label>
        <Col md={8}> 
          <Form.Control  type="date" placeholder="Enter date movie was premiered" 
          defaultValue={new Date().toLocaleDateString('en-CA')}
          onChange={(e)=>setMoviePremieredDate(e.target.value)} required
          />
        </Col>
      </Row>
      </Form.Group>
      <button type="submit" >Save</button><Link to={MOVIELISTPAGE}><button>Cancel</button></Link>
  </Form>
  )  
}
export default AddMovieComp;