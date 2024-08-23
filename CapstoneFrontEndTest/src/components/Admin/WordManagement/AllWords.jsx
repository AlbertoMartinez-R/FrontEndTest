
export default function AllWords() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchAllWords = async () => {
            try {
                const response = await fetch(`${API_URL}`)

                const result = await response.json();
                console.log(result);
                setWords(result);

            } catch (e) {
                console.error('Failed to fetch all words!');
                console.error(e);
            }
        };
        fetchAllWords();
    }, [])

    return (
        <div>
            <h1>Words List</h1>
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