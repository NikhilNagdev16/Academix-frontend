import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import { getCookie } from "../components/cookieUtil";

const CollegeAdminDash = () => {
const navigate = useNavigate();
    const [Courses, setCOurses] = useState("");
    const [Students, setStudents] = useState("");
    const [Teachers, setTeachers] = useState("");
    useEffect(() => {
        if (getCookie('role')!= 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);
    function addTeacherFunc() {
        navigate('/addTeacher');
    }
    function addCourseFunc() {
        navigate('/addCourse');
    }
    function addSubjectFunc() {
        navigate('/addSubject');
    }
    function addStudentFunc() {
        navigate('/addStudent');
    }
    function createSheduleFunc() {
        navigate('/createSchedule');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/getNoOfCourses?collegeId='+getCookie('collegeId'), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const users = await response.json();
                setCOurses(users);
            } catch (error) {

            }
            try {
                const response1 = await fetch('http://localhost:8080/getNoOfStudents?collegeID='+getCookie('collegeId'), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response1.ok) {
                    throw new Error("Failed to fetch college data.");
                }

                const colleges = await response1.json();
                setStudents(colleges);
            } catch (error) {

            }
            try {
                const response2 = await fetch('http://localhost:8080/getNoOfTeachers?collegeId='+getCookie('collegeId'), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response2.ok) {
                    throw new Error("Failed to fetch college data.");
                }

                const teachers = await response2.json();
                setTeachers(teachers);
            } catch (error) {

            }
        };

        fetchData(); // Fetch data when component mounts
    },[]);

    return (
        <>
            <Header/>
            <div className="container">
                <Sidebar/>
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Records</h3>
                        </div>
                        <div className="App-content">
                            <Card num={Courses} til={"Num OF Courses"} />
                            <Card num={Students} til={"Num OF Students"} />
                            <Card num={Teachers} til={"Num OF Teachers"} />
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Manage</h3>
                        </div>
                        <div className="App-content">
                            <CardButton num={"+"} til={"Add Course"} onclickfunc={addCourseFunc} />
                            <CardButton num={"%"} til={"Add Teacher"} onclickfunc={addTeacherFunc} />
                            <CardButton num={"%"} til={"Add Subject"} onclickfunc={addSubjectFunc} />
                            <CardButton num={"%"} til={"Add Student"} onclickfunc={addStudentFunc}/>
                            <CardButton num={"%"} til={"Create Schedule"} onclickfunc={createSheduleFunc}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CollegeAdminDash;