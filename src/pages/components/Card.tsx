import { Check, X } from "lucide-react"
import { useState } from "react";
import { Question } from "../../types";

interface ScoreProps{
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    question: Question;
}
const Card: React.FC<ScoreProps> = ({score, setScore, question})=>{
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div id='card' className={isActive ? 'active' : ''} onClick={()=>setIsActive(!isActive)}>
            <div id='front'>
                <div id='content'>
                    {question.question}
                </div>
            </div>
            <div id='back'>
                <div className='flex justify-end absolute top-0 right-0'>
                    Did you get it?
                    <Check onClick={()=>{

                        setScore(score+1)
                        }}/>
                    <X/>
                </div>
                <div id='content' className="flex justify-center items-center h-full">
                <ol className="flex-col justify-center items-center">
                    {question.answers.map((answ, ind)=>
                        <li className="text-center">{answ}</li>
                    )}
                </ol>
                </div>
            </div>
        </div>
    )
}

export default Card