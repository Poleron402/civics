import { Check, X } from "lucide-react"
import { useState } from "react";
const Card = ()=>{
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div id='card' className={isActive ? 'active' : ''} onClick={()=>setIsActive(!isActive)}>
            <div id='front'>
                <div>
                    <Check/>
                    <X/>
                </div>
                <div id='content'>
                    Side Two
                </div>
            </div>
            <div id='back'>
                <div>
                    <Check/>
                    <X/>
                </div>
                <div id='content'>
                    Side One
                </div>
            </div>
        </div>
    )
}

export default Card