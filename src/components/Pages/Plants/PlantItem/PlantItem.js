import styles from './PlantItem.module.css';

export default function PlantsItem(){
    return(
        <div className={styles.container}>
            <div className={styles.image}></div>
            <div className={styles.description}>
                <p className={styles.name}>Plant Name</p>
                <p className={styles.spes}>Plant species</p>
            </div>
        </div>
    )
}