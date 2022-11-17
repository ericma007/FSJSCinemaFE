import { useState } from "react";
import { Form,Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import { SUBSCRIPTIONPAGE, URLSUBSCRIPTIONSERVERPROXY } from "../const";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { EDIT_SUBSCRIBER } from "../appReducer"

function EditSubscriberComp() {
    

  let {subId}=useParams()
  const subscriber=useSelector(state=>state.subscribers.filter(sub=> sub._id===subId))[0]
  const [subName,setSubName]=useState(subscriber.name)
  const [initSubName]=useState(subscriber.name)
  const [subCity,setSubCity]=useState(subscriber.city)
  const [subEmail,setSubEmail]=useState(subscriber.email)
  const [error,setError]=useState()
  const navigate=useNavigate()  
  const dispatch=useDispatch()


  const handleSubmit=(event)=>{
    event.preventDefault();
    
    
    let updatedSubscriber={...subscriber}

    updatedSubscriber.name=subName
    updatedSubscriber.city=subCity
    updatedSubscriber.email=subEmail

    axios.put(`${URLSUBSCRIPTIONSERVERPROXY}/updatesubscriber`,updatedSubscriber)
    .then(resp=>{
          console.log("resp",resp)
          dispatch({type:EDIT_SUBSCRIBER,payload:resp.data})  
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
    <h3>Edit Member: {initSubName} {!(subName===initSubName) && `- will be modified to name ${subName}`}</h3>
    {error && <p style={{color:"red"}}>{error}</p>}
    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
      <Form.Label column="true" md={2}>Name</Form.Label>
      <Col md={8}> 
        <Form.Control type="text" autoComplete="off" defaultValue={subName} required onChange={(e)=>setSubName(e.target.value.trim())}
        placeholder="Update member's name" />
      </Col>
    </Form.Group>
    <Form.Group  className="mb-3" controlId="formBasicGenres">
      <Row> 
        <Form.Label column="true" md={2}>City</Form.Label>
        <Col md={8}> 
          <Form.Control   type="text" autoComplete="off"  required
            onChange={(e)=>setSubCity(e.target.value.trim())} defaultValue={subCity}
            placeholder="Update member's city" />
        </Col>
      </Row>      
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicEmail">
      <Row> 
        <Form.Label column="true" md={2}>Email</Form.Label>
        <Col md={8}> 
          <Form.Control type="email"  autoComplete="off" required defaultValue={subEmail}
          placeholder="Update member's email" 
          onChange={(e)=>setSubEmail(e.target.value.trim())}/>
        </Col>
      </Row>
    </Form.Group>    
      <button type="submit" >Update</button><Link to={SUBSCRIPTIONPAGE}><button>Cancel</button></Link>
  </Form>
  )  
}
export default EditSubscriberComp;