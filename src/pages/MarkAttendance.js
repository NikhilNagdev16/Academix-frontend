import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownCourseWithFetch from "../components/DropdownCourseWithFetch";
import DropdownSubjectWithFetch from "../components/DropdownSubjectWithFetch";
import DayOfWeekDropdown from "../components/DayOfWeekDropown";
import DropdownSubjectusingTeacherWithFetch from "../components/DropdownSubjectusingTeacherWithFetch";

const MarkAttendance = () => {
    const navigate = useNavigate();
    const [course_id, setSelectedCourseId] = useState("");
    const [subject_id, setSelectedSubjectId] = useState("");
    const [day, setSelectedDay] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        if (getCookie("role") !== 'teacher') {
            navigate('/');
        }
    }, [navigate]);

    const handleSubjectSelect = (selectedId) => {
        setSelectedSubjectId(selectedId);
        console.log("Selected Subject ID:", selectedId);
    };

    const handleDaySelect = (selectedDay) => {
        setSelectedDay(selectedDay);
        console.log("Selected day:", selectedDay);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const attendanceData = {
            course_id: course_id,
            subject_id: subject_id,
            day: day,
            date: date,
            time: time
        };

        try {
            const response = await fetch(`http://localhost:8080/markAttendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attendanceData)
            });

            if (response.ok) {
                alert('Attendance marked successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to mark attendance: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to mark attendance: ${error.message}`);
        }
    };

    return (
        <>
            <Header/>
            <div className="container">
                <Sidebar/>
                <div className="main">
                    <div className="App">
                        <div className="FormBox">
                            <div className="FormTitle">
                                <div className="App-header">
                                    <h2>Mark Attendance</h2>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <form onSubmit={handleSubmit}>
                                            <DropdownSubjectusingTeacherWithFetch onSelect={handleSubjectSelect}
                                                                      courseId={getCookie('userID')}/>
                                            <DayOfWeekDropdown onSelect={handleDaySelect}/>
                                            <input type="date" name="date"
                                                   value={date}
                                                   onChange={(e) => setDate(e.target.value)}/>
                                            <button type="submit">Mark Attendance</button>
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
};

export default MarkAttendance;