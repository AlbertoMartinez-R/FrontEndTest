
export async function AdminfetchUsers() {
    try {
        const response = await fetch(`${API_URL}/admin/all-users`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
