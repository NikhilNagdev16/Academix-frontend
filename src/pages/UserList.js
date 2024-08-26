import React, { useEffect, useState } from 'react';

function UserList() {
    const [users, setUsers] = useState([]); // State to hold the fetched users
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/users'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data); // Set the users state with the fetched data
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError(error); // Set the error state if there's an error
                setLoading(false);
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // The empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    alert(users);
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default UserList;