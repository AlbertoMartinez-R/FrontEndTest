import {apiURL} from "./api.js";


// Function to fetch friends
export async function fetchFriends() {
    // const token = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/friends/${username}/friends-list`);

        return await response.json();
    } catch (error) {
        console.log("Fetch error", error);
    }
};

// Function to fetch the list of Requests
export async function requestsList() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;
    try {
        const response = await fetch(`${apiURL}/friends/${username}/requests`);

        return await response.json();
    } catch (error) {
        console.log("Fetch error", error);
    }
};

export async function acceptFriendRequest(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const user_username = userData.username;

    try {
        const response = await fetch(`${apiURL}/friends/accept-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({ user_username, friend_username }),
        });

        return await response.json();
    } catch (error) {
        console.log("Error accepting friend request:", error);
    }
}

export async function declineFriendRequest(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const user_username = userData.username;

    try {
        const response = await fetch(`${apiURL}/friends/reject-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({ user_username, friend_username }),
        });

        return await response.json();
    } catch (error) {
        console.log("Error declining friend request:", error);
    }
}