import { useState } from "react";
import { Form,Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUBSCRIPTIONPAGE, URLSUBSCRIPTIONSERVERPROXY } from "../const";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_SUBSCRIBER } from "../appReducer"

function AddSubscriberComp() {
    
  const [subName,setSubName]=useState("")
  const [subCity,setSubCity]=useState("")
  const [subEmail,setSubEmail]=useState("")
  const [error,setError]=useState()
  const navigate=useNavigate()  
  const dispatch=useDispatch()


  const handleSubmit=(event)=>{
    event.preventDefault();
    
    
    let subscriber={}

    subscriber.name=subName
    subscriber.city=subCity
    subscriber.email=subEmail

         

    console.log("sub ",subscriber)
    axios.post(`${URLSUBSCRIPTIONSERVERPROXY}/addsubscriber`,subscriber)
    .then(resp=>{
          console.log("resp",resp)
          dispatch({type:ADD_SUBSCRIBER,payload:resp.data})  
          navigate(SUBSCRIPTIONPAGE)        
        })
    .catch(err=> { 
        console.log("add sub error status",err.response.status); 
        console.log("add sub error data",err.response.data);
        setError(err.response.data.error)
        })
  }

  return (
    
    <Form onSubmit={handleSubmit}>
    {error && <p style={{color:"red"}}>{error}</p>}
    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
      <Form.Label column="true" md={2}>Name</Form.Label>
      <Col md={8}> 
        <Form.Control type="text" autoComplete="off" required onChange={(e)=>setSubName(e.target.value.trim())}
        placeholder="Enter member's name" />
      </Col>
    </Form.Group>
    <Form.Group  className="mb-3" controlId="formBasicGenres">
      <Row> 
        <Form.Label column="true" md={2}>City</Form.Label>
        <Col md={8}> 
          <Form.Control   type="text" autoComplete="off"  required
            onChange={(e)=>setSubCity(e.target.value.trim())}
            placeholder="Enter member's city" />
        </Col>
      </Row>      
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicURL">
      <Row> 
        <Form.Label column="true" md={2}>Email</Form.Label>
        <Col md={8}> 
          <Form.Control type="email"  autoComplete="off" required
          placeholder="Enter member's email" 
          onChange={(e)=>setSubEmail(e.target.value.trim())}/>
        </Col>
      </Row>
    </Form.Group>    
      <button type="submit" >Save</button><Link to={SUBSCRIPTIONPAGE}><button>Cancel</button></Link>
  </Form>
  )  
}
export default AddSubscriberComp;