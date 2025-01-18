import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from '../data/questions.json'
import Card from "./components/Card";
import { Question } from "../types";
const Quiz = () =>{
    const [testStart, setTestStart] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    let [score, setScore] = useState<number>(0);
    let [newSet, setNewSet] = useState<boolean>(false);
    
    // console.log(data)
    let {state} = useParams()

    const getQuestionsAndAnswers = () =>{
        if (questions.length !== 10 || newSet){
            const randoms:number[] = [];
            while (randoms.length < 10) {
            const randomNum = Math.floor(Math.random() * 99);
                if (!randoms.includes(randomNum)) {
                    randoms.push(randomNum);
                }
            }
            let selected=randoms.map(element => data[element]);
            setQuestions(selected);
        }
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
                    <button className="mt-10 hover:bg-red-800" onClick = {()=>{
                        setNewSet(true)
                        setScore(0)
                        getQuestionsAndAnswers()
                        }}>New Set</button>
                    <Card score={score} setScore={setScore} question={questions} newSet={newSet} setNewSet={setNewSet}/>
                    <p className="pt-6">Score: {score} (6 to pass)</p>
                </>
            )
            }
        </div>
       
        </>
    )
}

export default Quiz;