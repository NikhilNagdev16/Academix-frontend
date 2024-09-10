import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";

const AddCourse = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("role") !== 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);
    const cid=getCookie("collegeId");
    const [CourseData, setCourseData] = useState({
        college_id: cid,
        course_name: "",
        semesters: 1,
        active_semester: 1
    });

    const handleCourseChange = (e) => {
        setCourseData({
            ...CourseData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(CourseData);
        try {
            const response = await fetch(`http://localhost:8080/addCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(CourseData)
            });

            if (response.ok) {
                // Handle success
                alert('Course added successfully!');
                setCourseData({
                    college_id: cid,
                    course_name: "",
                    semesters: 1,
                    active_semester: 1
                });
            } else {
                // Handle error
                const errorData = await response.json();
                alert(`Failed to add college: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to add college: ${error.message}`);
        }
    };

    return (
        <>
            <Header collegeName={"collegeName"} collegeLogo={logo}/>
            <div className="container">
                <Sidebar avatar={logo}/>

                <div className="main">
                    <div className="App">
                        <div className="FormBox">
                            <div className="FormTitle">
                                <div className="App-header">
                                    <h2>Add Course</h2>
                                </div>
                            </div>
                            <div className="FormTitle">

                                <div className="App-header">
                                    <h4>Course Details</h4>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <form onSubmit={handleSubmit}>

                                            <input
                                                type="text"
                                                name='course_name'
                                                placeholder="Course Name"
                                                value={CourseData.name}
                                                onChange={handleCourseChange}
                                            />
                                            <input
                                                type="number"
                                                name='semesters'
                                                placeholder="No Of Semesters"
                                                // value={CourseData.semester}
                                                onChange={handleCourseChange}
                                            /><br/>
                                            <input
                                                type="number"
                                                name='active_semester'
                                                placeholder="Active Semester"
                                                // value={CourseData.active_semester}
                                                onChange={handleCourseChange}
                                            /><br/>

                                            <button type="submit">Add Course</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCourse;