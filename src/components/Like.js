import React, { useState, useEffect } from 'react'
import { ReactComponent as Plus } from '../logos/icon-plus.svg';
import { ReactComponent as Minus } from '../logos/icon-minus.svg';
const Like = (props) => {
  const {score} = props;
    const [count, setCount] = useState(() =>{
      // const save = localStorage.getItem("scores");
      // const parseSave = JSON.parse(save)
      return score
    });

    const [check, setCheck] = useState(() =>{
      const save = localStorage.getItem("like1");
      const parseSave = JSON.parse(save)
      return parseSave || false
    });

    const [secondCheck, setSecondCheck] = useState(() =>{
      const save = localStorage.getItem("like2");
      const parseSave = JSON.parse(save)
      return parseSave || false
    });

    useEffect(()=>{
      localStorage.setItem("like2", JSON.stringify(secondCheck));
    }, [secondCheck])

    useEffect(()=>{
      localStorage.setItem("like1", JSON.stringify(check));
    }, [check])

    useEffect(()=>{
      localStorage.setItem("scores", JSON.stringify(count));
    },[count])

    const handleIncrement = () => {
        setCount(prev => prev + 1);
        console.log("hello world");
        setSecondCheck(false)
        setCheck(true);
        
    }
    const handleDecrement = () => {
        setCount(prev => prev - 1);
        setCheck(false)
        setSecondCheck(true);
        
    }

  return (
    <div className='like'>
        <div onClick={!check ? handleIncrement : null} className="like__increment"><Plus /></div>
        <p>{count < 0 ? 0 : count}</p>
        <div onClick={!secondCheck ? handleDecrement : null} className="like__increment"><Minus /></div>
    </div>
  )
}

export default Like