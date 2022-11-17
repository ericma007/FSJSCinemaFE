import { Accordion, Card, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { URLSUBSCRIPTIONSERVERPROXY } from "../const";
import {ADD_SUBSCRIPTION, DELETE_SUBSCRIBER } from "../appReducer";
import SubscriberMovieCardComp from "./SubscriberMovieCard";
import { LoginContext } from "../security/context"
const userUtils=require("../utils/userUtils")

function SubscriberCardComp({ subscriber,movies }) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {permissions}=useContext(LoginContext)
  const [unsubscribedMovieList,setUnsubscribedMovieList]=useState([])
  const [subscribedMovieList,setSubscribedMovieList]=useState([])
  const [selectDropDown,setSelectDropDown]=useState([])
  const [selectedSubscription,setSelectedSubscription]=useState({movieId:"",date:new Date().toISOString().substring(0,10)})
  

  useEffect (()=>{
    if(subscriber.subscriptions && subscriber.subscriptions?.movies.length>0 && (Array.isArray(movies)&& movies.length>0)) 
    {
        let subscribedMovieSet=new Set(subscriber.subscriptions.movies.map(movie=>movie.movieId))
        setUnsubscribedMovieList(movies.filter((movie)=>!subscribedMovieSet.has(movie._id)))
        let subscribedMovies=subscriber.subscriptions.movies.map(movie1=>
              {let name=movies.find(movie=>movie._id===movie1.movieId).name
               return {...movie1,name} 
              })
        
       
        let subscribedMoviesSorted=subscribedMovies.sort((a,b)=>(a.date<b.date)?1:(a.date===b.date)?((a.name>b.name)?1:-1):-1)
        setSubscribedMovieList(subscribedMoviesSorted)
    }
    else {
      setUnsubscribedMovieList(movies)
      setSubscribedMovieList([])
    }
  },[movies,subscriber.subscriptions])

  useEffect(()=>{
    let optionList=[]
    optionList.push(<option key={subscriber._id+"---"}>Select Movie</option>)
    unsubscribedMovieList.forEach((movie,index)=>{
      optionList.push(<option key={subscriber._id+'-'+index} value={movie._id}>{movie.name}</option>)
    })
    setSelectDropDown(optionList)
  },[subscriber._id,unsubscribedMovieList])
  

  const selectSubscriptionMovie =(e)=>{
    if(e.target.value) {
      setSelectedSubscription({...selectedSubscription,movieId:e.target.value})
    }
  }

  const addSubscription=()=>{
    if (selectedSubscription.movieId) {
      axios
      .post(
        `${URLSUBSCRIPTIONSERVERPROXY}/addsubscription/${subscriber._id}`,selectedSubscription
      )
      .then((resp) => {
        console.log("resp add subscription", resp);
        dispatch({ type: ADD_SUBSCRIPTION });
        navigate("/subscriptions");
      })
      .catch((err) => {
        console.log("add subscription error status", err.response.status);
        console.log("add subscription error", err.response.data);
        console.log(err.response);
        if (err.response.status === 404) {
          setError(err.response.statusText);
        } else setError(err.response.data.error);
      });
    }
    else {
      setError("select movie in drop down ")
    }
  }

  const deleteSubscriber = () => 
  {
    console.log("delete Subscriber")
    axios
      .delete(
        `${URLSUBSCRIPTIONSERVERPROXY}/deletesubscriber/${subscriber._id}`
      )
      .then((resp) => {
        console.log("resp delete delete", resp);
        dispatch({ type: DELETE_SUBSCRIBER });
        navigate("/subscriptions");
      })
      .catch((err) => {
        console.log("Delete subscriber error status", err.response.status);
        console.log("Delete subscriber error data", err.response.data);
        console.log(err.response);
        if (err.response.status === 404) {
          setError(err.response.statusText);
        } else setError(err.response.data.error);
      });
  };

  return (
    <Card className="border border-secondary border-2">
      {error && (
        <Row>
          <p style={{ color: "red" }}>{error}</p>
        </Row>
      )}
      <Card.Title>{subscriber.name}</Card.Title>
      <Card.Body>
        <Card>
          <Card.Body>
            Email: {subscriber.email}
            <br />
            City: {subscriber.city ?? "Los Angeles"}
            <br />
          </Card.Body>
          <Row>
            <Col>
              <Link to={`./../editsubscriber/${subscriber._id}`}>
                <button disabled={!userUtils.canUpdateSubscription(permissions)}>Edit</button>
              </Link>
              <button disabled={!userUtils.canUpdateSubscription(permissions)} onClick={deleteSubscriber}>
                Delete
              </button>
            </Col>
            <Col />
          </Row>
        </Card>
        <br />
        <Card>
          <Card.Title>Subscriptions</Card.Title>
          <Card.Body>
            <Accordion defaultActiveKey="1" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Subscribe to new movie</Accordion.Header>
                <Accordion.Body>
                  <Row>
                  <Col md={8}>
                  <Form.Select key={subscriber._id+"-select"} onChange={selectSubscriptionMovie}>
                      {selectDropDown}
                  </Form.Select>
                  </Col>
                  <Col md={4}> 
                  <Form.Control  key={subscriber._id+"-date"} type="date"  
                    onChange={(e)=>setSelectedSubscription({...selectedSubscription,date:e.target.value})} 
                    defaultValue={selectedSubscription.date}
                    required/>
                  </Col>
                  </Row>
                  <Row>
                    <Col md={4}><Button variant="outline-primary" onClick={addSubscription}>Subscribe</Button></Col>
                    </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Subscribed Movies
                </Accordion.Header>
                <Accordion.Body>
                    {subscribedMovieList.length>0 && 
                    subscribedMovieList.map(movie=>{
            
                      return (
                      <SubscriberMovieCardComp key={movie.movieId} movie={movie}/>)
                     })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </Card.Body>
      <br />
    </Card>
  );
}
export default SubscriberCardComp;
