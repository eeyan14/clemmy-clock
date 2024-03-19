import React from 'react';
import useSound from 'use-sound';
import { CountdownApi } from 'react-countdown';
import { StyledCountdown } from '../components/Countdown';
import { PresetSelectors } from '../components/PresetSelectors';
import { TimerPresetsType } from '../components/CustomizeTimes';
import { SetIntention } from '../components/SetIntention';
import { TIMER_DEFAULTS } from '../components/const';

import clemmyExplore from '../images/clemmy-explore.png';
import clemmyWork from '../images/clemmy-work.gif';
import clemmyBreak from '../images/clemmy-break.gif';

import './MainPage.css';

export const MainPage = (props: {
    shouldPlaySound: boolean;
    timerCompleteSound: string;
}): React.ReactElement => {
    const [selectedPreset, setSelectedPreset] =
        React.useState<keyof TimerPresetsType>('pomodoro');
    const [timerPresets] = React.useState<TimerPresetsType>(() => {
        const savedPresets = localStorage.getItem('timerPresets');
        return savedPresets ? JSON.parse(savedPresets) : TIMER_DEFAULTS;
    });

    const [timerCompleted, setTimerCompleted] = React.useState(false);
    // timer is paused if user has clicked "play" then clicked "pause"
    const [timerPaused, setTimerPaused] = React.useState(false);
    // timer is running if user has clicked "play" and timer has not run out;
    // timerRunning will still be true if timerPaused is true but timerCompleted is false
    const [timerRunning, setTimerRunning] = React.useState(false);
    const [countdownApi, setCountdownApi] = React.useState<CountdownApi | null>(
        null
    );

    const [countdownDate, setCountdownDate] = React.useState(() => {
        const timerMinutes = timerPresets[selectedPreset];
        return Date.now() + timerMinutes * 60 * 1000;
    });

    const [play] = useSound(props.timerCompleteSound);

    const _reset = () => {
        countdownApi?.stop();
        setCountdownDate(Date.now() + timerPresets[selectedPreset] * 60 * 1000);
        setTimerPaused(false);
        setTimerRunning(false);
    };

    const handleComplete = () => {
        if (props.shouldPlaySound) {
            play();
        }
        _reset();
        setTimerCompleted(true);
    };

    const handleResetTimer = () => {
        _reset();
        setTimerCompleted(false);
    };

    const handleSelectPreset = (preset: keyof TimerPresetsType) => {
        setSelectedPreset(preset);
        setCountdownDate(Date.now() + timerPresets[preset] * 60 * 1000);
        if (countdownApi) {
            countdownApi.stop();
        }
        setTimerCompleted(false);
        setTimerPaused(false);
        setTimerRunning(false);
    };

    const handleStart = () => {
        setTimerCompleted(false);
        setTimerPaused(false);
        setTimerRunning(true);
        countdownApi?.start();
    };

    let iconSrc = clemmyExplore;
    if (timerRunning && selectedPreset === 'pomodoro') {
        iconSrc = clemmyWork;
    }
    if (timerRunning && selectedPreset !== 'pomodoro') {
        iconSrc = clemmyBreak;
    }

    return (
        <div className="main-page">
            <div className="clemmy-icon-container">
                <img src={iconSrc} />
            </div>
            <section>
                <PresetSelectors
                    selectedPreset={selectedPreset}
                    setSelectedPreset={handleSelectPreset}
                />
                <StyledCountdown
                    countdownApi={countdownApi}
                    countdownDate={countdownDate}
                    timerCompleted={timerCompleted}
                    timerPaused={timerPaused}
                    timerRunning={timerRunning}
                    onPause={setTimerPaused}
                    onRunning={setTimerRunning}
                    onStart={handleStart}
                    onComplete={handleComplete}
                    onReset={handleResetTimer}
                    onSetCountdownApi={setCountdownApi}
                />
                <SetIntention />
            </section>
        </div>
    );
};
