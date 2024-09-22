import React from 'react';
import './App.css';
import WebsiteAdminDash from "./pages/WebsiteAdminDash";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import CollegeAdminDash from "./pages/CollegeAdminDash";
import TeacherDash from "./pages/TeacherDash";
import AddCollege from "./pages/AddCollege";
import AddTeacher from "./pages/AddTeacher";
import AddCourse from "./pages/AddCourse";
import ForgotPassword from "./pages/ForgotPassword";
import ManageCollege from "./pages/ManageCollege";
import AddSubject from "./pages/AddSubject";
import AddStudent from "./pages/AddStudent";
import CreateSchedule from "./pages/CreateSchedule";
import MarkAttendance from "./pages/MarkAttendance";
import ViewAttendance from "./pages/ViewAttendance";
import ManageCourses from "./pages/ManageCourses";
import StudentDash from "./pages/StudentDash";
import ViewStudentAttendance from "./pages/ViewStudentAttendance";
import MarkExam from "./pages/MarkExam";
import ViewMarks from "./pages/ViewMarks";


const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/wsdash" element={<WebsiteAdminDash />} />
                    <Route path="/cdash" element={<CollegeAdminDash />} />
                    <Route path="/tdash" element={<TeacherDash />} />
                    <Route path="/sdash" element={<StudentDash />} />
                    <Route path="/addCollege" element={<AddCollege />} />
                    <Route path="/addTeacher" element={<AddTeacher />} />
                    <Route path="/addCourse" element={<AddCourse />} />
                    <Route path="/addSubject" element={<AddSubject />} />
                    <Route path="/addStudent" element={<AddStudent />} />
                    <Route path="/createSchedule" element={<CreateSchedule />} />
                    <Route path="/markAttendance" element={<MarkAttendance />} />
                    <Route path="/markExam" element={<MarkExam />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/manageCollege" element={<ManageCollege />} />
                    <Route path="/manageCourse" element={<ManageCourses />} />
                    <Route path="/viewAttendance" element={<ViewAttendance />} />
                    <Route path="/viewStudentAttendance" element={<ViewStudentAttendance />} />
                    <Route path="/viewStudentMarks" element={<ViewMarks />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;