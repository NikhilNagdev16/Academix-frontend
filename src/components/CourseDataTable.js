import React, { useState, useEffect } from 'react';
import {getCookie} from "./cookieUtil";

const CourseDataTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(""); // For handling errors

    useEffect(() => {
        const fetchCourses = async () => {
    console.log(getCookie("collegeId"));
            try {
                const response = await fetch(`http://localhost:8080/course?collegeId=${getCookie("collegeId")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch course data.");
                }

                const data = await response.json();
                setData(data); // Set the fetched data to state
                console.log(data);
            } catch (error) {
                setError(error.message);
                console.error("Error:", error);
            }
        };

        fetchCourses(); // Fetch data when component mounts or collegeId changes
    }, []); // Dependency array includes collegeId

    const renderTableRows = () => {
        return data.map((course) => (
            <tr key={course.course_id}>
                <td>{course.course_name}</td>
                <td>{course.semesters}</td>
                <td>{course.active_semester}</td>
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
                           <th>Name</th>
                           <th>Total Semester</th>
                           <th>Active Semester</th>
                       </tr>
                       </thead>
                       <tbody>
                       {renderTableRows()}
                       </tbody>
                   </table>
               </div>
           </div>
        </>
    );
};

export default CourseDataTable;