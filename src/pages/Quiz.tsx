import { useParams } from "react-router-dom";


const Quiz = () =>{
    let {state} = useParams()
    return (
        <div>
            <h1>Hi! {state}</h1>
        </div>
    )
}

export default Quiz;