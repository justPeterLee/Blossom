import styles from './ExplorePlantItem.module.css';
export default function ExplorePlantItem({name, spes, image}){
    return(
        <div className={styles.container}>
            <div className={styles.image} style={image.small_url ? {backgroundImage:`url(${image.small_url})`}: {}}></div>
            <div className={styles.description}>
                <p className={styles.name}>{name}</p>
                <p className={styles.spes}>{spes}</p>
            </div>
        </div>
    )
}