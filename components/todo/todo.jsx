import React from 'react';
import {getAllTask, }  from "../../services/task"
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styles from "./todo.module.css"
import { isEditable,isView} from "../../helper"
import { GoDotFill } from "react-icons/go";


import { useParams } from 'react-router-dom';

export default function Tasklist() {
  const params = useParams();
  
   
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
  const routeToJobDetail = (id)=>{
    navigate(`/list/${id}`)
  } 
  const routeToEditJob = (id)=>{
    navigate(`/editjob/${id}`)
  } 
  
  
  

  

  return (
   
  <>
  
  <div className={styles.container}>
      

      {isLoading ? <p>Loading...</p>:tasks.map((task ,idx)=> 
        <p className= {isView(task.creator)? styles.task :styles.taskD} key={idx}>
             {isView(task.creator) ?<div><p className={styles.priority}> <GoDotFill className={task.priority=="LOW PRIORITY"? styles.priL:task.priority=="HIGH PRIORITY" ?styles.priH:task.priority=="MODERATE PRIORITY"?styles.priM:null}/> {task.priority}</p> <div className={styles.title}>
       {task.title}
       </div>  
       <div>
        <input type="text"/> 
       </div>
       <div>
          {task._id? <button onClick={() =>routeToJobDetail(task._id)}>view</button>:null}

          {task ?isEditable(task.creator) ? <button onClick={() =>routeToEditJob(job._id)}>Edit</button> : null:null}
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
