import React from 'react';
import { Button } from '@rmwc/button';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog';
import { Edit } from '@mui/icons-material';

import '@rmwc/dialog/styles';

type CustomizeTimesProps = {
    onSave: () => void;
};

export const CustomizeTimes = ({ onSave }: CustomizeTimesProps): React.ReactElement => {
    const [open, setOpen] = React.useState(false);
    console.log("open...", open)
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Customize Times</DialogTitle>
                <DialogContent>Coming soon!</DialogContent>
                <DialogActions>
                    <DialogButton action="close">Cancel</DialogButton>
                    <DialogButton action="accept" isDefaultAction onClick={onSave}>Save</DialogButton>
                </DialogActions>
            </Dialog>

            {/*<div className="mdc-dialog mdc-dialog--open">
                <DialogTitle>Customize Times</DialogTitle>
                <DialogContent>Coming soon!</DialogContent>
                <DialogActions>
                    <DialogButton action="close">Cancel</DialogButton>
                    <DialogButton action="accept" isDefaultAction onClick={onSave}>Save</DialogButton>
                </DialogActions>
    </div>*/}

            <Button onClick={() => setOpen(true)}>
                <Edit />
            </Button>
        </>
    );
}
