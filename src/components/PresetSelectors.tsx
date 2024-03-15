import React from 'react';
import { Button } from '@rmwc/button';
import { TimerPresetsType } from './CustomizeTimes';

export const PresetSelectors = (props: {
    selectedPreset: keyof TimerPresetsType;
    setSelectedPreset: (preset: keyof TimerPresetsType) => void;
}): React.ReactElement => {
    const [devMode] = React.useState(() => {
        const devMode = localStorage.getItem('devMode');
        return devMode ? devMode === 'true' : false;
    });

    return (
        <div className="preset-selectors">
            <Button
                unelevated={props.selectedPreset === 'pomodoro'}
                outlined={props.selectedPreset !== 'pomodoro'}
                className="time-preset"
                onClick={() => props.setSelectedPreset('pomodoro')}
            >
                Pomodoro
            </Button>
            <Button
                unelevated={props.selectedPreset === 'shortBreak'}
                outlined={props.selectedPreset !== 'shortBreak'}
                className="time-preset"
                onClick={() => props.setSelectedPreset('shortBreak')}
            >
                Short Break
            </Button>
            <Button
                unelevated={props.selectedPreset === 'longBreak'}
                outlined={props.selectedPreset !== 'longBreak'}
                className="time-preset"
                onClick={() => props.setSelectedPreset('longBreak')}
            >
                Long Break
            </Button>
            {devMode && (
                <Button
                    unelevated={props.selectedPreset === 'devMode'}
                    outlined={props.selectedPreset !== 'devMode'}
                    className="time-preset"
                    onClick={() => props.setSelectedPreset('devMode')}
                >
                    Test (Dev)
                </Button>
            )}
        </div>
    );
};
