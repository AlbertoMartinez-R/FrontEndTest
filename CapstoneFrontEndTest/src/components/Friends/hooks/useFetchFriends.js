import {apiURL} from "../../../hooks/api.js";


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
        // Fetch all requests
        const response = await fetch(`${apiURL}/friends/${username}/requests`);
        const requestsData = await response.json();

        // Access the array of requests within requestsData
        const requestsArray = requestsData.requests;

        // Organize requests by status
        const organizedRequests = {
            pending: requestsArray.filter(req => req.status === "pending"),
            accepted: requestsArray.filter(req => req.status === "accepted"),
            rejected: requestsArray.filter(req => req.status === "rejected"),
        };

        return organizedRequests;
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
};
// Function to decline friend requests
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
};

// Function to delete a rejected friend request
export function deleteRejectedRequest(user_username, friend_username) {
    return fetch(`${apiURL}/friends/delete-rejected-request`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ user_username, friend_username }),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete rejected request");
        }
        return response.json();
    });
}