import React from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';

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
    const [timerMilliseconds, setTimerMilliseconds] = React.useState(timerMinutes * 60 * 1000);
    const countdownRef = React.useRef<Countdown>(null);

    React.useEffect(() => {
        // if timerMinutes changes, stop the clock and reset the countdown
        if (countdownRef.current) {
            countdownRef.current.stop();
            setTimerMilliseconds(timerMinutes * 60 * 1000);
        }
    }, [timerMinutes])

    const handleStart = (): void => {
        if (countdownRef.current) {
            countdownRef.current.start();
        }
    }

    return (
        <div>
            <Countdown
                ref={countdownRef}
                date={Date.now() + timerMilliseconds}
                autoStart={false}
                renderer={renderer}
                onComplete={() => setCompleted(true)}
            />

            <button onClick={handleStart}>Start</button>

            {completed && <p>Time's up!</p>}
        </div>
    );
};
