import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CollegeDataTable from "../components/CollegeDataTable";

const ManageCollege = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('role') !== 'websiteadmin') {
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
                                    <h3>Manage Colleges</h3>
                                </center>
                            </div>
                            <div className='app-content'>
                                 <CollegeDataTable />
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default ManageCollege;