import styles from './ExploreGarden.module.css';
import ExploreGardenItem from './ExploreGardenItem/ExploreGardenItem';
import { useSelector, useDispatch } from 'react-redux';
export default function ExploreGarden(){
    return(
        <div>
            <ExploreGardenItem/>
        </div>
    )
}