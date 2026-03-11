'use client'

import { useState } from 'react';
import FigmaButton from '../components/FigmaButton';
import Toggle from '../components/Toggle';
import LoadInput from '../components/LoadInput';

function PartOne() {

    const [disabled, setDisabled] = useState(true);
    const [boring, setBoring] = useState(true);
    const [loadingSeconds, setLoadingSeconds] = useState(0);

    return (
        <div className="flex flex-col grow gap-10">

            <div className="flex flex-col gap-5 w-full max-w-[1000px] self-center">
                <Toggle
                    leftLabel="Disabled"
                    rightLabel="Clickable"
                    isLeft={disabled}
                    onToggle={() => setDisabled(!disabled)}
                ></Toggle>
                <Toggle
                    leftLabel="Boring"
                    rightLabel="Exciting"
                    isLeft={boring}
                    onToggle={() => setBoring(!boring)}
                ></Toggle>
                <LoadInput
                    onGo={(seconds) => setLoadingSeconds(seconds)}
                ></LoadInput>
            </div>

            <div className="flex justify-center">
                <FigmaButton
                    disabled={disabled}
                    boring={boring}
                    loadingSeconds={loadingSeconds}
                ></FigmaButton>
            </div>
        </div>
    ) 
}

export default PartOne;