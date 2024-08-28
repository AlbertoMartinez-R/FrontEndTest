import {useEffect, useState} from 'react';
import {adminfetchUsers} from "../../hooks/useFetchUsers.js";

export default function UsersTab() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const getMinUsers = async () => {
            try {
                const response = await adminfetchUsers();

                console.log(response);

                const minUsers = response.slice(0, 5);
                console.log(minUsers);

                setUsers(minUsers);

            } catch (error) {
                console.error('Failed to fetch all users!', error);
            }
        };
        getMinUsers();
    }, [])

    return (
        <div>
            <h1>User Table</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}  {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}