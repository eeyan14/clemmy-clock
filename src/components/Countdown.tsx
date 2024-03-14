import React from 'react';
import useSound from 'use-sound';
import Countdown, { CountdownApi, CountdownTimeDelta } from 'react-countdown';
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
        <p className="timer-string">
            {hours ? `${hours}:` : ''}
            {minutes}:{secondsString}
        </p>
    );
};

type StyledCountdownProps = {
    shouldPlaySound: boolean;
    timerMinutes: number;
    timerCompleteSound: string;
};

export const StyledCountdown = ({
    shouldPlaySound,
    timerMinutes,
    timerCompleteSound,
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
    const [play, { stop: stopSound }] = useSound(timerCompleteSound);

    const countdownRef = (countdown: Countdown | null) => {
        if (countdown) {
            setCountdownApi(countdown.getApi());
        }
    };

    React.useEffect(() => {
        // if timerMinutes prop changes, stop the clock and reset the countdown
        if (!countdownApi) return;
        const newTimerMilliseconds = timerMinutes * 60 * 1000;
        setTimerMilliseconds(newTimerMilliseconds);
        setCountdownDate(Date.now() + newTimerMilliseconds);
        handleReset();
    }, [timerMinutes, countdownApi]);

    const handleStart = (): void => {
        if (!countdownApi) return;
        countdownApi.start();
        setIsRunning(true);
    };

    const handleComplete = (): void => {
        setCompleted(true);
        setIsRunning(false);
        if (shouldPlaySound) {
            play();
        }
    };

    const handleReset = (): void => {
        // TODO do we stop the timer when we reset?
        if (!countdownApi) return;
        countdownApi.stop();
        setCompleted(false);
        setIsRunning(false);
        setCountdownDate(Date.now() + timerMilliseconds);
        if (shouldPlaySound) {
            stopSound();
        }
    };

    const addFiveMinutes = (): void => {
        setCountdownDate(countdownDate + FIVE_MINUTES_MS);
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

                <div className="controls">
                    <IconButton
                        icon={'play_circle_outline'}
                        onClick={handleStart}
                        alt="Start"
                    />
                    <IconButton
                        icon={'replay'}
                        onClick={handleReset}
                        alt="Reset"
                    />
                </div>

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
