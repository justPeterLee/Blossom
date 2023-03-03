import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Home(){
    const dispatch = useDispatch();
    
    const garden = useSelector(store=>store.garden);
    const plant = useSelector(store=>store.plant);

    useEffect(()=>{
        dispatch({type:"FETCH_GARDEN"});
        dispatch({type:"FETCH_PLANT"})
    },[])

    return(
        <div className="page_container">
            {JSON.stringify(plant)}
        </div>
        
    )
}