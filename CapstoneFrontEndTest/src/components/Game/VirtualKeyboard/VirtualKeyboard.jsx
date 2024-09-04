import React, { useEffect, useState } from "react";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import getStatusColor from "../TileRow/StatusColor";
import './keyboard.css'; // Ensure this path is correct

export default function VirtualKeyboard({ guessStatus, activeRow, fullGuess }) {
    const [buttonTheme, setButtonTheme] = useState([]);

    useEffect(() => {
        const newButtonTheme = [];

        fullGuess.forEach((guess, index) => {
            guess.forEach((character, jndex) => {
                const lowChar = character.toLowerCase();
                const color = getStatusColor(guessStatus[index][jndex]);
                console.log(`Key: ${lowChar}, Color: ${color}`); // Debugging output
                newButtonTheme.push({
                    class: `hg-${color}`,
                    buttons: lowChar,
                });
            });
        });

        setButtonTheme(newButtonTheme);
    }, [activeRow, fullGuess, guessStatus]);

    return (
        <Keyboard
            layout={{
                'default': [
                    'Q W E R T Y U I O P',
                    'A S D F G H J K L',
                    'Z X C V B N M',
                    '{enter} {bksp}'
                ]
            }}
            display={{
                '{bksp}': 'Backspace',
                '{enter}': 'Enter'
            }}
            buttonTheme={buttonTheme}
        />
    );
}