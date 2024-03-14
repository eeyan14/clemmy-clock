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

    React.useEffect(() => {
        console.log('timerMinutes changed to', timerMinutes);
        // if timerMinutes prop changes, stop the clock and reset the countdown
        if (!countdownApi) return;
        const newTimerMilliseconds = timerMinutes * 60 * 1000;
        setTimerMilliseconds(newTimerMilliseconds);
        setCountdownDate(Date.now() + newTimerMilliseconds);
        _reset(newTimerMilliseconds);
    }, [timerMinutes]);

    const countdownRef = (countdown: Countdown | null) => {
        if (countdown) {
            setCountdownApi(countdown.getApi());
        }
    };

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

    const _reset = (newTimerMilliseconds: number): void => {
        if (!countdownApi) return;
        countdownApi.stop();
        setCompleted(false);
        setIsRunning(false);
        setCountdownDate(Date.now() + newTimerMilliseconds);
        if (shouldPlaySound) {
            stopSound();
        }
    };

    const handleReset = (): void => {
        _reset(Date.now() + timerMilliseconds);
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
                    {isRunning && (
                        <Button onClick={addFiveMinutes}>
                            + Add 5 minutes
                        </Button>
                    )}
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
        </>
    );
};
