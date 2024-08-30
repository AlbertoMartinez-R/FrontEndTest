import {apiURL} from "../../../hooks/api.js";

export async function adminfetchUsers() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${apiURL}/admin/all-users`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        if (!response.ok) {
            console.log("Error fetching users");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
};