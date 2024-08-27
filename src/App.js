import React from 'react';
import './App.css';
import WebsiteAdminDash from "./pages/WebsiteAdminDash";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import CollegeAdminDash from "./pages/CollegeAdminDash";
import TeacherDash from "./pages/TeacherDash";
import AddCollege from "./pages/AddCollege";

const App = () => {
    return (
       // <WebsiteAdminDash/>
       // //  <Login/>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/wsdash" element={<WebsiteAdminDash />} />
                <Route path="/cdash" element={<CollegeAdminDash />} />
                <Route path="/tdash" element={<TeacherDash />} />
                <Route path="/addCollege" element={<AddCollege />} />
            </Routes>
        </Router>
    );
};

export default App;