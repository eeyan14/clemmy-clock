import React from 'react';
import { StyledCountdown } from './components/Countdown';

const TIMER_DEFAULTS = {
    work: 20,
    shortBreak: 5,
    longBreak: 15,
}

const App = (): React.ReactElement => {
    const [timerMinutes, setTimerMinutes] = React.useState(TIMER_DEFAULTS.work);
    return (
        <div className="App">
            <h1>Clemmy Clock</h1>
            <button onClick={() => setTimerMinutes(TIMER_DEFAULTS.work)}>Work</button>
            <button onClick={() => setTimerMinutes(TIMER_DEFAULTS.shortBreak)}>Short Break</button>
            <button onClick={() => setTimerMinutes(TIMER_DEFAULTS.longBreak)}>Long Break</button>
            <StyledCountdown timerMinutes={timerMinutes} />
        </div>
  );
}

export default App;
