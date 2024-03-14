import React from 'react';
import { Button } from '@rmwc/button';
import { TimerPresetsType } from './CustomizeTimes';

export const PresetSelectors = (props: {
    setSelectedPreset: (preset: keyof TimerPresetsType) => void;
}): React.ReactElement => {
    const [devMode] = React.useState(() => {
        const devMode = localStorage.getItem('devMode');
        return devMode ? devMode === 'true' : false;
    });

    return (
        <>
            <Button
                raised
                className="time-preset"
                onClick={() => props.setSelectedPreset('pomodoro')}
            >
                Pomodoro
            </Button>
            <Button
                raised
                className="time-preset"
                onClick={() => props.setSelectedPreset('shortBreak')}
            >
                Short Break
            </Button>
            <Button
                raised
                className="time-preset"
                onClick={() => props.setSelectedPreset('longBreak')}
            >
                Long Break
            </Button>
            {devMode && (
                <Button
                    raised
                    className="time-preset"
                    onClick={() => props.setSelectedPreset('devMode')}
                >
                    Test (Dev)
                </Button>
            )}
        </>
    );
};
