'use client'

import { useEffect, useRef, useState } from "react";

interface Props {
    disabled: boolean;
    boring: boolean;
    loadingSeconds: number;
}

function FigmaButton({ disabled, boring, loadingSeconds }: Props) {

    const [loadingCountdown, setLoadingCountdown] = useState(-1);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const buttonClasses = 'relative flex items-center w-[230px] h-9 text-nowrap text-base rounded-full overflow-hidden';
    const colorClasses = `${loadingCountdown > -1 ? 'bg-[#d1a3ff] text-white' : 'transition-colors transition-200'} ${disabled ? 'bg-[#d1a3ff] text-[#a852ff]' : 'bg-[#9225FF] text-[#faf7ff] cursor-pointer'}`;
    const shadowClasses = boring ? 'shadow-[0_2px_4px_0_#E0E0E0]' : 'shadow-[0_4px_8px_0_#E1C4FF]';
    const loadingClasses = `w-[var(--progress)] h-full bg-[#9225ff] ${loadingCountdown == 0 ? 'transition-none' : 'transition-[width] ease-linear'}`

    // Run loading animation on loadingSeconds change
    useEffect(() => {
        if (!loadingSeconds || loadingSeconds <= 0) {
            setLoadingCountdown(-1);
            return;
        }
        startLoading();
        return () => clearInterval(intervalRef.current!);
    }, [loadingSeconds])
    
    // Stop loading animation on disabled and boring change
    useEffect(() => {
        setLoadingCountdown(-1);
        clearInterval(intervalRef.current!);
    }, [disabled, boring])

    const startLoading = () => {        
        setLoadingCountdown(0);

        intervalRef.current = setInterval(() => {
            setLoadingCountdown(prev => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current!);
                    return -1;
                }
                return prev + 1;
            });
        }, loadingSeconds * 10);
    }

    return (
        <div>
            <button className={`${buttonClasses} ${colorClasses} ${shadowClasses}`}
                style={{ '--progress': `${loadingCountdown}%` } as React.CSSProperties }
            >
                { loadingCountdown > -1 &&
                    <>
                        <div className={loadingClasses}></div>
                        <div className="absolute left-3 right-3 grow flex place-content-between">
                            <div>Loading...</div>
                            <div>{loadingCountdown}%</div>
                        </div>
                    </>
                }

                { loadingCountdown == -1 && 
                    <div className="w-full">
                        I'm { disabled ? 'Disabled' : 'Clickable' } and { boring ? 'Boring' : 'Exciting!' }
                    </div>
                }
            </button>
        </div>
    )
}

export default FigmaButton;