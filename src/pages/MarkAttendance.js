import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownSubjectusingTeacherWithFetch from "../components/DropdownSubjectusingTeacherWithFetch";
import DayOfWeekDropdown from "../components/DayOfWeekDropown";
import DropdownTimeWithFetch from "../components/DropdownTimeWithFetch";
import StudentAttendanceList from "../components/StudentAttendanceList";
import scheduleTableCourse from "../components/ScheduleTableCourse";

const MarkAttendance = () => {
    const navigate = useNavigate();
    const [courseId, setSelectedCourseId] = useState("");
    const [subjectId, setSelectedSubjectId] = useState("");
    const [day, setSelectedDay] = useState("");
    const [timeId, setSelectedTimeId] = useState(""); // For storing selected time
    const [date, setDate] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        if (getCookie("role") !== 'teacher') {
            navigate('/');
        }
    }, [navigate]);

    // Handlers for dropdown selections
    const handleSubjectSelect = (selectedId) => {
        setSelectedSubjectId(selectedId);
        console.log("Selected Subject ID:", selectedId);
    };

    const handleDaySelect = (selectedDay) => {
        setSelectedDay(selectedDay);
        console.log("Selected day:", selectedDay);
    };

    const handleTimeSelect = (scheduleId, courseId) => {
        setSelectedTimeId(scheduleId);
        setSelectedCourseId(courseId);
        console.log("Selected Schedule ID:", scheduleId);
        console.log("Associated Course ID:", courseId);
    };

    const handleAttendanceChange = (newAttendanceData) => {
        setAttendanceData(newAttendanceData);
        console.log("Updated attendance data:", newAttendanceData);
        // You can send this data to the server here if needed
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh


        if (!subjectId || !day || !timeId) {
            alert("Please select subject, day, and time to proceed.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/markAttendance?scheduleId=${timeId}&date=${date}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attendanceData),
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
            <Header />
            <div className="container">
                <Sidebar />
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
                                            <DropdownSubjectusingTeacherWithFetch
                                                onSelect={handleSubjectSelect}
                                                courseId={getCookie('userID')}
                                            />
                                            <DayOfWeekDropdown onSelect={handleDaySelect} />
                                            <input
                                                type="date"
                                                name="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                            {subjectId && day && (
                                                <DropdownTimeWithFetch
                                                    subjectid={subjectId}
                                                    day={day}
                                                    onSelect={handleTimeSelect}
                                                />
                                            )}
                                            {subjectId && day && timeId && attendanceData.length > 0 && (
                                                <button type="submit">Mark Attendance</button>
                                            )}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                            {subjectId && day && timeId && (
                                <StudentAttendanceList
                                    courseId={courseId}
                                    onAttendanceChange={handleAttendanceChange}
                                />
                            )}

                </div>
            </div>
        </>
    );
};

export default MarkAttendance;