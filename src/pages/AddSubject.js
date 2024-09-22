import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import DropdownCourseWithFetch from "../components/DropdownCourseWithFetch";
import DropdownTeacherWithFetch from "../components/DropdownTeacherWithFetch";

const AddSubject = () => {
    const navigate = useNavigate();

    const [subject_name, setSubjectName] = useState("");
    const [semester, setSemester] = useState("");
    const [internal_marks, setInternalMarks] = useState("");
    const [external_marks, setExternalMarks] = useState("");
    const [practical_marks, setPracticalMarks] = useState("");
    const [course_id, setSelectedCourseId] = useState("");
    const [TeacherID, setSelectedTeacherId] = useState("");

    useEffect(() => {
        if (getCookie("role") !== 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);

    const handleCourseSelect = (selectedId) => {
        setSelectedCourseId(selectedId);
        console.log("Selected Course ID:", selectedId);
    };

    const handleTeacherSelect = (selectedId) => {
        setSelectedTeacherId(selectedId);
        console.log("Selected Teacher ID:", selectedId);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const subjectData = {
            course_id: course_id,
            semester: semester,
            subject_name: subject_name,
            TeacherId: TeacherID,
            internal_marks: internal_marks,
            external_marks: external_marks,
            practical_marks: practical_marks
        };

        try {
            const response = await fetch('http://localhost:8080/addSubject', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subjectData),
            });

            if (response.ok) {
                // Handle successful response (e.g., redirect or show a success message)
                alert("Subject added successfully");
            } else {
                // Handle error response
                console.error("Failed to add subject");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Header/>
            <div className="container">
                <Sidebar/>
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <center><h3>Add Subject</h3></center>
                        </div>
                        <div className="app-content">
                            <form onSubmit={handleSubmit}>
                                <div className="FormBox">
                                    <div className="FormTitle">
                                        <h4>Subject Details</h4>
                                    </div>
                                    <div className="form__inputs">
                                        <input
                                            type="text"
                                            name="subject_name"
                                            placeholder="Subject Name"
                                            value={subject_name}
                                            onChange={(e) => setSubjectName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="semester"
                                            placeholder="Semester"
                                            value={semester}
                                            onChange={(e) => setSemester(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="internal_marks"
                                            placeholder="Internal Marks"
                                            value={internal_marks}
                                            onChange={(e) => setInternalMarks(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="external_marks"
                                            placeholder="External Marks"
                                            value={external_marks}
                                            onChange={(e) => setExternalMarks(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="practical_marks"
                                            placeholder="Practical Marks"
                                            value={practical_marks}
                                            onChange={(e) => setPracticalMarks(e.target.value)}
                                        />
                                        <br/>
                                        <DropdownCourseWithFetch onSelect={handleCourseSelect} />
                                        <br/>
                                        <DropdownTeacherWithFetch onSelect={handleTeacherSelect} />
                                    </div>
                                    <div className="form__submit">
                                        <button type="submit">Add Subject</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddSubject;