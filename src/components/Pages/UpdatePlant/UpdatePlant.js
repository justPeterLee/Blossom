import styles from './UpdatePlant.module.css';
import { useHistory, useParams } from 'react-router-dom';
export default function UpdatePlant(){
    const history = useHistory()
    const params = useParams()
    const plantId = params.id
    return(
        <div>
            <button onClick={()=>{history.push(`/plant/detail/${plantId}`)}}>go back</button>
            <p>Update Plant</p>
        </div>
    )
}