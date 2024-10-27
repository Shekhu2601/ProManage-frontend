import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import Todo from "../../components/todo/todo"
import styles from "./dashboard.module.css"
import mini from "./mini.png"
import Todoinput from "../../components/todo/todoinput"
import Navbar from "../../components/navbar/navbar"
export default function Dashboard (){
    const [open ,setOpen] =useState(false);
      const Close = ()=>{
        setOpen(false)
      }

    return( <>
        <div className={styles.container}>
        <div className={styles.sidebar}>
            <Sidebar/>
        </div>
        {open && <Todoinput Close={Close}/>}
        <div className={styles.home}>
            <div className={styles.topbar}>
                <Navbar/>
            </div>
            <div className={styles.main}>
                <div className={styles.backlog}>
                    <p>Backlog  </p> 
                </div>

                <div className={styles.todo}>
                    <div className={styles.todobox}>
                        <p> To do </p>
                        <div className={styles.todos}>
                        <p className={styles.createtodo} onClick={()=>setOpen(true)} > +</p>
                        
                        <p> <img src={mini} /></p>
                        </div>

                    </div>
                  <Todo/>  
                </div>
                <div className={styles.progress}>
                    <p>Progress</p>
                </div>
                
                <div className={styles.done}>
                    <p>Done</p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}