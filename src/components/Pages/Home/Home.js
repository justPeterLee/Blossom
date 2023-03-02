import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Home(){
    const dispatch = useDispatch();
    
    const garden = useSelector(store=>store.garden);


    useEffect(()=>{
        dispatch({type:"FETCH_GARDEN"})
    },[])

    return(
        JSON.stringify(garden)
   
    )
}