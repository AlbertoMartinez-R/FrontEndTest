import {apiURL} from "../../../hooks/api.js";

export async function adminfetchWords() {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${apiURL}/words/admin/all-words`, {
            method: "GET",
            headers: {
                ContentType: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            console.log("Error fetching words");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
};

export async function fetchMonthlyWords() {
    const token = localStorage.getItem("authToken");

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    try {
        const result = await Promise.all(months.map(async (month) => {
            const response = await fetch(`${apiURL}/month/${month}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                console.log("Error fetching words");
            }
            const data = await response.json();
            return {
                month,
                words: data.words,
            };
        }));

        return result;

    } catch (e) {
        console.error("Failed to retrieve monthly words", e);
    }
}

// Function to fetch get word of the Day
export async function fetchWordOfTheDay() {
        try {
            const response = await fetch(`${apiURL}/words/wordOf/todaysWord`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                console.log("Error fetching words");
            }
            return await response.json();
        } catch (e) {
            console.error('Failed to get word of the day!');
            console.error(e);
        }
}