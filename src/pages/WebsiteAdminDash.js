import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import { getCookie } from "../components/cookieUtil";

const WebsiteAdminDash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('role')!= 'websiteadmin') {
            navigate('/');
        }
    }, [navigate]);

    function addCollegeFunc() {
        navigate('/addCollege');
    }
    function manageCollegeFunc() {
        navigate('/manageCollege');
    }
    const [users, setUsers] = useState("");
    const [colleges, setColleges] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/getNoOfUsers', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const users = await response.json();
                setUsers(users);
            } catch (error) {

            }
            try {
                const response1 = await fetch('http://localhost:8080/getNoOfColleges', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response1.ok) {
                    throw new Error("Failed to fetch college data.");
                }

                const colleges = await response1.json();
                setColleges(colleges);
            } catch (error) {

            }
        };

        fetchData(); // Fetch data when component mounts
    },[]);

    return (
        <>
            <Header/>
            <div className="container">
                <Sidebar avatar={logo} name="Nikhil Nagdev" role="WebSite Admin" />

                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Records</h3>
                        </div>
                        <div className="App-content">
                            <Card num={colleges} til="Total Colleges" />
                            <Card num={users} til="Total Users" />
                        </div>
                    </div>
                    <div className="App">
                        <div className="App-header">
                            <h3>Manage</h3>
                        </div>
                        <div className="App-content">
                            <CardButton num="+" til="Add College" onclickfunc={addCollegeFunc} />
                            <CardButton num="%" til="Manage College" onclickfunc={manageCollegeFunc}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebsiteAdminDash;