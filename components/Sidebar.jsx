import Styles from "./Sidebar.module.css"
import promanage from "./promange.png"
import board from "./board.png"
import analytics from "./analytics.png"
import setting from "./setting.png"
import logOut from "./logout.png"
import { useNavigate } from "react-router-dom"

import { useState } from "react"
import Setting from "./setting/setting"
import Analytic from "./analytics/analytic"

export default function Sidebar(){
    const navigate =useNavigate()
    const logout =()=>{
        localStorage.removeItem("token");
        alert("you are logged out")
        navigate("/login")
        
    }
    const [openA ,setOpenA] =useState(false);
    const [open ,setOpen] =useState(false);
      const Close = ()=>{
        setOpen(false)
        setOpenA(false)
      }
     
           
      
    return (
            <div className={Styles.container} >
             {open && <Setting Close={Close}/>}
             {openA&& <Analytic Close={Close}/>}

            <p> <img src={promanage} alt="pro" /> </p>
           
           <div >

           <button className={Styles.btn}> <img src={board} alt="board" /> </button>
            <button onClick={()=>setOpenA(true) }className={Styles.btn} > <img src={analytics} alt="analytics" /> </button>
            <button onClick={()=>setOpen(true)} className={Styles.btn}> <img src={setting} alt="setting" /> </button>
           </div>
           <button  className={Styles.logbtn} onClick={logout} > <img src={logOut} alt="log" /> </button>
            </div>
            
    )
}