import styles from './PlantItem.module.css';

export default function PlantsItem({name, species, image}){
    return(
        <div className={styles.container}>
            <div className={styles.image} onClick={()=>{console.log('Plant clicked')}}></div>
            <div className={styles.description}>
                <p className={styles.name}>{name}</p>
                <p className={styles.spes}>{species}</p>
            </div>
        </div>
    )
}