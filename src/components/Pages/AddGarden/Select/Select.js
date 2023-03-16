import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './Select.module.css'
import SelectItem from './SelectItem/SelectItem'
export default function Select(){
    const dispatch = useDispatch();
    const plants = useSelector((store)=>store.plant.noGardenPlantReducer);

    useEffect(()=>{
        dispatch({type:'FETCH_PLANT_NO_GARDEN'})
    },[])

    return(
        <div className={styles.select_container}>
            {plants.map((plant)=>{
                return(
                    <SelectItem key={plant.plant_table_id} name={plant.plant_name} id={plant.plant_table_id} image={plant.plant_image}/>
                )
            })}

        </div>
    )
}