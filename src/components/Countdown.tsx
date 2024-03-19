import React from 'react';
import Countdown, { CountdownApi, CountdownTimeDelta } from 'react-countdown';
import { Card } from '@rmwc/card';
import { IconButton } from '@rmwc/icon-button';

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
    countdownApi: CountdownApi | null;
    countdownDate: number;
    timerCompleted: boolean;
    timerPaused: boolean;
    timerRunning: boolean;
    onPause: (paused: boolean) => void;
    onRunning: (running: boolean) => void;
    onStart: () => void;
    onComplete: () => void;
    onReset: () => void;
    onSetCountdownApi: (api: CountdownApi) => void;
};

export const StyledCountdown = ({
    countdownApi,
    countdownDate,
    timerCompleted,
    timerPaused,
    timerRunning,
    onPause,
    onRunning,
    onStart,
    onComplete,
    onReset,
    onSetCountdownApi,
}: StyledCountdownProps): React.ReactElement => {
    const countdownRef = (countdown: Countdown | null) => {
        if (countdown) {
            onSetCountdownApi(countdown.getApi());
        }
    };

    const handlePause = (): void => {
        if (!countdownApi) return;
        countdownApi.pause();
        onPause(true);
    };

    const handleComplete = (): void => {
        onRunning(false);
        onComplete();
    };

    const handleReset = (): void => {
        onRunning(false);
        onReset();
    };

    return (
        <Card className="countdown-container">
            {timerCompleted && <p className="timer-string">Time's up!</p>}
            {!timerCompleted && (
                <Countdown
                    ref={countdownRef}
                    date={countdownDate}
                    autoStart={false}
                    renderer={renderer}
                    onComplete={handleComplete}
                />
            )}

            <div className="controls">
                <IconButton icon={'replay'} onClick={handleReset} alt="Reset" />
                {(!timerRunning || timerPaused) && (
                    <IconButton
                        icon={'play_circle'}
                        onClick={onStart}
                        alt="Start"
                        disabled={timerCompleted}
                    />
                )}
                {timerRunning && !timerPaused && (
                    <IconButton
                        icon={'pause_circle'}
                        onClick={handlePause}
                        alt="Pause"
                    />
                )}
            </div>
        </Card>
    );
};
