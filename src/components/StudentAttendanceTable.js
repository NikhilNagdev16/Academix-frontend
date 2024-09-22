import React, { useState, useEffect } from 'react';
import { getCookie } from "./cookieUtil";

const StudentAttendanceTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(""); // For handling errors
    const [attendancePercentage, setAttendancePercentage] = useState(0); // State for attendance percentage

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/studentAttendance?userId=${getCookie("userID")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch attendance data.");
                }

                const data = await response.json();
                setData(data); // Set the fetched data to state

                // Calculate attendance percentage
                const totalClasses = data.length;
                const attendedClasses = data.filter(att => att.status).length;
                const percentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;

                setAttendancePercentage(percentage.toFixed(2)); // Set the percentage, fixed to 2 decimal places
                console.log(data);
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        };

        fetchAttendanceData(); // Fetch data when component mounts
    }, []);

    const renderTableRows = () => {
        return data.map((student) => (
            <tr key={student.rollNo}>
                <td>{student.rollNo}</td>
                <td>{student.subjectName}</td>
                <td>{student.date}</td>
                <td>{student.status ? "Present" : "Absent"}</td>
            </tr>
        ));
    };

    // Determine color based on percentage
    const getPercentageColor = (percentage) => {
        if (percentage < 50) return 'red';
        if (percentage < 75) return 'orange';
        return 'green';
    };

    return (
        <>
            {error && <div className="error">{error}</div>}
            <h3 style={{ color: getPercentageColor(attendancePercentage) }}>
                Total Attendance: {attendancePercentage}%
            </h3>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Subject Name</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
            </table>
        </>
    );
};

export default StudentAttendanceTable;