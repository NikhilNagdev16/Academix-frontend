import React, { useState, useEffect } from 'react';

const StudentInCourseDataTable = ({courseId}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(""); // For handling errors
    useEffect(() => {
        const fetchColleges = async () => {
            try {

                const response = await fetch(`http://localhost:8080/studentByCourse?courseId=${courseId}`, {
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
    }, []);

    const renderTableRows = () => {
        return data.map((student) => (
            <tr key={student.user_id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
            </tr>
        ));
    };

    return (
        <>
            {error && <div className="error">{error}</div>}
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
            </table>
        </>
    );
};

export default StudentInCourseDataTable;