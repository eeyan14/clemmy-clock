import React from 'react';
import { TextField } from '@rmwc/textfield';

export const SetIntention = (): React.ReactElement => {
    const [intentionValue, setIntentionValue] = React.useState<string>(() => {
        const savedIntention = localStorage.getItem('intention');
        return savedIntention || '';
    });

    const handleSave = (): void => {
        // store goal in localStorage so that it persists across page reloads
        localStorage.setItem('intention', intentionValue);
    };

    return (
        <div className="set-intention">
            <label htmlFor="intention-input">
                Set your intentions for the day:
            </label>
            <TextField
                id="intention-input"
                fullwidth
                outlined
                maxLength={140}
                value={intentionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIntentionValue(e.target.value)
                }
                onBlur={handleSave}
            />
        </div>
    );
};
