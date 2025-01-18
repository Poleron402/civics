import { Check, X } from "lucide-react"
import { useEffect, useState } from "react";
import { Question } from "../../types";

interface ScoreProps{
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    newSet: boolean,
    setNewSet: React.Dispatch<React.SetStateAction<boolean>>
    question: Question[];
}
const Card: React.FC<ScoreProps> = ({score, setScore, question, newSet, setNewSet})=>{
    const [isActive, setIsActive] = useState<boolean>(false);
    let [questionCounter, setQuestionCounter] = useState<number>(0);
    let [tempHidden, setTempHidden] = useState<boolean>(false);

    const handleAnswer = (correct: boolean)=>{
        setTempHidden(true);
        setIsActive(false)
        setTimeout(() => {
            setScore(correct ? score + 1 : score); // Update the score if correct
            setQuestionCounter(questionCounter + 1); // Increment the question counter
          }, 300);
    }
    useEffect(()=>{
        if(newSet){
            console.log('Im here')
            setQuestionCounter(0)
            setScore(0)
        }
    }, [newSet])

    return (
        <>
        {questionCounter<=9?(
        <>
            <div id='card' className={isActive ? 'active' : ''}>
                <div id='front' onClick={()=>{
                    setTempHidden(false)
                    setIsActive(true)}}>
                    <div id='content' >
                        <p className="text-center">{question[questionCounter].question}</p>
                    </div>
                </div>
                <div id='back' onClick={()=>setIsActive(false)}>
                    {!tempHidden &&
                    <div id='content' className="flex justify-center items-center h-full">

                    <ol className="flex-col justify-center items-center">
                        {question[questionCounter].answers.map((answ, ind)=>
                            <li id={`answer-${ind}`} className="text-center">{answ}</li>
                        )}
                    </ol>
                    </div>
                    }
                </div>
            </div>
            {isActive&&
            <div className='flex justify-end pt-10'>
                    Did you get it? 
                    <Check onClick={()=>{
                        handleAnswer(true)
                        }}/>
                    <X onClick={()=>
                        handleAnswer(false)
                    }/>
            </div>
            }
        </>
        ):(
            <div className="pt-10 flex flex-col justify-center items-center">
                {score>=6?
                    <h1 className="">Congrats!  🇺🇸</h1>
                :
                    <h1>Not quite.</h1>
                }
            </div>
        )
    }
    </>
    )
}

export default Card