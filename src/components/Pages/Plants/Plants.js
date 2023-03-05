import PlantsItem from './PlantItem/PlantItem';
import styles from './Plants.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
export default function Plants(){
    const dispatch = useDispatch();
    const plants = useSelector(store=>store.plant);

    useEffect(()=>{
        dispatch({type:"FETCH_PLANT"})
    },[])
    return(
        <div className='page_container'>
           <div className={styles.main}>
            {plants.map((plant)=>{return(
                <PlantsItem 
                key={plant.id}
                id={plant.id}
                name={plant.plant_name}
                species={plant.scientific_name}/>
            )})}
            </div>
        </div>
    )
}
