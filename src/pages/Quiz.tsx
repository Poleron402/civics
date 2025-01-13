import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from '../data/questions.json'
import Card from "./components/Card";
import { Question } from "../types";
const Quiz = () =>{
    const [testStart, setTestStart] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    let [questionCounter, setQuestionCounter] = useState<number>(0);
    let [score, setScore] = useState<number>(0);


    // console.log(data)
    let {state} = useParams()

    const getQuestionsAndAnswers = () =>{
        const randoms = [Math.floor(Math.random()*10)]
        randoms.forEach(element => {
            setQuestions([...questions, data[element]])
        });
    }
    useEffect(()=>{
        getQuestionsAndAnswers()
    }, [])
    return (
        <>
        <div className="flex-col w-full  justify-items-center">
            <h2 className="text-3xl pt-10">Hi there in {state}</h2>
            <p className="text-sm border-b border-gray-300">*State adjusted answers are in the works*</p>
            {!testStart ?
                <button className="mt-10 hover:bg-red-800" onClick = {()=>setTestStart(true)}>Begin Learning</button>
            :
            (
                <>
                    <Card score={score} setScore={setScore} question={questions[questionCounter]} />
                    <p className="pt-6">Score: {score} (6 to pass)</p>
                </>
            )
            }
        </div>
       
        </>
    )
}

export default Quiz;