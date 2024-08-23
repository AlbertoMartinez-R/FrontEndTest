const apiURL = 'http://localhost:3032/api';
export async function AdminfetchUsers() {
    try {
        const response = await fetch(`${apiURL}/admin/all-users`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}