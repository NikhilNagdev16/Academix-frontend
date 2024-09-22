import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownSubjectusingTeacherWithFetch from "../components/DropdownSubjectusingTeacherWithFetch";
import DayOfWeekDropdown from "../components/DayOfWeekDropown";
import DropdownTimeWithFetch from "../components/DropdownTimeWithFetch";
import AttendanceList from "../components/AttendanceList"; // Create a new component to display attendance

const ViewAttendance = () => {
    const navigate = useNavigate();
    const [courseId, setSelectedCourseId] = useState("");
    const [subjectId, setSelectedSubjectId] = useState("");
    const [day, setSelectedDay] = useState("");
    const [timeId, setSelectedTimeId] = useState("");
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
    };

    const handleDaySelect = (selectedDay) => {
        setSelectedDay(selectedDay);
    };

    const handleTimeSelect = (scheduleId, courseId) => {
        setSelectedTimeId(scheduleId);
        setSelectedCourseId(courseId);
    };

    const fetchAttendance = async () => {
        if (!subjectId || !day || !timeId) return;
            console.log("date :", date);
        try {
            const response = await fetch(`http://localhost:8080/viewAttendance?scheduleId=${timeId}&date=${date}`);
            if (response.ok) {
                const data = await response.json();
                setAttendanceData(data);
                if (attendanceData.length < 0) {
                    alert(`Attendance not found!`);
                }
            } else {
                const errorData = await response.json();
                alert(`Failed to fetch attendance: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to fetch attendance: ${error.message}`);
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
                                    <h2>View Attendance</h2>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <DropdownSubjectusingTeacherWithFetch
                                            onSelect={handleSubjectSelect}
                                            courseId={getCookie('userID')}
                                        /><br/>
                                        <DayOfWeekDropdown onSelect={handleDaySelect} /><br/>
                                        <input
                                            type="date"
                                            name="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        /><br/>
                                        {subjectId && day && (
                                            <DropdownTimeWithFetch
                                                subjectid={subjectId}
                                                day={day}
                                                onSelect={handleTimeSelect}
                                            />
                                        )}<br/>
                                        <div className="form__submit">
                                        {subjectId && day && timeId && date && (

                                            <button type="button" onClick={fetchAttendance}>
                                                View Attendance
                                            </button>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {attendanceData.length > 0 && (
                        <AttendanceList data={attendanceData} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewAttendance;