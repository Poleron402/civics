import { useParams } from "react-router-dom";
import { useState } from "react";
import data from '../data/questions.json'
import Card from "./components/Card";
interface Question {
    question: string;
    answers: string[];
}
const Quiz = () =>{
    const [testStart, setTestStart] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    console.log(data)
    let {state} = useParams()

    const getQuestionsAndAnswers = () =>{
        const randoms = [Math.floor(Math.random()*10)]
        randoms.forEach(element => {
            setQuestions([...questions, data[element]])
        });
    }
    return (
        <>
        <div className="flex-col w-full  justify-items-center">
            <h2 className="text-3xl pt-10">Hi there in {state}</h2>
            <p className="text-sm border-b border-gray-300">*State adjusted answers are in the works*</p>
            {!testStart ?
            <button className="mt-10 hover:bg-red-800" onClick = {()=>setTestStart(true)}>Begin Learning</button>
            :
            (
                <Card/>
            )
            }
        </div>
       
        </>
    )
}

export default Quiz;