import {apiURL} from "../../../hooks/api.js";

export async function fetchLeaderboard() {
    try {
        const response = await fetch(`${apiURL}/leaderboard`);
        if (!response.ok) {
            console.log("error fetching leaderboard");
        }
        const data = await response.json();
        return data;
        console.log({data});
    } catch (error) {
        console.error("Error catcher",error)
    }
};