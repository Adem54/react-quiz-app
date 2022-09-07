import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const PopUpModal = () => {

  const [resultOfPerc,setResultOfPer]=useState<number>(0);
  const { handleCloseModal,state,startFromScratch } = useGlobalContext();
  const {openModal,userQuizResults}=state;
  const [isTabChanged,setIsTabChanged]=useState<boolean>(false);
  useEffect(()=>{
    const followTabChange=()=>{
      setIsTabChanged(document.hidden);
      document.title=document.visibilityState;
    }
    document.addEventListener("visibilitychange",followTabChange)
    if(isTabChanged){
      alert("You changed your tabb, it is considered cheating!!!")
    }
  return ()=>  document.removeEventListener("visibilitychange",followTabChange);
  },[isTabChanged])

const percentOfResult=()=>{
  const totalRightAnswer=userQuizResults.filter((item:any)=>item.giveUserRightAnswer).length;
  const result:number=Number((totalRightAnswer/userQuizResults.length).toFixed(2));
  console.log("result: ",result);

   setResultOfPer(result*100);
}

useEffect(()=>{
if(openModal){
  percentOfResult();
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[openModal])

  return (
  <>
   <section className={`modal-popup ${openModal ? 'show-modal-bg': ''}`}>
      </section>
       <section className={`modal-message ${openModal ? 'show-modal-message': ''}`}>
      <h2 className="result-message">{
        resultOfPerc>80 ? "Congrats!" : resultOfPerc>=60 ? "You did good job" : "Don't worry about it!"
      }</h2>
      <p className="result-info">You answered {resultOfPerc}% of questions correctly</p>
       <button
       className="play-again btn"
      onClick={()=>{
        handleCloseModal();
        startFromScratch();
        
      }}
      ><Link to="/"> Play again</Link></button>
       </section>
  </>
  )
}

export default PopUpModal