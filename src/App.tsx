import React from 'react';
import { MainPage } from './pages/MainPage';
import { Settings } from './pages/Settings';

import { TabBar, Tab } from '@rmwc/tabs';
import { sounds } from './sounds';

/* style imports */
import './App.css';
import '@rmwc/tabs/styles';

const HOME_TAB = 0;
const FAQ_TAB = 1;
const SETTINGS_TAB = 2;

const App = (): React.ReactElement => {
    const [activeTab, setActiveTab] = React.useState(HOME_TAB);
    const [timerCompleteSound, setTimerCompleteSound] = React.useState(() => {
        const savedSound = localStorage.getItem('timerCompleteSound');
        return savedSound ? savedSound : sounds.sound1;
    });
    const [shouldPlay, setShouldPlay] = React.useState(() => {
        const savedSetting = localStorage.getItem('shouldPlay');
        return savedSetting ? savedSetting === 'true' : true;
    });

    const setSound = (sound: string) => {
        localStorage.setItem('timerCompleteSound', sound);
        setTimerCompleteSound(sound);
    };

    const handleSetShouldPlay = (shouldPlay: boolean) => {
        console.log('setting', shouldPlay);
        localStorage.setItem('shouldPlay', shouldPlay.toString());
        setShouldPlay(shouldPlay);
    };

    return (
        <div className="App">
            <main>
                <div className="tab-row">
                    <TabBar
                        activeTabIndex={activeTab}
                        onActivate={(e) => setActiveTab(e.detail.index)}
                    >
                        <Tab>Home</Tab>
                        <Tab>FAQ</Tab>
                        <Tab>Settings</Tab>
                    </TabBar>

                    {/*<p className="cookie-counter">Cookie counter: 0</p>*/}
                </div>
                {activeTab === HOME_TAB && (
                    <MainPage
                        timerCompleteSound={timerCompleteSound}
                        shouldPlaySound={shouldPlay}
                    />
                )}
                {activeTab === FAQ_TAB && <p>Coming soon</p>}
                {activeTab === SETTINGS_TAB && (
                    <Settings
                        selectedSound={timerCompleteSound}
                        setSound={setSound}
                        shouldPlay={shouldPlay}
                        setShouldPlay={handleSetShouldPlay}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
