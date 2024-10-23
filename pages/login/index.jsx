import Form from "../../components/form";
import { useState } from "react";
import pageimg from '../register/pageimg.png'
import { login } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css'
import { Link } from "react-router-dom";
import "./login.css"

export default function Login() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    if (token) {
      // navigate("/");
    }
    const [formData, setFormData] = useState({
        
        email: "",
        
        password: "",
        
    });
    const [btn ,setBtn]=useState("Log in")
    const[className ,setClassName]=useState("loginBtn")
    const [error, setError] = useState({
        
        email: false,
        
        password: false,
        
    });
    const formFields = [
      
           
        {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            value: formData.email,
            className:"LoginInput",
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value })
            }
        },
    
     
        {
            name: "password",
            type: "password",
             className:"LoginInput",
            placeholder: "Enter your password",
            value: formData.password,
            onChange: (e) => {
                setFormData({ ...formData, password: e.target.value })
            }
        }, 
        
    ]
    const onSubmit = async (e) => {
        let isError = false;
        e.preventDefault();
        Object.keys(errorMessages).forEach(key => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
            }
        })
        if (!isError) {
            const res = await login(formData);
           try{
            if (res.status === 200) {
              alert("Login successfully");
              const token =res.data.token;
              localStorage.setItem("token",token)
              navigate("/dashboard");
          }
          else {
              alert("Something went wrong");
          }
           }
           catch(e) {
            if (e.res.status===400) {
              alert("Invalid email or password");
          }
           }
            setFormData( "")
        }
    }
    const errorMessages = {
       
        email: {
            message: "Email is required",
            isValid: formData.email.length> 0,
            
            onError: () => {
                setError((error) => ({ ...error, email: true }))
            }
        },
      
        password: {
            message: "Password is required",
            isValid: formData.password.length> 0,
            onError: () => {
                setError((error) => ({ ...error, password: true }))
            }
        },
        
        
    }

    return (
       <div className={styles.container}>
<div className={styles.left}>
<p className={styles.box}></p>

   <img className={styles.img} src={pageimg} alt=""  />
 <p className={styles.heading}>Welcome aboard my friend
                          </p>
                          
 <p className={styles.heading2}>just a couple of clicks and we start</p>
 </div>

<div className={styles.right}>
    <div className={styles.inputt}>
<>
<h1>Login</h1>
      
        
        <Form error={error} formFields={formFields} onSubmit={onSubmit} btn={btn} className={className} errorMessages={errorMessages} /></>
        <p className="subH">Have no account yet?</p>
       <p className="route"> 
        
         <Link className="link" to="/register"> Register</Link> </p>
        </div>
</div>


       </div>
    )
}