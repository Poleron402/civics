import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from '../data/questions.json'
import Card from "./components/Card";
import { Question } from "../types";
const Quiz = () =>{
    const [testStart, setTestStart] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    let [badQuestions, setBadQuestions] = useState<Question[]>(()=>{
        const storedBadQuestions = localStorage.getItem('myBadQuestions')
        return storedBadQuestions? JSON.parse(storedBadQuestions): []
    });
    let [doBad, setDoBad] = useState<boolean>(false)
    let [questionCounter, setQuestionCounter] = useState<number>(0);
    let [score, setScore] = useState<number>(0);
    let [newSet, setNewSet] = useState<boolean>(false);
    let [doFull, setDoFull] = useState<boolean>(false)
    // console.log(data)
    let {state} = useParams()

    const getQuestionsAndAnswers = () =>{
        if (!doFull){
            if (questions.length !== 10 || newSet || !doBad){
                const randoms:number[] = [];
                while (randoms.length < 10) {
                const randomNum = Math.floor(Math.random() * 99);
                    if (!randoms.includes(randomNum) && badQuestions.indexOf(data[randomNum])==-1) {
                        randoms.push(randomNum);
                    }
                }
                let selected=randoms.map(element => data[element]);
                setQuestions(selected);
            }
        }else{
            setQuestions(data)
        }
        if(doBad){
            const randoms:number[] = [];
            while (randoms.length < badQuestions.length) {
            const randomNum = Math.floor(Math.random() * badQuestions.length);
                if (!randoms.includes(randomNum)) {
                    randoms.push(randomNum);
                }
            }
            let selected=randoms.map(element => badQuestions[element]);
            setQuestions(selected);

        }
    }
    useEffect(()=>{

        if (newSet) {
            getQuestionsAndAnswers();
            setNewSet(false); // Reset the flag after generating questions
        }
    }, [newSet])
    useEffect(()=>{
        getQuestionsAndAnswers()
    }, [])
    return (
        <>
        <div className="flex-col w-full  justify-items-center">
            <h2 className="text-4xl pt-10">Hi there in {state}</h2>
            <p className="text-med border-b border-gray-300">*State adjusted answers are in the works*</p>
            {!testStart ?
                <button className="mt-10 hover:bg-red-800" onClick = {()=>setTestStart(true)}>Begin Learning</button>
            :
            (
                <>
                    <button className="mt-10 hover:bg-slate-600" onClick = {()=>{
                        setDoBad(false)
                        setNewSet(true);
                        setScore(0);
                        setQuestionCounter(0);
                        }}>New Set</button>
                    
                    {badQuestions.length > 0 ?
                        <>
                        <button className="mt-10 hover:bg-red-900 ml-5" onClick = {()=>{
                            setDoBad(true)
                            setNewSet(true);
                            setScore(0);
                            setQuestionCounter(0);
                            }}>Practice Weak</button>
                        </>
                        :
                        <>
                            <p className="mt-5">Weak questions will be practiced once there are more than 1.</p>
                            
                        </>
                    }
                    <button className="mt-10 hover:bg-green-600 ml-5" onClick = {()=>{
                        setDoBad(false)
                        setNewSet(true);
                        setScore(0);
                        setDoFull(true);
                        setQuestionCounter(0);
                        }}>Practice Full Set</button>
                    <p className="mt-5 text-xl">Current Weak counter: {badQuestions.length}/10</p>
                    {
                       (questionCounter<=9&& !doBad) || (questionCounter<questions.length &&doBad) || (questionCounter<questions.length && doFull)? (
                        <Card score={score} setScore={setScore} question={questions} questionCounter={questionCounter} setQuestionCounter={setQuestionCounter} setBadQuestions = {setBadQuestions} badQuestions={badQuestions} doBad = {doBad}/>
                       ):
                       (
                        <div className="pt-55 flex flex-col justify-center items-center">
                            {(score>=6 && !doBad) || (score>=questions.length &&doBad)?
                                <h1 className="">Congrats!  🇺🇸</h1>
                            :
                                <h1>Not quite.</h1>
                            }
                        </div>

                       )
                    }
                    <p className="pt-6">Score: {score}/{questions.length} (6 to pass)</p>
                </>
            )
            }
        </div>
       
        </>
    )
}

export default Quiz;