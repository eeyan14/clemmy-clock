import React from 'react';
import useSound from 'use-sound';
import { CountdownApi } from 'react-countdown';
import { StyledCountdown } from '../components/Countdown';
import { PresetSelectors } from '../components/PresetSelectors';
import { TimerPresetsType } from '../components/CustomizeTimes';
import { SetIntention } from '../components/SetIntention';
import { TIMER_DEFAULTS } from '../components/const';

import clemmyExplore from '../images/clemmy-explore.png';

import './MainPage.css';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

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
    const [countdownApi, setCountdownApi] = React.useState<CountdownApi | null>(
        null
    );

    const [countdownDate, setCountdownDate] = React.useState(() => {
        const timerMinutes = timerPresets[selectedPreset];
        return Date.now() + timerMinutes * 60 * 1000;
    });

    const [play] = useSound(props.timerCompleteSound);

    const handleComplete = () => {
        if (props.shouldPlaySound) {
            play();
        }
        setTimerCompleted(true);
    };

    const handleResetTimer = () => {
        if (!countdownApi) return;
        countdownApi.stop();
        const timerMinutes = timerPresets[selectedPreset];
        setCountdownDate(Date.now() + timerMinutes * 60 * 1000);
        setTimerCompleted(false);
    };

    const handleSelectPreset = (preset: keyof TimerPresetsType) => {
        setSelectedPreset(preset);
        setCountdownDate(Date.now() + timerPresets[preset] * 60 * 1000);
        if (countdownApi) {
            countdownApi.stop();
        }
    };

    const handleAddFiveMinutes = () => {
        setCountdownDate(countdownDate + FIVE_MINUTES_MS);
    };

    return (
        <div className="main-page">
            <div className="clemmy-icon-container">
                <img src={clemmyExplore} />
            </div>
            <section>
                <PresetSelectors setSelectedPreset={handleSelectPreset} />
                <StyledCountdown
                    countdownApi={countdownApi}
                    countdownDate={countdownDate}
                    timerCompleted={timerCompleted}
                    onComplete={handleComplete}
                    onReset={handleResetTimer}
                    onAddFiveMinutes={handleAddFiveMinutes}
                    onSetCountdownApi={setCountdownApi}
                />
                <SetIntention />
            </section>
        </div>
    );
};
