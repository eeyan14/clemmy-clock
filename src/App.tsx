import React from 'react';
import { StyledCountdown } from './components/Countdown';

const App = (): React.ReactElement => {
    return (
        <div className="App">
            <StyledCountdown timerMinutes={4} timerFor={'work'} />
            <StyledCountdown timerMinutes={4} timerFor={'break'} />
        </div>
  );
}

export default App;
