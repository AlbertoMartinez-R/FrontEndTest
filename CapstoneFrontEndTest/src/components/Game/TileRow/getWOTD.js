export default async function getWOTD() {
    try {
        const response = await fetch('http://localhost:3032/api/words/wordOf/todaysWord', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const WOTD = await response.json();
        console.log(WOTD);
        return WOTD;
    } catch (e) {
        console.error('Failed to get word of the day!');
        console.error(e);
    }
}


// if(last_played === todaysdate){
// setgameOver(true)