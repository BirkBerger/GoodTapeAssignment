'use client'

import { useState, KeyboardEvent } from "react";

interface Props {
    onGo: (seconds: number) => void;
}

function LoadInput({ onGo }: Props ) {

    const [seconds, setSeconds] = useState(0);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') onGo(seconds);
    }

    return (
        <div className="flex items-center justify-center text-nowrap gap-2">
            
            <span>Load for</span>
            <input className="border-b-2 border-[#ffd600] w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
                id="loading-seconds"
                type="number"
                value={!seconds ? "" : seconds}
                onChange={(e) => setSeconds(e.target.valueAsNumber)}
                min="0"
                pattern="(?:0|[1-9]\d*)"
                inputMode="decimal"
                onKeyDown={handleKeyDown}
            ></input>
            <span>seconds.</span>
            
            <button className="bg-[#ffd600] hover:bg-[#ecc600] cursor-pointer transition-bg duration-150 rounded-2xl h-8 w-20"
                onClick={() => onGo(seconds)}
                >
                Go!
            </button>
        </div>
    )
}

export default LoadInput;