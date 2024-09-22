import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownCourseWithFetch from "../components/DropdownCourseWithFetch";
import DropdownSubjectWithFetch from "../components/DropdownSubjectWithFetch";
import DropdownTeacherWithFetch from "../components/DropdownTeacherWithFetch";
import DayOfWeekDropdown from "../components/DayOfWeekDropown";

const CreateSchedule = () => {
    const navigate = useNavigate();
    const [course_id, setSelectedCourseId] = useState("");
    const [subject_id, setSelectedSubjectId] = useState("");
    const [day, setSelectedDay] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");


    useEffect(() => {
        if (getCookie("role") !== 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);

    const handleCourseSelect = (selectedId) => {
        setSelectedCourseId(selectedId);
        console.log("Selected Course ID:", selectedId);
    };

    const handleSubjectSelect = (selectedId) => {
        setSelectedSubjectId(selectedId);
        console.log("Selected Subject ID:", selectedId);
    };
    const handleDaySelect = (day) => {
        setSelectedDay(day);
        console.log("Selected day:", day);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const responseBody={
            course_id: course_id,
            subject_id: subject_id,
            day: day,
            start_time: start_time,
            end_time: end_time,
            class_no: "1"
        }
        try {
            const response = await fetch(`http://localhost:8080/addSchedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(responseBody)
            });

            if (response.ok) {
                // Handle success
                alert('Schedule created successfully!');
            } else {
                // Handle error
                const errorData = await response.json();
                alert(`Failed to create schedule: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to create schedule: ${error.message}`);
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
                                    <h2>Create Schedule</h2>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <form onSubmit={handleSubmit}>
                                            <DropdownCourseWithFetch onSelect={handleCourseSelect}/>
                                            <DropdownSubjectWithFetch onSelect={handleSubjectSelect}
                                                                      courseId={course_id}/>
                                            <DayOfWeekDropdown onSelect={handleDaySelect}/>
                                            <input type="time" name="start_time"
                                                   value={start_time}
                                                   onChange={(e) => setStartTime(e.target.value)}/>
                                            <input type="time" name="end_time"
                                                   value={end_time}
                                                   onChange={(e) => setEndTime(e.target.value)}/>
                                            <br/>
                                            <div className="form__submit">
                                                <button type="submit">Create Schedule</button>
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

export default CreateSchedule;