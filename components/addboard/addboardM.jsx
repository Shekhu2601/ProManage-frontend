import { useState } from "react";
import styles from "./addboardM.module.css"
import { boardM } from "../../services/board";
import Swal from 'sweetalert2'

export default function AddboardMember({Close}){
  
    const [formData, setFormData] = useState({
    email:""
      });
      const [error, setError] = useState({
        email:false
    })
    const errorMessages ={
        email:{
          message:"email is Required",
          isValid:formData.email.length>0,
          
          onError: () => {
            setError((error) => ({ ...error, email: true }))
        },
        
        },}
        const handleonSubmit = async(e)=>{
          let  mail=formData.email + " Added to board"
            let isError = false;
                e.preventDefault();
                Object.keys(errorMessages).forEach(key => {
                    if (!errorMessages[key].isValid) {
                        isError = true;
                        errorMessages[key].onError();
                      
                    }
                })
                if (!isError) {
                    const res = await boardM(formData);
                    if (res.status === 200) {
                      Swal.fire(mail);
                       Close()
                      
                    }
                    else {
                        alert("Something went wrong");
                    }
                }
            
        
          }
   
    return(
        <>
          <div onClick={Close} className={styles.wrapar}
        > </div>
       <div className={styles.container}>
        <h3>Add people to the board</h3>
       <form onSubmit={handleonSubmit} >

        <input className={styles.inputs} placeholder="Enter the email" type="email" name="" id="" 
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
        />
       
       <div className={styles.btndiv}>
            <button onClick={Close} className={styles.cancle}>
            Cancel
          </button>
          <button type="submit"   className={styles.save}>Add Email</button>
          </div>
          </form>
       </div>
    
        </>
    )
}