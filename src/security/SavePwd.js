import axios from "axios";
import { useState } from "react";
import {Link } from "react-router-dom";
import { URLCINEMASERVER } from "../const";
import { Formik } from "formik";
import * as Yup from "yup"
import {Container, Form,Button} from "react-bootstrap"



function SavePwdComp() {
    
  
    const [errorBackEnd,setErrorBackEnd]=useState(null)
    const [done,setDone]=useState(false)
    
    const logInSchema = Yup.object().shape({
        username: Yup.string()
          .required("User name is required")
          .min(5, "User name must have at least 5 characters")
          .max(20, "User name can't be longer than 20 characters")
          .matches(/^[a-zA-Z0-9!@#$%^&*_?]*$/,"User name can contain only alphanumeric or !@#$%^&*_? characters"),
        password1: Yup.string() 
        .required('user password is required')
        .min(5, 'password should be at least 5 chars long')
        .max(20, 'password cannot be longer than 20 characters')
        .matches(/^[a-zA-Z0-9!@#$%^&*_?]*$/,"password name can contain only alphanumeric or !@#$%^&*_? characters")
        .matches(/^(?=.*?[A-Z])(?=.*?[0-9])/
                   ,"Password should contain at least one upper case letter and one digit")
        })


    const doSavePassword= (user,password)=>{
        setErrorBackEnd(null)   //reset error back end if previoulsy set       
        axios.post(`${URLCINEMASERVER}/savepwd`,{userName:user,password:password})
        .then(resp=>{
            console.log("resp",resp)
            setDone(true)
        })
        .catch(err=> { 
            console.log(err.response.status); 
            console.log(err.response.data);   
            setErrorBackEnd(err.response.data.error)
        })
        return Promise.resolve("enables chaining")
    }

    return (
        <Formik
          initialValues={{username:"",password1:""}}
          validationSchema={logInSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values,actions) => {
            console.log(values);
            doSavePassword(values.username,values.password1).then(()=>{actions.setSubmitting(false)})  
          }}>
            {(formik) => {
                const { 
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                  errors} = formik;
                return (
                  <Container style={{marginLeft:'0',maxWidth:'25%'}}>
                        {errorBackEnd && <p style={{color:"red"}}>{errorBackEnd}</p>}
                        <Form  className = "card p-3 bg-light" onSubmit={handleSubmit}>
                        <Form.Group controlId="formUser">
                              <Form.Label>User Name</Form.Label>
                              <Form.Control type="text" name="username"  
                                  value={values.username}
                                  autoComplete='off'
                                  onChange={handleChange}
                                  onBlur={handleBlur} 
                                  isInvalid={!!errors.username}/>
                               <Form.Control.Feedback type="invalid"> 
                                  {errors.username}
                              </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="formPassword">
                              <Form.Label>Set your password</Form.Label>
                              <Form.Control type="password" name="password1"  
                                  value={values.password1}
                                  onChange={handleChange}
                                  onBlur={handleBlur} 
                                  isInvalid={!!errors.password1}/>
                               <Form.Control.Feedback type="invalid"> 
                                  {errors.password1}
                              </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Button disabled={isSubmitting} type="submit">Save Password</Button>
                          </Form.Group>        
                        </Form>
                        <div className="p-3 ">
                            {done && 
                              <p style={{color:"blue"}}>Password defined successfully - Please login now</p>}
                             <Link to="../login">Login</Link>
                        </div>
                  </Container>         
                  )}}
        </Formik>
      );

    
/*    return (
        <div> 
        {error && <p style={{color:"red"}}>{error}</p>}    
        
            
        {!done &&
            
            <Fragment>
            <label htmlFor="user">User name:</label><input type="text" id="user" onChange={(e)=>setUser(e.target.value)}/><br/>    
            <label htmlFor="pwd">Password: </label><input type="password" id="pwd" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <input type="button" value="First Login" onClick={doSavePassword}/> <br/><br/>
            </Fragment>
        }
        {done && <p style={{color:"blue"}}>Password defined successfully - Please login now</p>}

         
        
        </div>
    )    */
}
export default SavePwdComp;