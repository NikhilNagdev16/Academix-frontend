import React, { useState, useEffect } from 'react';

const ScheduleTableCourse = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(""); // For handling errors

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch('http://localhost:8080/colleges', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch college data.");
                }

                const data = await response.json();
                setData(data); // Set the fetched data to state
                console.log(data);
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        };

        fetchColleges(); // Fetch data when component mounts
    }, []); // Empty dependency array ensures this runs only once

    const renderTableRows = () => {
        return data.map((schedule) => (
            <tr key={schedule.}>
                <td>{college.college_id}</td>
                <td>{college.college_name}</td>
                <td>{college.college_email}</td>
                <td>{college.college_phone}</td>
            </tr>
        ));
    };

    return (
        <>
            {error && <div className="error">{error}</div>}
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
            </table>
        </>
    );
};

export default ScheduleTableCourse;