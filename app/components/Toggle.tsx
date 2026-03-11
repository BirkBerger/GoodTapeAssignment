interface Props {
    leftLabel: String,
    rightLabel: String,
    isLeft: boolean,
    onToggle: () => void;
}

function Toggle({ leftLabel, rightLabel, isLeft, onToggle }: Props) {
 
    const sliderShadow = 'shadow-[inset_2px_3px_2px_rgba(0,0,0,0.2),inset_-2px_-3px_2px_rgba(255,255,255,0.1)]';
    const sliderClasses = `relative flex items-center h-8 w-full cursor-pointer rounded-2xl px-2 bg-[#e5e5e5] text-[#a8a8a8] ${sliderShadow}`;
    
    const togglePosition = `${isLeft ? 'left-1' : 'left-[calc(50%-0.3rem)]'}`;
    const toggleColors = `${isLeft ? 'bg-[#d1a3ff] text-[#a852ff]' : 'bg-[#9225ff] text-white'}`
    const toggleClasses = `flex items-center justify-center h-6 w-1/2 absolute transition-[left] duration-300 ease-out rounded-full ${toggleColors} ${togglePosition}`;

    const sliderLabelClasses = (isActive: boolean) => {
        return `grow flex justify-center transition-colors duration-100 ${
            isActive 
            ? 'delay-200'
            : 'delay-0'
        }`;
    }

    const toggleLabelClasses = (show: boolean) => {
        return `absolute transition-opacity duration-100 ease-out ${
            show 
            ? 'opacity-100 delay-250'
            : 'opacity-0 delay-0'
        }`;
    }
        
    return (
        <div className={sliderClasses} onClick={onToggle}>

            <div className={sliderLabelClasses(isLeft)}>
                { leftLabel }
            </div>
            <div className={sliderLabelClasses(!isLeft)}>
                { rightLabel }
            </div>

            <div className={toggleClasses}>
                <div className={toggleLabelClasses(isLeft)}>
                    { leftLabel }
                </div>
                <div className={toggleLabelClasses(!isLeft)}>
                    { rightLabel }
                </div>
            </div>

        </div>
    )
}

export default Toggle;