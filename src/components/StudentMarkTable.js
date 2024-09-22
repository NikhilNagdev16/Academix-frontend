import React, { useState, useEffect } from 'react';
import { getCookie } from "./cookieUtil";

const StudentMarkTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(""); // For handling errors

    useEffect(() => {
        const fetchMarksData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/studentMarks?userId=${getCookie("userID")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch marks data.");
                }

                const data = await response.json();
                setData(data); // Set the fetched data to state

                console.log(data);
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        };

        fetchMarksData(); // Fetch data when component mounts
    }, []);

    const calculateTotals = () => {
        return data.reduce(
            (totals, student) => {
                totals.totalInternal += student.internal;
                totals.totalExternal += student.external;
                totals.totalPractical += student.practical;
                return totals;
            },
            { totalInternal: 0, totalExternal: 0, totalPractical: 0 }
        );
    };

    const calculateOverallTotalMarks = (totals) => {
        return totals.totalInternal + totals.totalExternal + totals.totalPractical;
    };

    const calculateOverallPercentage = (overallTotalMarks) => {
        const maxMarks = data.length * 200; // Adjust according to your max marks for internal, external, practical
        return ((overallTotalMarks / maxMarks) * 100).toFixed(2);
    };

    const calculateOverallCGPA = (overallPercentage) => {
        if (overallPercentage >= 90) return 10;
        if (overallPercentage >= 80) return 9;
        if (overallPercentage >= 70) return 8;
        if (overallPercentage >= 60) return 7;
        if (overallPercentage >= 50) return 6;
        if (overallPercentage >= 40) return 5;
        return 0; // Below 40%
    };

    const calculateGrade = (overallPercentage) => {
        if (overallPercentage >= 90) return 'A+';
        if (overallPercentage >= 80) return 'A';
        if (overallPercentage >= 70) return 'B';
        if (overallPercentage >= 60) return 'C';
        if (overallPercentage >= 50) return 'D';
        return 'F'; // Below 50%
    };

    const totals = calculateTotals();
    const overallTotalMarks = calculateOverallTotalMarks(totals);
    const overallPercentage = calculateOverallPercentage(overallTotalMarks);
    const overallCGPA = calculateOverallCGPA(overallPercentage);
    const grade = calculateGrade(overallPercentage);

    const renderTableRows = () => {
        return data.map((student) => {
            const totalMarks = student.internal + student.external + student.practical;
            return (
                <tr key={student.subjectName}>
                    <td>{student.subjectName}</td>
                    <td>{student.internal}</td>
                    <td>{student.external}</td>
                    <td>{student.practical}</td>
                    <td>{totalMarks}</td>
                </tr>
            );
        });
    };

    return (
        <>
            {error && <div className="error">{error}</div>}

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Internal Marks</th>
                    <th>External Marks</th>
                    <th>Practical Marks</th>
                    <th>Total Marks</th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
            </table>

            <div>
                <h4>Overall Total Marks: {overallTotalMarks}</h4>
                <h4>Overall Percentage: {overallPercentage}%</h4>
                <h4>Overall CGPA: {overallCGPA}</h4>
                <h4>Grade: {grade}</h4> {/* Displaying the grade */}
            </div>
        </>
    );
};

export default StudentMarkTable;