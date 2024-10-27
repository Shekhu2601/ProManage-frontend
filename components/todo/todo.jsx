import React from 'react';
import {deleteTask, editTask, getAllTask, }  from "../../services/task"
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styles from "./todo.module.css"
import { isEditable,isView} from "../../helper"
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Swal from 'sweetalert2'


import { useParams } from 'react-router-dom';

export default function Tasklist() {
  const params = useParams();
  
  const[count, setCount]=useState(0)
  const [tasks , setTasks]= useState([]);
  const navigate =useNavigate();
  const  [isLoading , setIsLoading]= useState(true);
  const getallTasks =()=>{
    getAllTask().then(res => {
      setTasks(res.data);
      setIsLoading(false)
      
    })
  }
  useEffect(()=> {
 getallTasks()

  }, [])
  const handleDelete = (id)=>{
  
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        deleteTask(id)
      }
      window.location.reload()
    });
    
  } 
  const routeToEditTask = (id)=>{
    navigate(`/edittask/${id}`)
  } 
  const[edit ,setEdit]=useState(false)
  
  const[show, setShow]=useState(false)
  const openE = ()=>{
    if(edit===false){
      setEdit(true)
    }
    else{
      setEdit(false)
    }
    }
  const opencheckB = ()=>{
  if(show===false){
    setShow(true)
  }
  else{
    setShow(false)
  }
  }
 
  

  return (
   
  <>
  
  <div className={styles.container}>
      

      {isLoading ? <p>Loading...</p>:tasks.map((task ,idx)=> 
        <p className= {isView(task.creator)? styles.task :styles.taskD} key={idx}>
          
             {isView(task.creator) ?<div>
              
              
              <p className={styles.priority}> <GoDotFill className={task.priority=="LOW PRIORITY"? styles.priL:task.priority=="HIGH PRIORITY" ?styles.priH:task.priority=="MODERATE PRIORITY"?styles.priM:null}/> {task.priority}</p> <div className={styles.title}> 
       {task.title}
       {}
       
       </div>  
       
       <div className={styles.checkB}> 

        <p className={styles.cb}> <p>Checklist(0/3)</p> <button className={styles.arrow} onClick={opencheckB} > {show? <IoIosArrowUp />:<IoIosArrowDown /> } </button>  </p>
        {show ? <div   className={styles.check}>
       <input className={styles.inc} type="checkbox" name="" id="" />
       {   task.checklists}
       </div>:null }
       </div>
       
       <div className={styles.dot}>
        <button className={styles.edbt} onClick={openE}>...</button>
       <div className={edit? styles.e:styles.taskD}>
       {task ?isEditable(task.creator) ? <button className={styles.edbtn} onClick={() =>routeToEditTask(task._id)}>Edit</button> : null:null}
          {task._id? <button className={styles.edbtn} onClick={(e) =>handleDelete(task._id)}>Delete</button>:null}

         
          </div>


         
          </div>

          <div>
    <button>Backlog</button>
    <button>Progress</button>
    <button>Done</button>
</div>
       </div>:null}
       
         


        </p>
      )}
</div>
  </>
   
  )
}
