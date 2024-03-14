import React from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

// renderer() must be a function, not a React component
const renderer = ({ hours, minutes, seconds }: CountdownTimeDelta): React.ReactElement => {
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    return (
        <div>
            <p>{hours ? `${hours}:` : ''}{minutes}:{secondsString}</p>
        </div>
    );
};

type StyledCountdownProps = {
    timerMinutes: number;
};

export const StyledCountdown = ({ timerMinutes }: StyledCountdownProps): React.ReactElement => {
    const [completed, setCompleted] = React.useState(false);
    const [isRunning, setIsRunning] = React.useState(false);
    const [timerMilliseconds, setTimerMilliseconds] = React.useState(timerMinutes * 60 * 1000);
    const countdownRef = React.useRef<Countdown>(null);

    React.useEffect(() => {
        // if timerMinutes prop changes, stop the clock and reset the countdown
        if (countdownRef.current) {
            countdownRef.current.stop();
            setTimerMilliseconds(timerMinutes * 60 * 1000);
        }
    }, [timerMinutes])

    const handleStart = (): void => {
        if (countdownRef.current) {
            countdownRef.current.start();
            setIsRunning(true);
        }
    }

    const handleComplete = (): void => {
        setCompleted(true);
        setIsRunning(false);
    }

    const addFiveMinutes = (): void => {
        if (!countdownRef.current) return;
        const { total } = countdownRef.current.calcTimeDelta();
        setTimerMilliseconds(total + FIVE_MINUTES_MS);
    }

    return (
        <div>
            <Countdown
                ref={countdownRef}
                date={Date.now() + timerMilliseconds}
                autoStart={false}
                renderer={renderer}
                onComplete={handleComplete}
            />

            <button onClick={handleStart}>Start</button>
            {isRunning && (
                <button onClick={addFiveMinutes}>Add 5 minutes</button>
            )}

            {completed && <p>Time's up!</p>}
        </div>
    );
};
