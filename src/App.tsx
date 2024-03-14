import React from 'react';
import { StyledCountdown } from './components/Countdown';
import { CustomizeTimes } from './components/CustomizeTimes';

/* third-party library imports */
import { PersonOutline } from '@mui/icons-material';
import { Button } from '@rmwc/button';

/* style imports */
import './App.css';
import '@rmwc/button/styles';
import '@rmwc/dialog/styles';

const TIMER_DEFAULTS = {
    work: 20,
    shortBreak: 5,
    longBreak: 15,
}

const App = (): React.ReactElement => {
    const [timerMinutes, setTimerMinutes] = React.useState(TIMER_DEFAULTS.work);

    const handleSetCustomTimes = (): void => {
        // TODO
    }

    return (
        <div className="App">
            <main>
                <PersonOutline />
                <section>
                    <Button raised className="time-preset" onClick={() => setTimerMinutes(TIMER_DEFAULTS.work)}>Work</Button>
                    <Button raised className="time-preset" onClick={() => setTimerMinutes(TIMER_DEFAULTS.shortBreak)}>Short Break</Button>
                    <Button raised className="time-preset" onClick={() => setTimerMinutes(TIMER_DEFAULTS.longBreak)}>Long Break</Button>
                    <CustomizeTimes onSave={handleSetCustomTimes} />
                    <StyledCountdown timerMinutes={timerMinutes} />
                </section>
            </main>
        </div>
  );
}

export default App;
