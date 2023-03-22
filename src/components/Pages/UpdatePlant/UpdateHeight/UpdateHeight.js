import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./UpdateHeight.module.css";
import stage1 from "../../../../icon/Plant_Vector/stage1R.png";
import stage2 from "../../../../icon/Plant_Vector/stage2R.png";
import stage3 from "../../../../icon/Plant_Vector/stage3R.png";
import stage4 from "../../../../icon/Plant_Vector/stage4R.png";
import { useSelector } from "react-redux";
export default function ( props ) {
    const dispatch = useDispatch()
  const height = useSelector(
    (store) => store.plant.detailsReducer[0].plant_height
  );

  const inputSlider = useRef();
  const inputText = useRef();
  const [isBlurred, setIsBlurred] = useState(false);
  const [imageState, setImageState] = useState();
  const [heightInches, setHeightInches] = useState(height.height);
  const [heightFt, setHeightFt] = useState(height.ft);
  const [heightIn, setHeightIn] = useState(height.in);
  const [inputValue, setInputValue] = useState(
    Math.floor((height.height / 48) * 100)
  );

  const [switchInput, setSwitchInput] = useState(false);
  const [inputTextValue, setInputTextValue] = useState(height.height);
  const nextImg = () => {
    setImageState(imageState + 1);
    if (imageState + 1 === 5) {
      setImageState(1);
    }
  };

  const setHeightValue = () => {
    setInputValue(inputSlider.current.value);
    setHeightInches(Math.floor((inputValue / 100) * 48));
    setHeightFt(Math.floor(heightInches / 12));
    let heightFormat = heightInches - heightFt * 12;
    if (heightFormat > -1 && heightFormat < 12) {
      setHeightIn(heightFormat);
    }
    if (heightIn <= 9 && heightIn > -1) {
      setHeightIn(`0${heightInches - heightFt * 12}`);
    } else {
      setHeightIn(heightInches - heightFt * 12);
    }

    if (inputValue < 25) {
      setImageState(1);
    } else if (inputValue < 50 && inputValue >= 25) {
      setImageState(2);
    } else if (inputValue < 75 && inputValue >= 50) {
      setImageState(3);
    } else if (inputValue >= 50) {
      setImageState(4);
    }
  };

  const toggleInput = async () => {
    await setSwitchInput(!switchInput);
    inputText.current.focus();
    setIsBlurred(true);
  };

  const textFormat = (e) => {
    if (e.target.value) {
      let heightValue = parseInt(e.target.value);
      setHeightInches(heightValue)
      setInputTextValue(e.target.value);
      setHeightFt(Math.floor(heightValue / 12));
      let inch = heightValue - Math.floor(heightValue / 12) * 12
      if (inch <= 9 && inch > -1) {
        setHeightIn(`0${inch}`);
      } else {
        setHeightIn(inch);
      }
      
      setHeightIn(heightValue - Math.floor(heightValue / 12) * 12);
    }else{
        setInputTextValue(e.target.value);
        setHeightInches(0)
        setHeightFt(0);
        setHeightIn(`00`);
    }
  };

  const sendData = () => {
    props.onHeight({height : heightInches, ft: heightFt, inch:heightIn});
    dispatch({ type: "RESET_ALL_MODAL" })
  }

  useEffect(() => {
    inputSlider.current.style.background = `linear-gradient(to right, #3264fe ${inputValue}%, #d5d5d5 ${inputValue}%)`;
    if (inputValue < 25) {
      setImageState(1);
    } else if (inputValue < 50 && inputValue >= 25) {
      setImageState(2);
    } else if (inputValue < 75 && inputValue >= 50) {
      setImageState(3);
    } else if (inputValue >= 50) {
      setImageState(4);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.text_input_container}>
        {!switchInput ? (
          <button className={styles.height_button} onClick={toggleInput}>
            <p>
              {heightFt}' {heightIn}"
            </p>
          </button>
        ) : (
          <input
            onBlur={() => {
              if (isBlurred) {
                setSwitchInput(false);
                setIsBlurred(false);
              }
            }}
            ref={inputText}
            className={styles.text_input}
            type="text"
            value={inputTextValue}
            onChange={(event) => {
              textFormat(event);
            }}
            placeholder={"in inches"}
          ></input>
        )}
      </div>

      <div className={styles.input_container}>
        <input
          ref={inputSlider}
          type="range"
          className={styles.height_slider}
          value={inputValue}
          min="0"
          max="100"
          onInput={setHeightValue}
        />
      </div>
      <div className={styles.image_container}>
        {imageState === 1 ? <img src={stage1} /> : <></>}
        {imageState === 2 ? <img src={stage2} /> : <></>}
        {imageState === 3 ? <img src={stage3} /> : <></>}
        {imageState === 4 ? <img src={stage4} /> : <></>}
      </div>

      <button className={styles.save_button} onClick={sendData}>save</button>
    </div>
  );
}

// let test = '12adf12'
// console.log(parseInt(test))

// for(let i=0; i<test.length ; i++){
//     if(isNaN(test[i])){
//         console.log(test[i]);
//         break
//     }
// }
