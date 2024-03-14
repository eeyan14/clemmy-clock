import React from 'react';
import useSound from 'use-sound';
import { IconButton } from '@rmwc/icon-button';
import { Radio } from '@rmwc/radio';
import { Switch } from '@rmwc/switch';

import { CustomizeTimes } from '../components/CustomizeTimes';
import { sounds } from '../sounds';

import './Settings.css';
import '@rmwc/icon-button/styles';
import '@rmwc/radio/styles';
import '@rmwc/switch/styles';

const SoundOption = (props: {
    label: string;
    sound: string;
    selected: boolean;
    play: () => void;
    onChange: (sound: string) => void;
}) => {
    const handleClick = () => {
        props.play();
    };

    const handleSelect = () => {
        props.onChange(props.sound);
    };

    return (
        <div className="option-row">
            <Radio
                label={props.label}
                checked={props.selected}
                onChange={handleSelect}
            />
            <IconButton icon={'volume_up'} onClick={handleClick} />
        </div>
    );
};

export const Settings = (props: {
    selectedSound: string;
    shouldPlay: boolean;
    setSound: (sound: string) => void;
    setShouldPlay: (shouldPlay: boolean) => void;
}): React.ReactElement => {
    const { sound1, sound2, sound3, sound4, sound5 } = sounds;
    const [playSound1] = useSound(sound1);
    const [playSound2] = useSound(sound2);
    const [playSound3] = useSound(sound3);
    const [playSound4] = useSound(sound4);
    const [playSound5] = useSound(sound5);

    const [devMode, setDevMode] = React.useState(() => {
        const devMode = localStorage.getItem('devMode');
        return devMode === 'true' || false;
    });

    const handleToggleDevMode = () => {
        setDevMode(!devMode);
        localStorage.setItem('devMode', (!devMode).toString());
    };

    return (
        <div className="settings-page">
            <section>
                <CustomizeTimes />
            </section>
            <section>
                <label>Timer FX:</label>
                <Switch
                    checked={props.shouldPlay}
                    onClick={() => props.setShouldPlay(!props.shouldPlay)}
                />
                {props.shouldPlay && (
                    <>
                        <SoundOption
                            label="Sound 1"
                            sound={sound1}
                            selected={props.selectedSound === sound1}
                            play={playSound1}
                            onChange={props.setSound}
                        />
                        <SoundOption
                            label="Sound 2"
                            sound={sound2}
                            selected={props.selectedSound === sound2}
                            play={playSound2}
                            onChange={props.setSound}
                        />
                        <SoundOption
                            label="Sound 3"
                            sound={sound3}
                            selected={props.selectedSound === sound3}
                            play={playSound3}
                            onChange={props.setSound}
                        />
                        <SoundOption
                            label="Sound 4"
                            sound={sound4}
                            selected={props.selectedSound === sound4}
                            play={playSound4}
                            onChange={props.setSound}
                        />
                        <SoundOption
                            label="Sound 5"
                            sound={sound5}
                            selected={props.selectedSound === sound5}
                            play={playSound5}
                            onChange={props.setSound}
                        />
                    </>
                )}
            </section>
            <section>
                <label>Dev mode:</label>
                <Switch checked={devMode} onClick={handleToggleDevMode} />
            </section>
        </div>
    );
};
