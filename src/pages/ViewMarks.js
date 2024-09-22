import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CollegeDataTable from "../components/CollegeDataTable";
import StudentAttendanceList from "../components/StudentAttendanceList";
import StudentAttendanceTable from "../components/StudentAttendanceTable";
import StudentMarkList from "../components/StudentMarkList";
import StudentMarkTable from "../components/StudentMarkTable";

const ViewMarks = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('role') !== 'student') {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div className='container'>
                <Sidebar />
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <center>
                                <h3>Exam Report</h3>
                            </center>
                        </div>
                        <div className='app-content'>
                            <StudentMarkTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewMarks;