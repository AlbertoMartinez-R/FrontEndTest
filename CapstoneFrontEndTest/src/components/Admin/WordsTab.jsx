import {useEffect, useState} from 'react';
import {adminfetchWords} from "../../hooks/useFetchWords.js";

export default function WordsTab() {
    const [words, setWords] = useState([]);


    useEffect(() => {
        const getMinWords = async () => {
            try {
                const response = await adminfetchWords();
                const minWords = response.slice(0, 5);
                setWords(minWords);
            } catch (error) {
                console.error('Failed to fetch all words!', error);
            }
        };
        getMinWords();
    }, [])

    const handleWordClick = () => {
        navigate('/admin/AllWords')
    };

    return (
        <div>
            <h1>Words Table</h1>
            <ul>
                {words.map(word => (
                    <li key={word.id}>
                        {word.id}: {word.word}
                    </li>
                ))}
            </ul>
        </div>
    );
}