import { Check, X } from "lucide-react"
import {useEffect, useState } from "react";
import { Question } from "../../types";

interface ScoreProps{
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    questionCounter: number,
    setQuestionCounter: React.Dispatch<React.SetStateAction<number>>
    question: Question[];
    setBadQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    badQuestions: Question[];
    doBad: boolean;
}
const Card: React.FC<ScoreProps> = ({score, setScore, question, questionCounter, setQuestionCounter, setBadQuestions, badQuestions, doBad})=>{
    const [isActive, setIsActive] = useState<boolean>(false);
    let [tempHidden, setTempHidden] = useState<boolean>(false);

    const handleAnswer = (correct: boolean)=>{
        if (!correct){

        }
        setTempHidden(true);
        setIsActive(false)
        setTimeout(() => {
            setScore(correct ? score + 1 : score); // Update the score if correct
            setQuestionCounter(questionCounter + 1); // Increment the question counter
          }, 300);
    }
    const handleBadQuestions = (q: Question) =>{
        if (badQuestions.indexOf(q) == -1){
            setBadQuestions([...badQuestions, q]) 
        }else{
            alert("This question is already in Weak")
        }
        
        console.log(badQuestions)
    }
    const removeBadQuestions = (q: Question) =>{
        setBadQuestions(badQuestions.filter(question => question !== q))
    }
    useEffect(()=>{
        localStorage.setItem('myBadQuestions', JSON.stringify(badQuestions))
    }, [badQuestions])
    return (
        <>
            <div id='card' className={isActive ? 'active' : ''}>  
                <div id='front' onClick={()=>{
                    setTempHidden(false)
                    setIsActive(true)}}>
                    <div id='content' className="p-10" >
                        <p className="text-center text-xl ">{question[questionCounter].question}</p>
                    </div>
                </div>
                <div id='back' onClick={()=>setIsActive(false)}>
                    {!tempHidden &&
                    <div id='content' className="flex justify-center items-center h-full">

                    <ol className="flex-col justify-center items-center text-l p-10">
                        {question[questionCounter].answers.map((answ, ind)=>
                            <li id={`answer-${ind}`} className="text-center">{answ}</li>
                        )}
                    </ol>
                    </div>
                    }
                </div>
            </div>
            {isActive&&
            <>
            <div className='flex-col pt-10'>
                <div className="flex items-center justify-center">
                <p className="text-xl pb-5">Did you get it?</p>
                </div>
                    
                    <div className="flex">
                    <button  className="correct_options hover:bg-green-700" onClick={()=>{
                        handleAnswer(true)
                        }}>Yes</button>
                    <button className="correct_options hover:bg-red-700" onClick={()=>{
                        handleAnswer(false)
                        }}>No</button>
                   
                    </div>                    
            </div>
            {!doBad?
            <button className = "mt-5" onClick={()=>{
                handleBadQuestions(question[questionCounter])
                }}>Add To Weak</button>
            :
            <button className = "mt-5" onClick={()=>{
                removeBadQuestions(question[questionCounter])
                }}>Remove From Weak</button>
            }
                </>
            }

        </>
    )
}

export default Card