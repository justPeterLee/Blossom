import PlantsItem from '../../Plants/PlantItem/PlantItem'
import styles from './FeaturePlants.module.css'
export default function FeaturePlants(){
    return(
        <div className={styles.main}>
            <PlantsItem/>
            <PlantsItem/>
            <PlantsItem/>
            <PlantsItem/>
        </div>
    )
}