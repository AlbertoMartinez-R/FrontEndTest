import {apiURL} from "../../../hooks/api.js";

export async function fetchUserStats() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/stats/${username}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Fetch request error`,error)
    }
};

export async function fetchGameStats() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/stats/${username}/games`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Fetch request error`,error)
    }
};

export async function fetchGuessStats() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/stats/${username}/guesses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Fetch request error`,error)
    }
};