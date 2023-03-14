import styles from './PlantItem.module.css';
import { useHistory } from 'react-router-dom';

export default function PlantsItem({id, name, species, image}){
    const history = useHistory();
    const gotoPlantDetail = () => {
        history.push(`/plant/detail/${id}`)
    }
    return(
        <div className={styles.container}>
            <div className={styles.image} onClick={gotoPlantDetail} style={{backgroundImage:`url(${image})`}}></div>
            <div className={styles.description}>
                <p className={styles.name}>{name}</p>
                <p className={styles.spes}>{species}</p>
            </div>
        </div>
    )
}