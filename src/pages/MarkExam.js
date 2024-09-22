import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownSubjectusingTeacherWithFetch from "../components/DropdownSubjectusingTeacherWithFetch";
import StudentMarksList from "../components/StudentMarkList";

const MarkExam = () => {
    const navigate = useNavigate();
    const [subjectId, setSelectedSubjectId] = useState("");
    const [courseId, setSelectedCourseId] = useState("");

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
                                    <h2>Mark Exam</h2>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <DropdownSubjectusingTeacherWithFetch
                                        onSelect={handleSubjectSelect}
                                        courseId={getCookie('userID')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {subjectId && (
                        <StudentMarksList
                            subjectId={subjectId}
                            courseId={courseId}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default MarkExam;