import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/cookieUtil";

const AddTeacher = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("role") !== 'collegeadmin') {
            navigate('/');
        }
    }, [navigate]);

    const [adminData, setAdminData] = useState({
        email: "",
        name: "",
        password: "",
        role: "teacher"
    });

    const handleAdminChange = (e) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const collegeid=getCookie("collegeId");
        try {
            const response = await fetch(`http://localhost:8080/addUser?collegeid=${collegeid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminData)
            });

            if (response.ok) {
                // Handle success
                alert('Teacher added successfully!');
                setAdminData({
                    email: "",
                    name: "",
                    password: "",
                    role: "teacher"
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
                                    <h4>Teacher Details</h4>
                                </div>
                            </div>
                            <div className="FormFields">
                                <div className="App-content">
                                    <div className="form__inputs">
                                        <form onSubmit={handleSubmit}>

                                            <input
                                                type="text"
                                                name='name'
                                                placeholder="Teacher Name"
                                                value={adminData.name}
                                                onChange={handleAdminChange}
                                            />
                                            <input
                                                type="password"
                                                name='password'
                                                placeholder="Teacher Password"
                                                value={adminData.password}
                                                onChange={handleAdminChange}
                                            /><br/>
                                            <input
                                                type="text"
                                                name='email'
                                                placeholder="Teacher Email"
                                                value={adminData.email}
                                                onChange={handleAdminChange}
                                            /><br/>

                                            <button type="submit">Add College</button>
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

export default AddTeacher;