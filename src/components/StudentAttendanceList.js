import React, { useState, useEffect } from 'react';

const StudentAttendanceList = ({ courseId, onAttendanceChange }) => {
    const [data, setData] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [error, setError] = useState(""); // For handling errors

    // Fetch students when component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/studentByCourse?courseId=${courseId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch student data.");
                }

                const studentData = await response.json();
                setData(studentData);

                // Initialize attendance state for each student (default status: false for Absent)
                const initialAttendance = studentData.reduce((acc, student) => {
                    acc[student.user_id] = { rollNo: student.rollNo, status: false }; // All absent by default
                    return acc;
                }, {});
                setAttendance(initialAttendance);
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        };

        fetchStudents();
    }, [courseId]);

    // Handle attendance change for each student
    const handleAttendanceChange = (userId) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [userId]: {
                ...prevAttendance[userId],
                status: !prevAttendance[userId].status, // Toggle status
            },
        }));
    };

    // Convert attendance state to model list (userid, rollno, status)
    const getAttendanceList = () => {
        return Object.keys(attendance).map((userId) => ({
            userid: parseInt(userId),
            rollno: attendance[userId].rollNo,
            status: attendance[userId].status,
        }));
    };

    // Handle attendance submission
    const handleSubmitAttendance = () => {
        const attendanceList = getAttendanceList();
        onAttendanceChange(attendanceList); // Notify parent component
        console.log("Submitted attendance data:", attendanceList);
    };

    // Render student rows with present/absent option
    const renderTableRows = () => {
        return data.map((student) => (
            <tr key={student.user_id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>
                    <label>
                        <input
                            type="checkbox"
                            checked={attendance[student.user_id]?.status || false}
                            onChange={() => handleAttendanceChange(student.user_id)}
                        />
                        {attendance[student.user_id]?.status ? "Present" : "Absent"}
                    </label>
                </td>
            </tr>
        ));
    };

    return (
        <>

            <div className="App">
                <div className="App-content">
                    {error && <div className="error">{error}</div>}
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Attendance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="App">
                <div className="App-content">
                    <button onClick={handleSubmitAttendance}>Submit Attendance</button>
                </div>
            </div>
        </>
    );
};

export default StudentAttendanceList;