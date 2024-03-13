import React from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';

type TimerFor = 'work' | 'break';

const TimerCompleted = ({ timerFor }: { timerFor: TimerFor }): React.ReactElement => {
    return (
        <>
            {timerFor === 'work' && <p>Take a break!</p>}
            {timerFor === 'break' && <p>Back to work!</p>}
        </>
    )
}

// renderer() must be a function, not a React component
const renderer = ({ hours, minutes, seconds }: CountdownTimeDelta): React.ReactElement => {
    return (
        <div>
            <p>{hours} hours</p>
            <p>{minutes} minutes</p>
            <p>{seconds} seconds</p>
        </div>
    );
};

type StyledCountdownProps = {
    timerMinutes: number;
    timerFor: TimerFor;
};

export const StyledCountdown = ({ timerMinutes, timerFor }: StyledCountdownProps): React.ReactElement => {
    const [completed, setCompleted] = React.useState(false);
    const countdownTimeMS = timerMinutes * 60 * 1000; // convert minutes to milliseconds
    return (
        <div>
            <Countdown date={Date.now() + countdownTimeMS} renderer={renderer} onComplete={() => setCompleted(true)} />

            {completed && <TimerCompleted timerFor={timerFor} />}
        </div>
    );
};
