import React from "react";

const AttendanceList = ({ data }) => {
    return (
        <div className="App">
            <div>
                <h3>Attendance Records</h3>
            </div>
            <div className="App-content">
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>User ID</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((record) => (
                        <tr key={record.userid}>
                            <td>{record.rollno}</td>
                            <td>{record.userid}</td>
                            <td>{record.status ? "Present" : "Absent"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceList;