import React from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import {useNavigate} from "react-router-dom";

const WebsiteAdminDash = () => {
    const navigate = useNavigate();

    function addCollegeFunc() {
        navigate('/addCollege');
    }
    return(
        <>
            <Header className="App-header" collegeName={"Indira College Of Commerce And Science"} collegeLogo={logo}/>
            <div className="container">
                <Sidebar avatar={logo} name={"Nikhil Nagdev"} role={"WebSite Admin"} />

                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Records</h3>
                        </div>
                        <div className="App-content">
                            <Card num={10} til={"Total Colleges"}/>
                            <Card num={100} til={"Total Users"}/>
                            <Card num={5} til={"Inactive Users"}/>
                            <Card num={90} til={"Total Students"}/>
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Manage</h3>
                        </div>
                        <div className="App-content">
                            <CardButton num={"+"} til={"Add College"} onclickfunc={addCollegeFunc}/>
                            <CardButton num={"%"} til={"Manage College"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default WebsiteAdminDash;