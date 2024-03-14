import React from 'react';
import { Button } from '@rmwc/button';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton,
} from '@rmwc/dialog';
import { Select } from '@rmwc/select';

import './CustomizeTimes.css';
import '@rmwc/dialog/styles';
import '@rmwc/select/styles';

export type TimerPresetsType = {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
};

type CustomizeTimesProps = {
    presets: TimerPresetsType;
    onSave: (presets: TimerPresetsType) => void;
};

const TIME_OPTIONS_MINUTES = [
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '60',
];

export const CustomizeTimes = ({
    presets,
    onSave,
}: CustomizeTimesProps): React.ReactElement => {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState<TimerPresetsType>(presets);

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        key: keyof TimerPresetsType
    ) => {
        setValues({ ...values, [key]: parseInt(e.target.value) });
    };

    const handleSave = () => {
        onSave(values);
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Customize Times</DialogTitle>
                <DialogContent className="customize-times-dialog">
                    <Select
                        enhanced
                        label={'Pomodoro'}
                        options={TIME_OPTIONS_MINUTES}
                        value={values.pomodoro.toString()}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleChange(e, 'pomodoro')
                        }
                    />
                    <Select
                        enhanced
                        label={'Short Break'}
                        options={TIME_OPTIONS_MINUTES}
                        value={values.shortBreak.toString()}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleChange(e, 'shortBreak')
                        }
                    />
                    <Select
                        enhanced
                        label={'Long Break'}
                        options={TIME_OPTIONS_MINUTES}
                        value={values.longBreak.toString()}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleChange(e, 'longBreak')
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <DialogButton action="close">Cancel</DialogButton>
                    <DialogButton
                        action="accept"
                        isDefaultAction
                        onClick={handleSave}
                    >
                        Save
                    </DialogButton>
                </DialogActions>
            </Dialog>

            <Button onClick={() => setOpen(true)}>
                <span className="material-icons">edit</span>
            </Button>
        </>
    );
};
