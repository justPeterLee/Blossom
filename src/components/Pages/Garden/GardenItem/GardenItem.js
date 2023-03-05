import styles from './GardenItem.module.css';

import {BsArrowRight} from 'react-icons/bs'

export default function GardenItem({name, type, num, create}){
    return(
        <div className={`${styles.container} clickable`} onClick={()=>{console.log("go to garden, ")}}>

        <div className={styles.title}>
          <p>{name}</p>
        </div>
  
  
        <div className={styles.description}>
          <p>type: {type}</p>
          <p>plants: {num}</p>
        </div>
  
  
        <div className={styles.extraDescription}>
  
          <div className={styles.date}>
              <p>created: {create}</p>
          </div>
  
          <div className={styles.arrow}></div>
          <BsArrowRight className={styles.arrow}/>
        </div>
  
      </div>
    )
}