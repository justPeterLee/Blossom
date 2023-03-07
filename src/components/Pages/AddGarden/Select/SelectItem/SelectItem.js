import styles from './SelectItem.module.css'
import { useState } from 'react'
export default function SelectItem(){
    const [isActive, setIsActive] = useState(false)

    const toggleActive = () => {
        setIsActive(!isActive)
    }
    return(
        <div className={styles.item_container} onClick={toggleActive}>
            <div className={styles.image} style={isActive ? {border:"solid 2px black"} : {}}></div>
            <div className={styles.name}><p>name</p></div>
        </div>
    )
}