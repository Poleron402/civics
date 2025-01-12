import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface States{
    id: number;
    state: string;
    usps: string;
    ap: string;
}

function StartingPage(){
    const [state, setState] = useState<string>("");
    const [allStates, setAllStates] = useState<States[]>([]);
    const nav = useNavigate();
    const FetchStates = async()=>{
        let response = await axios.get('https://csumb.space/api/allStatesAPI.php');
        setAllStates(response.data)
    }

    useEffect(()=>{
        FetchStates();
    }, [])
    const routeHandler = ()=>{
        nav(`quiz/${state}/`)
    }
    return(
        <div className="flex items-center justify-center h-screen">
        <div className=" text-center pb-60">
            <h1 className="text-2xl">Pick your State</h1>
            <select className="text-black mr-10" name="state" onChange={e=>setState(e.target.value)} >
                <option selected disabled>--Select State--</option>
            {allStates && allStates.map((state, indx)=>
                (
                    <option value={state.state} key={indx} className="text-black">{state.state}</option>
                )
            )
            }
            </select>
            
            {
                state?(
                    <button onClick={routeHandler}>Begin</button>
                ):(
                    <button className="text-gray-200 cursor-not-allowed bg-gray-100 p-2 w-20 rounded-lg" disabled>Begin</button>
                )
            }
        </div>
    </div>
    )
}

export default StartingPage;