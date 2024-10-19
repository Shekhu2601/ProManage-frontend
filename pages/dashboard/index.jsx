import Sidebar from "../../components/Sidebar"
import styles from "./dashboard.module.css"
export default function Dashboard (){

    return(
        <div className={styles.container}>
        <div className={styles.sidebar}>
            <Sidebar/>
        </div>
        <div className={styles.home}>
            <div className={styles.topbar}></div>
            <div className={styles.main}>
                <div className={styles.backlog}>
                    <p>Backlog  </p> 
                </div>
                <div className={styles.progress}>
                    <p>Progress</p>
                </div>
                <div className={styles.todo}>
                    <p>To do</p>
                </div>
                <div className={styles.done}>
                    <p>Done</p>
                </div>
            </div>
        </div>
        </div>
    )
}