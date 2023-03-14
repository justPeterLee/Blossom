import styles from './PlantItem.module.css';
import { useHistory } from 'react-router-dom';

export default function PlantsItem({id, name, species, image}){
    const history = useHistory();
    const gotoPlantDetail = () => {
        history.push(`/plant/detail/${id}`)
    }
    return(
        <div className={styles.container}>
            <img className={styles.image} onClick={gotoPlantDetail} src="/images/testPlant4.jpeg"></img>
            <div className={styles.description}>
                <p className={styles.name}>{name}</p>
                <p className={styles.spes}>{species}</p>
            </div>
        </div>
    )
}