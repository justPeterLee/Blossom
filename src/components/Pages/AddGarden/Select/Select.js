import styles from './Select.module.css'
import SelectItem from './SelectItem/SelectItem'
export default function Select(){
    const arr = [1,2,3,4,5,6,7,8,0]
    return(
        <div className={styles.select_container}>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
            <SelectItem/>
        </div>
    )
}