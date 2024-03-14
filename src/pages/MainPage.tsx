import React from 'react';
import { StyledCountdown } from '../components/Countdown';
import { CustomizeTimes, TimerPresetsType } from '../components/CustomizeTimes';
import { SetIntention } from '../components/SetIntention';

import clemmyExplore from '../images/clemmy-explore.png';

/* third-party library imports */
import { Button } from '@rmwc/button';

/* style imports */
import './MainPage.css';
import '@rmwc/button/styles';

const TIMER_DEFAULTS: TimerPresetsType = {
    pomodoro: 20,
    shortBreak: 5,
    longBreak: 15,
};

export const MainPage = (props: {
    timerCompleteSound: string;
}): React.ReactElement => {
    const [selectedPreset, setSelectedPreset] =
        React.useState<keyof TimerPresetsType>('pomodoro');
    const [timerPresets, setTimerPresets] = React.useState<TimerPresetsType>(
        () => {
            const savedPresets = localStorage.getItem('timerPresets');
            return savedPresets ? JSON.parse(savedPresets) : TIMER_DEFAULTS;
        }
    );

    const handleSetCustomTimes = (presets: TimerPresetsType): void => {
        // store new presets in localStorage so that it persists across page reloads
        localStorage.setItem('timerPresets', JSON.stringify(presets));
        setTimerPresets(presets);
    };

    return (
        <div className="main-page">
            <div className="clemmy-icon-container">
                <img src={clemmyExplore} />
            </div>
            <section>
                <Button
                    raised
                    className="time-preset"
                    onClick={() => setSelectedPreset('pomodoro')}
                >
                    Pomodoro
                </Button>
                <Button
                    raised
                    className="time-preset"
                    onClick={() => setSelectedPreset('shortBreak')}
                >
                    Short Break
                </Button>
                <Button
                    raised
                    className="time-preset"
                    onClick={() => setSelectedPreset('longBreak')}
                >
                    Long Break
                </Button>
                <CustomizeTimes
                    presets={timerPresets}
                    onSave={handleSetCustomTimes}
                />
                <StyledCountdown
                    timerMinutes={timerPresets[selectedPreset]}
                    timerCompleteSound={props.timerCompleteSound}
                />
                <SetIntention />
            </section>
        </div>
    );
};
