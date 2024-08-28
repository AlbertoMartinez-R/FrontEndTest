import {apiURL} from "./api.js";

export async function adminfetchWords() {
    try {
        const response = await fetch(`${apiURL}/words/admin/all-words`);
        if (!response.ok) {
            console.log("Error fetching words");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}