
import styles from "./setting.module.css"
export default function Setiing({Close}){

    return( <>
        <div onClick={Close} className={styles.wrapar}
        > </div>
        <div className={styles.container}>
            <h1>Setting</h1>



        </div>
        </>
    )
}