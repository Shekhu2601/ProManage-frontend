import Styles from "./Sidebar.module.css"
import promanage from "./promange.png"
import board from "./board.png"
import analytics from "./analytics.png"
import setting from "./setting.png"
import logOut from "./logout.png"
import { useNavigate } from "react-router-dom"
export default function Sidebar(){
    const navigate =useNavigate()
    const logout =()=>{
        localStorage.removeItem("token");
        alert("you are logged out")
        navigate("/login")
        
    }
    return (
            <div className={Styles.container} >
            
            <p> <img src={promanage} alt="pro" /> </p>
           
           <div >

           <button className={Styles.btn}> <img src={board} alt="board" /> </button>
            <button className={Styles.btn} > <img src={analytics} alt="analytics" /> </button>
            <button className={Styles.btn}> <img src={setting} alt="setting" /> </button>
           </div>
           <button  className={Styles.logbtn} onClick={logout} > <img src={logOut} alt="log" /> </button>
            </div>
            
    )
}