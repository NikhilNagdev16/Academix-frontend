import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownCourseWithFetch from "../components/DropdownCourseWithFetch";

const AddStudent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("role") !== 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);
    const [course_id, setSelectedCourseId] = useState("");
    const [roll_no, setRollNo] = useState("");
    const [studentData, setStudentData] = useState({
        email: "",
        name: "",
        password: "",
        role: "student"
    });



    const handleStudentChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value
        });
    };
    const handleCourseSelect = (selectedId) => {
        setSelectedCourseId(selectedId);
        console.log("Selected Course ID:", selectedId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/addStudent?collegeid='+getCookie('collegeId')+'&course_id=' + course_id+"&roll_no="+roll_no, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                // Handle success
                alert('College added successfully!');

                setStudentData({
                    email: "",
                    name: "",
                    password: "",
                    role: "student"
                });
            } else {
                // Handle error
                const errorData = await response.json();
                alert(`Failed to add Student: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to add Student: ${error.message}`);
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
                                    <h2>Add Student</h2>
                                </div>
                            </div>
                            <div className="FormTitle">
                                <div className="App-header">
                                    <h4>Student Details</h4>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <form onSubmit={handleSubmit}>


                                            <input
                                                type="text"
                                                name='name'
                                                placeholder="Student Name"
                                                value={studentData.name}
                                                onChange={handleStudentChange}
                                            />
                                            <input
                                                type="password"
                                                name='password'
                                                placeholder="Student Password"
                                                value={studentData.password}
                                                onChange={handleStudentChange}
                                            />
                                            <input
                                                type="text"
                                                name='email'
                                                placeholder="Student Email"
                                                value={studentData.email}
                                                onChange={handleStudentChange}
                                            /><br/>

                                            <center>
                                                <DropdownCourseWithFetch onSelect={handleCourseSelect}/>
                                                <input
                                                    type="text"
                                                    name='roll_no'
                                                    placeholder="Student Roll NO"
                                                    value={roll_no}
                                                    onChange={(e) => setRollNo(e.target.value)}
                                                /><br/>
                                            </center>
                                            <div className="form__submit">
                                                <button type="submit">Add College</button>
                                            </div>
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

export default AddStudent;