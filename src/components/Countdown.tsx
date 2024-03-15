import React from 'react';
import Countdown, { CountdownApi, CountdownTimeDelta } from 'react-countdown';
import { Button } from '@rmwc/button';
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
    onComplete: () => void;
    onReset: () => void;
    onAddFiveMinutes: () => void;
    onSetCountdownApi: (api: CountdownApi) => void;
};

export const StyledCountdown = ({
    countdownApi,
    countdownDate,
    timerCompleted,
    onComplete,
    onReset,
    onAddFiveMinutes,
    onSetCountdownApi,
}: StyledCountdownProps): React.ReactElement => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);

    const countdownRef = (countdown: Countdown | null) => {
        if (countdown) {
            onSetCountdownApi(countdown.getApi());
        }
    };

    const handleStart = (): void => {
        if (!countdownApi) return;
        setIsRunning(true);
        countdownApi.start();
        setIsPaused(false);
    };

    const handlePause = (): void => {
        if (!countdownApi) return;
        countdownApi.pause();
        setIsPaused(true);
    };

    const handleComplete = (): void => {
        setIsRunning(false);
        onComplete();
    };

    const handleReset = (): void => {
        setIsRunning(false);
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
                {isRunning && (
                    <Button className="add-time" onClick={onAddFiveMinutes}>
                        + Add 5 minutes
                    </Button>
                )}
                <IconButton icon={'replay'} onClick={handleReset} alt="Reset" />
                {(!isRunning || isPaused) && (
                    <IconButton
                        icon={'play_circle'}
                        onClick={handleStart}
                        alt="Start"
                    />
                )}
                {isRunning && !isPaused && (
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
