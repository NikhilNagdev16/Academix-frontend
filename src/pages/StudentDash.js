import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../components/cookieUtil";

const StudentDash = () => {
    const navigate = useNavigate();

    function viewAttendanceFunc() {
        navigate('/viewStudentAttendance');
    }
    function viewScheduleFunc() {
        navigate('/viewAttendance');
    }
    function viewResultFunc() {
        navigate('/viewStudentMarks');
    }
    useEffect(() => {
        if (getCookie('role') !== 'student') {
            navigate('/');
        }
    }, [navigate]);

    const [lectures, setLectures] = useState(0); // Initialize with a number
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/getNoOfLecturesStudent?studentId=' + getCookie('userID'), {
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
                            </div>
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Goto</h3>
                            <div className="App-content">
                                <CardButton num={"M"} til={"View Attendance"} onclickfunc={viewAttendanceFunc}/>
                                <CardButton num={"M"} til={"View Schedule"} onclickfunc={viewScheduleFunc}/>
                                <CardButton num={"M"} til={"View Result"} onclickfunc={viewResultFunc}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDash;