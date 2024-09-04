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
}

// Function to send Friend Request
export async function sendFriendRequest(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const user_username = userData.username;
    const requestBody = JSON.stringify({friend_username});

    try {
        const response = await fetch(`${apiURL}/friends/${user_username}/send-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: requestBody,
        });


        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch request error", error);
    }
}

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
}

export async function acceptFriendRequest(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/friends/${username}/accept-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(friend_username),
        });

        return await response.json();
    } catch (error) {
        console.log("Error accepting friend request:", error);
    }
}

// Function to decline friend requests
export async function declineFriendRequest(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/friends/${username}/reject-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({friend_username}),
        });

        return await response.json();
    } catch (error) {
        console.log("Error declining friend request:", error);
    }
}

// Function to delete a friend request
export function deleteRequest(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;

    return fetch(`${apiURL}/friends/${username}/delete-request`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({friend_username}),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete rejected request");
        }
        return response.json();
    });
}

// Function to search for a user by username
export async function searchUserByUsername(username) {
    try {
        const response = await fetch(`${apiURL}/users/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(`Failed to fetch user`, error);
    }
}

// Function to get all usernames
export async function getUsernames() {
    try {
        const response = await fetch(`${apiURL}/friends/all-usernames`, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            }
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(`Error fetching usernames`, error);
    }
}

// Function to delete friend from Friends List

export async function deleteFriend(friend_username) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const user_username = userData.username;
    const requestBody = JSON.stringify({friend_username});
    try {
        const response = await fetch(`${apiURL}/friends/${user_username}/delete-friend`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: requestBody,
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(`Error deleting friend`, error);
    }
}