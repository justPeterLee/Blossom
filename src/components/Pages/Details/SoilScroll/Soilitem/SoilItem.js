import styles from './SoilItem.module.css'
export default function SoilItem({name}){
    return(
        <div className={styles.container}>
            <p>{name}</p>
        </div>
    )
}