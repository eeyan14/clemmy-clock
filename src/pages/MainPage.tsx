import React from 'react';
import { StyledCountdown } from '../components/Countdown';
import { TimerPresetsType } from '../components/CustomizeTimes';
import { SetIntention } from '../components/SetIntention';
import { TIMER_DEFAULTS } from '../components/const';

import clemmyExplore from '../images/clemmy-explore.png';

/* third-party library imports */
import { Button } from '@rmwc/button';

/* style imports */
import './MainPage.css';
import '@rmwc/button/styles';

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
    console.log('selected?', selectedPreset);
    console.log('timerPresets', timerPresets);

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
                <StyledCountdown
                    shouldPlaySound={props.shouldPlaySound}
                    timerMinutes={timerPresets[selectedPreset]}
                    timerCompleteSound={props.timerCompleteSound}
                />
                <SetIntention />
            </section>
        </div>
    );
};
