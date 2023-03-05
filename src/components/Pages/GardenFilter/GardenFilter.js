import PlantsItem from '../Plants/PlantItem/PlantItem'
import styles from './GardenFilter.module.css'
export default function GardenFilter(){
    return(
        <div className='page_container'>
        <div className={styles.main}>
         <PlantsItem/>
         <PlantsItem/>
         <PlantsItem/>
         <PlantsItem/>
         <PlantsItem/>
         </div>
     </div>
    )
}