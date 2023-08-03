import classnames from 'classnames';
import React, { useRef, useState } from 'react';

const secondTimeLine = Array.from({ length: 60 * 60 }, (_, i) => {
    return {
        line: i
    };
});
const minutesTimeLine = Array.from({ length: 61 }, (_, i) => {
    return {
        line: i
    };
});

interface Props {
    time?: number;
}

export const ControlBar: React.FC<Props> = ({ time = 8 }) => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        console.log('start');
        countRef.current = setInterval(() => {
            setTimer((t) => t + 1);
        }, 1000);
    };
    const handleStop = () => {
        clearInterval(countRef.current);
        setIsPaused(false);
    };

    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    const handleResume = () => {
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((t) => t + 1);
        }, 1000);
    };

    return (
        <>
            <div className="hanet-control-bar">
                <div className="timeline-bar">
                    {minutesTimeLine.map((item) => {
                        let label;
                        if (item.line % 5 === 0) {
                            if (item.line === 60) {
                                label = `${time + 1}:00`;
                            } else {
                                label = `${time}:${item.line.toString().padStart(2, '0')}`;
                            }
                        }
                        return (
                            <div className="timeline-item" key={item.line}>
                                {item.line !== timer && (
                                    <div
                                        className={classnames('line', {
                                            'line-plus': Boolean(label)
                                        })}
                                    />
                                )}
                                {item.line === timer && <div className="line-selected" />}
                                {label && <div className="label-item">{label}</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>{timer}</div>
            <button type="button" onClick={handleStart}>
                start
            </button>
            <button type="button" onClick={handleStop}>
                stop
            </button>
            <button type="button" onClick={handleResume}>
                resume
            </button>
            <button type="button" onClick={handleReset}>
                reset
            </button>
        </>
    );
};
