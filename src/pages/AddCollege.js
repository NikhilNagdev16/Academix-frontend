import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";

const AddCollege = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("role") !== 'websiteadmin') {
            navigate('/');
        }
    }, [navigate]);

    const [collegeData, setCollegeData] = useState({
        college_name: "",
        college_address: "",
        college_phone: "",
        college_email: "",
        noOfClasses: 0
    });

    const [adminData, setAdminData] = useState({
        email: "",
        name: "",
        password: "",
        role: "collegeadmin"
    });

    const handleCollegeChange = (e) => {
        setCollegeData({
            ...collegeData,
            [e.target.name]: e.target.value
        });
    };

    const handleAdminChange = (e) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            user: adminData,
            college: collegeData
        };

        try {
            const response = await fetch('http://localhost:8080/addCollege', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                // Handle success
                alert('College added successfully!');
                setCollegeData({
                    college_name: "",
                    college_address: "",
                    college_phone: "",
                    college_email: "",
                    noOfClasses: 0
                });
                setAdminData({
                    email: "",
                    name: "",
                    password: "",
                    role: "collegeadmin"
                });
            } else {
                // Handle error
                const errorData = await response.json();
                alert(`Failed to add college: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Failed to add college: ${error.message}`);
        }
    };

    return (
        <>
            <Header collegeName={"collegeName"} collegeLogo={logo}/>
            <div className="container">
                <Sidebar avatar={logo}/>

                <div className="main">
                    <div className="App">
                        <div className="FormBox">
                            <div className="FormTitle">
                                <div className="App-header">
                                    <h2>Add College</h2>
                                </div>
                            </div>
                            <div className="FormTitle">
                                <div className="App-header">
                                    <h4>College Details</h4>
                                </div>

                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                name='college_name'
                                                placeholder="College Name"
                                                value={collegeData.college_name}
                                                onChange={handleCollegeChange}
                                            />
                                            <input
                                                type="text"
                                                name='college_address'
                                                placeholder="College Address"
                                                value={collegeData.college_address}
                                                onChange={handleCollegeChange}
                                            /><br/>
                                            <input
                                                type="text"
                                                name='college_email'
                                                placeholder="College Email"
                                                value={collegeData.college_email}
                                                onChange={handleCollegeChange}
                                            />
                                            <input
                                                type="text"
                                                name='college_phone'
                                                placeholder="College Phone"
                                                value={collegeData.college_phone}
                                                onChange={handleCollegeChange}
                                            /><br/>
                                            <div className="FormTitle">
                                                <div className="App-header">
                                                    <h4>College Admin Details</h4>
                                                </div>

                                            </div>

                                            <input
                                                type="text"
                                                name='name'
                                                placeholder="Admin Name"
                                                value={adminData.name}
                                                onChange={handleAdminChange}
                                            />
                                            <input
                                                type="text"
                                                name='email'
                                                placeholder="Admin Email"
                                                value={adminData.email}
                                                onChange={handleAdminChange}
                                            />
                                            <br/>
                                            <center>
                                                <input
                                                    type="password"
                                                    name='password'
                                                    placeholder="Admin Password"
                                                    value={adminData.password}
                                                    onChange={handleAdminChange}
                                                /><br/>
                                            </center>
                                            <div className="form__submit">
                                                <button type="submit">Add College</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCollege;