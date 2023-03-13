import styles from './SelectItem.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
export default function SelectItem(props){
    const [isActive, setIsActive] = useState(false);
    const [touched, setTouched] = useState(false)
    const dispatch = useDispatch();

    const toggleActive = () => {
        setIsActive(!isActive)
        setTouched(true);
        if(!isActive){
            dispatch({type:"ADD_PLANT_TO_GARDEN", payload:props.id})
        }else{
            if(touched){
                dispatch({type:"REMOVE_PLANT_TO_GARDEN", payload:props.id})
            }
        }
    }
    return(
        <div className={styles.item_container} onClick={toggleActive}>
            <div className={styles.image} style={isActive ? {border:"solid 2px rgb(200,200,200)"} : {}}></div>
            <div className={styles.name}><p>{props.name}</p></div>
        </div>
    )
}