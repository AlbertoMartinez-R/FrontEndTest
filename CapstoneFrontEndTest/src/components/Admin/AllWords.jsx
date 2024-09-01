import {useState, useEffect} from 'react';
import {adminfetchWords} from "./hooks/useFetchWords.js";

export default function AllWords() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const getAllWords = async () => {
            try {
                const response = await adminfetchWords();
                setWords(response);
            } catch (e) {
                console.error('Failed to fetch all words!');
                console.error(e);
            }
        };
        getAllWords();
    }, [])

    return (
        <div>
            <h1>Words List</h1>
            <ul>
                {words.map(words => (
                    <li key={words.id}>
                        {words.id}: {words.word}
                    </li>
                ))}
            </ul>
        </div>
    );
}