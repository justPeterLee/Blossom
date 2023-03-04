import styles from './GardenItem.module.css';

import {BsArrowRight} from 'react-icons/bs'

export default function GardenItem({name, type, num, create}){
    return(
        <div className={styles.container}>

        <div className={styles.title}>
          <p>Garden Name</p>
        </div>
  
  
        <div className={styles.description}>
          <p>type: type of garden</p>
          <p>plants: number of plants</p>
        </div>
  
  
        <div className={styles.extraDescription}>
  
          <div className={styles.date}>
              <p>created: June 18th, 2023</p>
          </div>
  
          <div className={styles.arrow}></div>
          <BsArrowRight className={styles.arrow}/>
        </div>
  
      </div>
    )
}