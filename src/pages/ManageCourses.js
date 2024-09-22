import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CollegeDataTable from "../components/CollegeDataTable";
import CourseDataTable from "../components/CourseDataTable";

const ManageCollege = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('role') !== 'collegeadmin') {
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
                            <center><h3>Manage Courses</h3></center>
                        </div>
                        <div className='app-content'>
                            <CourseDataTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageCollege;