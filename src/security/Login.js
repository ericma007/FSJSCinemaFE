import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./context";
import { URLCINEMASERVER,APPLANDINGPAGE } from "../const";
import {Container, Form,Button} from "react-bootstrap"
import { Formik } from "formik";
import * as Yup from "yup"

function LoginComp() {
    
    const {setIsLoggedIn,setUserName}=useContext(LoginContext)
    const [errorBackEnd,setErrorBackEnd]=useState(null)
    const navigate=useNavigate()  

    
    const doLogin= (user,pwd)=>{
        axios.post(`${URLCINEMASERVER}/login`,{userName:user,password:pwd})
        .then(resp=>{
            console.log("resp",resp)    
            setIsLoggedIn(true)
            setUserName(user)
            navigate(APPLANDINGPAGE)
        })
        .catch(err=> {
            console.log(err.response.status); 
            console.log(err.response.data);   
            setErrorBackEnd(err.response.data.error)
                
        })
        return Promise.resolve("enables chaining")           
    }
    const logInSchema = Yup.object().shape({
      username: Yup.string()
        .required("User name is required")
        .min(5, "User name must have at least 5 characters")
        .max(20, "User name can't be longer than 20 characters")
        .matches(/^[a-zA-Z0-9!@#$%^&*_?]*$/,"User name can contain only alphanumeric or !@#$%^&*_? characters"),
      password1: Yup.string() 
      .required('user password is required')
      .min(5, 'password should be at least 5 chars long')
      //.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
      //           ,"Password should contain at least one upper case letter, one lowercase letter, one digit and 1 symbol #?!@$%^&*-.")
      })

       return (
          <Formik
            initialValues={{username:"",password1:""}}
            validationSchema={logInSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values,actions) => {
              console.log(values);
              setErrorBackEnd(null)   //reset error back end if previoulsy set
              doLogin(values.username,values.password1).then(()=>{actions.setSubmitting(false)})  
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
                                <Form.Label>Password</Form.Label>
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
                              <Button disabled={isSubmitting} type="submit">Login</Button>
                            </Form.Group>        
                          </Form>
                          <div className="p-3 ">
                          <Link to="/first-login">Define your password - first login</Link>
                          </div>
                    </Container>         
                    )}}
          </Formik>
        );
      };  
export default LoginComp;