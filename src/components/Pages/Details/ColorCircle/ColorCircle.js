import styles from './ColorCircle.module.css';
export default function ColorCircle({color}){
    return(
        <div className={styles.color_container}>
            <div className={styles.color} style={{backgroundColor:`${color}`}}></div>
        </div>
    )
}