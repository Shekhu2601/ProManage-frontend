
import styles from "./analytic.module.css"
export default function Analytic({Close}){

    return( <>
        <div onClick={Close} className={styles.wrapar}
        ></div>
        <div className={styles.container}>
            <h1>Analytics</h1>



        </div>
        </>
    )
}