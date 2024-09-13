import React, { useState, useEffect, useRef } from 'react';

function Stop_Watch() {
    const [isRunning, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]);

    function Start() {
        setRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function Stop() {
        setRunning(false);
    }

    function Reset() {
        setElapsedTime(0);
        setRunning(false);
    }

    function FormatTime(){
        let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let sec = Math.floor((elapsedTime / 1000) % 60);
        let milisec = Math.floor((elapsedTime % 1000) / 10);

        min = String(min).padStart(2, "0");
        sec = String(sec).padStart(2, "0");
        milisec = String(milisec).padStart(2, "0");

        return `${min}:${sec}:${milisec}`;
    }

    return (
        <div className='stop-watch'>
            <div className='display'>{FormatTime()}</div>
            <div className='control'>
                <button onClick={Start} className='Start'>Start</button>
                <button onClick={Stop} className='Stop'>Stop</button>
                <button onClick={Reset} className='Reset'>Reset</button>
            </div>
        </div>
    );
}

export default Stop_Watch;
