import styles from './AddPlant.module.css';
import PlantInfo from './PlantInfo/PlantInfo'
import PlantInput from './PlantInput/PlantInput';
export default function AddPlant(){
    return(
        <div className={styles.plant_container}>
            <button>create</button>
            <PlantInfo/>
            <PlantInput/>
        </div>
    )
}