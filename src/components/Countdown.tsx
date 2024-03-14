import React from 'react';
import Countdown, {
    CountdownApi,
    CountdownTimeDelta,
    calcTimeDelta,
} from 'react-countdown';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';

import './Countdown.css';
import '@rmwc/icon-button/styles';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

// renderer() must be a function, not a React component
const renderer = ({
    hours,
    minutes,
    seconds,
}: CountdownTimeDelta): React.ReactElement => {
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    return (
        <p className="timer">
            {hours ? `${hours}:` : ''}
            {minutes}:{secondsString}
        </p>
    );
};

type StyledCountdownProps = {
    timerMinutes: number;
};

export const StyledCountdown = ({
    timerMinutes,
}: StyledCountdownProps): React.ReactElement => {
    const [completed, setCompleted] = React.useState(false);
    const [isRunning, setIsRunning] = React.useState(false);
    const [countdownDate, setCountdownDate] = React.useState(
        Date.now() + timerMinutes * 60 * 1000
    );
    const [timerMilliseconds, setTimerMilliseconds] = React.useState(
        timerMinutes * 60 * 1000
    );
    const [countdownApi, setCountdownApi] =
        React.useState<CountdownApi | null>();

    const countdownRef = (countdown: Countdown | null) => {
        if (countdown) {
            setCountdownApi(countdown.getApi());
        }
    };

    React.useEffect(() => {
        // if timerMinutes prop changes, stop the clock and reset the countdown
        if (!countdownApi) return;
        countdownApi.stop();
        const newTimerMilliseconds = timerMinutes * 60 * 1000;
        setTimerMilliseconds(newTimerMilliseconds);
        setCountdownDate(Date.now() + newTimerMilliseconds);
    }, [timerMinutes]);

    const handleStart = (): void => {
        if (!countdownApi) return;
        countdownApi.start();
        setIsRunning(true);
    };

    const handleComplete = (): void => {
        setCompleted(true);
        setIsRunning(false);
    };

    const handleReset = (): void => {
        // TODO do we stop the timer when we reset?
        if (!countdownApi) return;
        countdownApi.stop();
        setCompleted(false);
        setIsRunning(false);
        setCountdownDate(Date.now() + timerMilliseconds);
    };

    const addFiveMinutes = (): void => {
        if (!countdownApi) return;
        const { total, minutes, seconds } = calcTimeDelta(countdownDate);
        console.log(minutes, seconds);
        setCountdownDate(Date.now() + total + FIVE_MINUTES_MS);
        // TODO we seem to lose a second or two??
    };

    return (
        <>
            <div className="countdown-container">
                <Countdown
                    ref={countdownRef}
                    date={countdownDate}
                    autoStart={false}
                    renderer={renderer}
                    onComplete={handleComplete}
                />

                <IconButton
                    icon={'play_circle_outline'}
                    onClick={handleStart}
                    alt="Start"
                />
                <IconButton icon={'replay'} onClick={handleReset} alt="Reset" />

                {completed && <p>Time's up!</p>}
            </div>
            {isRunning && (
                <Button unelevated onClick={addFiveMinutes}>
                    + Add 5 minutes
                </Button>
            )}
        </>
    );
};
