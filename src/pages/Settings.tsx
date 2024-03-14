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
    stop: () => void;
    onChange: (sound: string) => void;
}) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
        isPlaying ? props.stop() : props.play();
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
            <IconButton
                icon={isPlaying ? 'volume_off' : 'volume_up'}
                onClick={handleClick}
            />
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
    const [playSound1, { stop: stopSound1 }] = useSound(sound1);
    const [playSound2, { stop: stopSound2 }] = useSound(sound2);
    const [playSound3, { stop: stopSound3 }] = useSound(sound3);
    const [playSound4, { stop: stopSound4 }] = useSound(sound4);
    const [playSound5, { stop: stopSound5 }] = useSound(sound5);

    return (
        <div className="settings-page">
            <CustomizeTimes />
            <label className="timer-fx">Timer FX:</label>
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
                        stop={stopSound1}
                        onChange={props.setSound}
                    />
                    <SoundOption
                        label="Sound 2"
                        sound={sound2}
                        selected={props.selectedSound === sound2}
                        play={playSound2}
                        stop={stopSound2}
                        onChange={props.setSound}
                    />
                    <SoundOption
                        label="Sound 3"
                        sound={sound3}
                        selected={props.selectedSound === sound3}
                        play={playSound3}
                        stop={stopSound3}
                        onChange={props.setSound}
                    />
                    <SoundOption
                        label="Sound 4"
                        sound={sound4}
                        selected={props.selectedSound === sound4}
                        play={playSound4}
                        stop={stopSound4}
                        onChange={props.setSound}
                    />
                    <SoundOption
                        label="Sound 5"
                        sound={sound5}
                        selected={props.selectedSound === sound5}
                        play={playSound5}
                        stop={stopSound5}
                        onChange={props.setSound}
                    />
                </>
            )}
        </div>
    );
};
