import { useState,useEffect } from "react";
import styles from "./todoinput.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { editTask, fetchTaskById, taskcreate } from "../../services/task";
import Swal from 'sweetalert2'


export default function Todoinput({ Close }) {
  const navigate = useNavigate();
  const params=useParams()
    const id =params.id;
    const isEdit= !!id;
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    assign: "",
    checklists: "",
    checkbox:false
  });
  
const closs =()=>{
  
  navigate("/dashboard")
  Close()

}
  const [error, setError] = useState({
    title: false,
    priority: false,
    assign: false,
    checklists: false,
    checkbox:false

  });
  const [checklist, setChecklist] = useState([]);
const errorMessages ={
  title:{
    message:"Title is Required",
    isValid:formData.title.length>0,
    
    onError: () => {
      setError((error) => ({ ...error, title: true }))
  },
  
  },
  priority:{
    message:"Priority is Required",
    isValid:formData.priority.length>0,
    
    onError: () => {
      setError((error) => ({ ...error, priority: true }))
  },
  
  },
  checklists:{
    message:"checklist is Required",
    isValid:formData.checklists.length>0,
    
    onError: () => {
      setError((error) => ({ ...error, checklists: true }))
  },
  
  },
  checkbox:{
    message:"checkbox is Required",
    isValid:formData.checkbox,
    
    onError: () => {
      setError((error) => ({ ...error, checkbox: true }))
  },
  
  }


}
  const handleAddInput = () => {
    setChecklist([...checklist, []]);
  };
  const handleRemoveField = (index) => {
    const fields = [...checklist];
    fields.splice(index, 1);
    setChecklist(fields);}
  const handleChange = (e) => {
   
    setFormData({ ...formData, checklists:e.target.value });
       
      
    };
    
   
  const checkOnChange =(e)=>{
    
    setFormData({...formData, checkbox:e.target.checked})
  }
  const handleonSubmit = async(e)=>{

    let isError = false;
        e.preventDefault();
        Object.keys(errorMessages).forEach(key => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
              
            }
        })
        if (!isError) {
            const res = isEdit? await editTask(formData): await taskcreate(formData);
            if (res.status === 201) {
               
                
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title:  `task ${isEdit ? "Edit":"create"}  successfully`,
                  showConfirmButton: false,
                  timer: 2000
                });
               Close()
               navigate("/dashboard")
             setTimeout(() => {
              window.location.reload()
             }, 2000);
            }
            else {
                alert("Something went wrong");
            }
        }
    

  }
  const fillTaskdata =(data)=>{
    const{
      title,
      priority,
      assign,
      checklists,
      checkbox
    }=data
    setFormData({
      title,
      priority,
      assign,
      checklists,
      checkbox
    })
  }
  useEffect(()=>{
    
        fetchTaskById(id).then(res=>{
          fillTaskdata(res.data)
        })
    
},[])
  return (
    <>
      <div onClick={Close} className={styles.wrapar}></div>
      <div className={styles.container}>
        <form onSubmit={handleonSubmit} >
          <label className={styles.titlelabel} htmlFor="title">
            Title <span className={styles.mandetary}>*</span>
          </label>
          <br />
          <input
            className={styles.inputTitle}
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            name="title"
            type="text"
          />
          <div className={styles.prority}>
            <label className={styles.prilabel} htmlFor="priority">
              Select Priority <span className={styles.mandetary}>*</span>
            </label>
            <p className={styles.pri1}>
              <input className={styles.redio}
                value="HIGH PRIORITY"
                onChange={(e) => {
                  setFormData({ ...formData, priority: e.target.value });
                }}
                type="radio"
                name="pro"
                id="high"
              />
              <GoDotFill  className={styles.rdot} />
              <label htmlFor="high"> HIGH PRIORITY</label>
            </p>
            <p className={styles.pri1}>
              <input className={styles.redio}
                value="MODERATE PRIORITY"
                onChange={(e) => {
                  setFormData({ ...formData, priority: e.target.value });
                }}
                type="radio"
                name="pro"
                id="moderate"
              />
              <GoDotFill className={styles.bdot} />
             <label htmlFor="moderate">  MODERATE PRIORITY</label>
            </p>
            <p className={styles.pri1}>
              <input className={styles.redio}
                value="LOW PRIORITY"
                onChange={(e) => {
                  setFormData({ ...formData, priority: e.target.value });
                }}
                type="radio"
                name="pro"
                id="low"
              />
              <GoDotFill className={styles.gdot} />
             <label htmlFor="low">  LOW PRIORITY</label>
            </p>
          </div>
          <div className={styles.assign}>
            <label className={styles.assignlabel} htmlFor="assign">
              {" "}
              Assign to
            </label>
            <input
              className={styles.assigninput}
              type="email"
              value={formData.assign}
              onChange={(e) => {
                setFormData({ ...formData, assign: e.target.value });
              }}
              name="assing"
              id=""
            />
          </div>
          <div className={styles.checklistbox}>
            Checklist(1/3) <span className={styles.mandetary}>*</span>
            <div className={styles.checklist}>
              {checklist.map((input, index,s) => {
                return (
                  <div className={styles.inputs}>
                     <input  className={styles.check} type="checkbox" value={input.value} key={s}  onChange={checkOnChange}  />
                    <input
                      className={styles.checklistIn}
                      key={index}
                      type="text"
                      value={input.check}
                      onChange={handleChange}
                    />
                    <button className={styles.addNew} type="button" onClick={handleRemoveField}>
                    <MdDelete className={styles.del} />
            </button>
                  </div>
                );
              })}
            </div>
            <button className={styles.addNew} type="button" onClick={handleAddInput}>
              <span >+ </span>  Add New
            </button>
          </div>
       
        <div className={styles.btndiv}>
          <button type="button" className={styles.date}>Select Due Date</button>
          <div>
            <button onClick={closs} className={styles.cancle}>
            Cancel
          </button>
          <button type="submit"  className={styles.save}>Save</button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
}
