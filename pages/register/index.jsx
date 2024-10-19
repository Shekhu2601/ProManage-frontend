import Form from "../../components/form";
import { useState } from "react";
import styles from './register.module.css'
import pageimg from "./pageimg.png"
 import{ register } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css"
export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
       
        password: "",
        confirmPassword: "",
       
    });
    const [btn ,setBtn]=useState("Create Account")
    const[className ,setClassName]=useState("regiBtn")
    const [error, setError] = useState({
        name: false,
        email: false,
       
        password: false,
        confirmPassword: false,
        
    });
    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Name",
            value: formData.name,
            className:"regiInput",
            onChange: (e) => {
                setFormData({ ...formData, name: e.target.value })
            }
        },
        {
            name: "email",
            type: "email",
            placeholder: " Email",
            className:"regiInput",
            value: formData.email,
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value })
            }
        },

        {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm  password",
            className:"regiInput",
            value: formData.confirmPassword,
            onChange: (e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
            }
        },
      
        {
            name: "password",
            type: "password",
            placeholder: " Password",
            value: formData.password,
            className:"regiInput",
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
            const res = await register(formData);
            if (res.status === 200) {
                alert("Registered successfully");
                navigate("/login");
            }
            else {
                alert("Something went wrong");
            }
        }
    }
    const errorMessages = {
        name: {
            message: "Name is required",
            isValid: formData.name.length > 0,
            onError: () => {
                setError((error) => ({ ...error, name: true }))
            }
        },
        email: {
            message: "Email is required",
            isValid: formData.email.length > 0,
            onError: () => {
                setError((error) => ({ ...error, email: true }))
            }
        },
      
        confirmPassword: {
            message: "Passwords do not match",
            isValid: formData.confirmPassword === formData.password,
            onError: () => {
                setError((error) => ({ ...error, confirmPassword: true }))
            }
        },
        password: {
            message: "Password is required",
            isValid: formData.password.length > 0,
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
<h1>Register</h1>
    
        
        <Form error={error} formFields={formFields} onSubmit={onSubmit} btn={btn} errorMessages={errorMessages} className={className} /></>
        <p className="subH">Have no account yet?</p>
        <p className="route"> 
        
        <Link className="link" to="/login"> Log in</Link> </p>
       </div>
</div>


       </div>
    )
}