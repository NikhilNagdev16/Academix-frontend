import React, {useEffect} from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../components/cookieUtil";

const TeacherDash = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (getCookie('role')!= 'teacher') {
            navigate('/');
        }
    }, [navigate]);

    if (!getCookie("userID")) {
        return null; // Render nothing while redirecting
    }
    return(
        <>
            <Header collegeName={"collegeName"} collegeLogo={logo}/>
            <div className="container">
                <Sidebar avatar={logo}/>
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Records</h3>
                            <div className="App-content">
                                <Card num={10} til={"Num OF Lectures"}/>
                                <Card num={10} til={"Num OF Subjects"}/>
                            </div>
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Goto</h3>
                            <div className="App-content">
                                <CardButton num={"M"} til={"Mark Attendance"}/>
                                <CardButton num={"E"} til={"Mark Exam"}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherDash;