import React from 'react';
import { Select } from '@rmwc/select';
import { TIMER_DEFAULTS, TIME_OPTIONS_MINUTES } from './const';

import './CustomizeTimes.css';
import '@rmwc/dialog/styles';
import '@rmwc/select/styles';

export type TimerPresetsType = {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
};

export const CustomizeTimes = (): React.ReactElement => {
    const [timerPresets, setTimerPresets] = React.useState<TimerPresetsType>(
        () => {
            const savedPresets = localStorage.getItem('timerPresets');
            return savedPresets ? JSON.parse(savedPresets) : TIMER_DEFAULTS;
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        key: keyof TimerPresetsType
    ) => {
        const newPresets = { ...timerPresets, [key]: parseInt(e.target.value) };
        setTimerPresets(newPresets);
        localStorage.setItem('timerPresets', JSON.stringify(newPresets));
    };

    return (
        <div className="customize-times">
            <Select
                enhanced
                label={'Pomodoro'}
                options={TIME_OPTIONS_MINUTES}
                value={timerPresets.pomodoro.toString()}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange(e, 'pomodoro')
                }
            />
            <Select
                enhanced
                label={'Short Break'}
                options={TIME_OPTIONS_MINUTES}
                value={timerPresets.shortBreak.toString()}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange(e, 'shortBreak')
                }
            />
            <Select
                enhanced
                label={'Long Break'}
                options={TIME_OPTIONS_MINUTES}
                value={timerPresets.longBreak.toString()}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange(e, 'longBreak')
                }
            />
        </div>
    );
};
