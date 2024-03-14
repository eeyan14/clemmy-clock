import React from 'react';
import { StyledCountdown } from './components/Countdown';
import { CustomizeTimes, TimerPresetsType } from './components/CustomizeTimes';

/* third-party library imports */
import { Button } from '@rmwc/button';

/* style imports */
import './App.css';
import '@rmwc/button/styles';
import '@rmwc/dialog/styles';

const TIMER_DEFAULTS: TimerPresetsType = {
    pomodoro: 20,
    shortBreak: 5,
    longBreak: 15,
};

const App = (): React.ReactElement => {
    const [selectedPreset, setSelectedPreset] =
        React.useState<keyof TimerPresetsType>('pomodoro');
    const [timerPresets, setTimerPresets] = React.useState<TimerPresetsType>(
        () => {
            const savedPresets = localStorage.getItem('timerPresets');
            return savedPresets ? JSON.parse(savedPresets) : TIMER_DEFAULTS;
        }
    );

    const handleSetCustomTimes = (presets: TimerPresetsType): void => {
        setTimerPresets(presets);
        localStorage.setItem('timerPresets', JSON.stringify(presets));
    };

    return (
        <div className="App">
            <main>
                <span className="material-icons">person_outline</span>
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
                    />
                </section>
            </main>
        </div>
    );
};

export default App;
