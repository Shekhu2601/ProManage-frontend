import { useState ,useEffect} from "react";
import styles from "./navbar.module.css"
import { GoPeople } from "react-icons/go";
import AddboardMember from "../addboard/addboardM";
export default function Navbar(){
    const [open ,setOpen] =useState(false);
    const Close = ()=>{
      setOpen(false)
     
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [username, setUsername] = useState('');
    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem('user');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);
    return( <>
       <div className={styles.header} >
       <div>Welcome, {username}</div>
       <div>
        <div className={styles.date}>
        {new Date().getDate() +"th "}  
        {months[new Date().getMonth()]}, 
         {new Date().getFullYear()}
        </div>
        
         
          <select className={styles.select} name="" id=""> 
          <option value="Today">Today</option>
          <option selected value="this week">This Week</option>
          <option  value="this month">This month</option>
          </select>
        </div>
       </div>
        
        {open && <AddboardMember Close={Close}/> }
        <div className={styles.container}>
            <div className={styles.board}> <h2>Board  </h2> <p onClick={()=>setOpen(true)} className={styles.addpeople}> <GoPeople /> Add people</p> </div>
        </div>

        </>
    )
}