import React from 'react';
import { MainPage } from './pages/MainPage';

import { TabBar, Tab } from '@rmwc/tabs';

/* style imports */
import './App.css';
import '@rmwc/tabs/styles';

const HOME_TAB = 0;
const ABOUT_TAB = 1;
const FAQ_TAB = 2;
const SETTINGS_TAB = 3;

const App = (): React.ReactElement => {
    const [activeTab, setActiveTab] = React.useState(HOME_TAB);
    return (
        <div className="App">
            <main>
                <div className="tab-row">
                    <TabBar
                        activeTabIndex={activeTab}
                        onActivate={(e) => setActiveTab(e.detail.index)}
                    >
                        <Tab>Home</Tab>
                        <Tab>About</Tab>
                        <Tab>FAQ</Tab>
                        <Tab>Settings</Tab>
                    </TabBar>

                    <p>Cookie counter: 0</p>
                </div>
                {activeTab === HOME_TAB && <MainPage />}
                {activeTab === ABOUT_TAB && <p>Coming soon</p>}
                {activeTab === FAQ_TAB && <p>Coming soon</p>}
                {activeTab === SETTINGS_TAB && <p>Coming soon</p>}
            </main>
        </div>
    );
};

export default App;
