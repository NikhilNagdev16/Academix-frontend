import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../components/cookieUtil";

const TeacherDash = () => {
    const navigate = useNavigate();

    function markAttendanceFunc() {
        navigate('/markAttendance');
    }

    useEffect(() => {
        if (getCookie('role') !== 'teacher') {
            navigate('/');
        }
    }, [navigate]);

    const [lectures, setLectures] = useState(0); // Initialize with a number
    const [subjects, setSubjects] = useState(0); // Initialize with a number
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/getNoOfLecturesTeacher?teacherId=' + getCookie('userID'), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch lecture count.");
                }

                const count = await response.json();
                console.log(count);
                setLectures(count); // Set lectures count

            } catch (error) {
                console.error("Error fetching lecture count:", error); // Log error
            }
            try {
                const response1 = await fetch('http://localhost:8080/getNoOfSubjectsTeacher?teacherId=' + getCookie('userID'), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response1.ok) {
                    throw new Error("Failed to fetch lecture count.");
                }

                const count = await response1.json();
                console.log(count);
                setSubjects(count); // Set lectures count

            } catch (error) {
                console.error("Error fetching lecture count:", error); // Log error
            }
        };

        fetchData(); // Fetch data when component mounts
    }, []);

    return (
        <>
            <Header collegeName={"collegeName"} collegeLogo={logo}/>
            <div className="container">
                <Sidebar avatar={logo}/>
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Records</h3>
                            <div className="App-content">
                                <Card num={lectures} til={"Num OF Lectures"}/>
                                <Card num={subjects} til={"Num OF Subjects"}/>
                            </div>
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Goto</h3>
                            <div className="App-content">
                                <CardButton num={"M"} til={"Mark Attendance"} onclickfunc={markAttendanceFunc}/>
                                <CardButton num={"E"} til={"Mark Exam"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDash;