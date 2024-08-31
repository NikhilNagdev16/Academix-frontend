import React, { useEffect } from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import { getCookie } from "../components/cookieUtil";

const CollegeAdminDash = () => {
const navigate = useNavigate();
    useEffect(() => {
        if (getCookie('role')!= 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);

    if (!getCookie("userID")) {
        return null; // Render nothing while redirecting
    }

    return (
        <>
            <Header collegeName={"collegeName"} collegeLogo={logo} />
            <div className="container">
                <Sidebar avatar={logo} name={"Nikhil Nagdev"} role={"College Admin"} />
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Records</h3>
                        </div>
                        <div className="App-content">
                            <Card num={10} til={"Num OF Courses"} />
                            <Card num={100} til={"Num OF Students"} />
                            <Card num={5} til={"Num OF Teachers"} />
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Manage</h3>
                        </div>
                        <div className="App-content">
                            <CardButton num={"+"} til={"Add Course"} />
                            <CardButton num={"%"} til={"Add Teacher"} />
                            <CardButton num={"%"} til={"Add Student"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CollegeAdminDash;