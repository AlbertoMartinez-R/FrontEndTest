import {useEffect, useState} from 'react';
import {fetchUsers} from '../../../hooks/useFetchUsers.js';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users: {error}</p>;

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};
