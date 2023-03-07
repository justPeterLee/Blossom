import styles from './PlantInput.module.css'
export default function PlantInput(){
    return(
        <div className={styles.input_container}>
            <div className={styles.name}>
                <div className={styles.name_title}><label>name</label></div>
                <input className={styles.name_input} />
            </div>

            <div className={styles.name}>
                <div className={styles.name_title}><label>height</label></div>
                <input className={styles.name_input} />
            </div>

            <div className={styles.name}>
                <div className={styles.name_title}><label>start date</label></div>
                <input className={styles.name_input} />
            </div>
        </div>
    )
}