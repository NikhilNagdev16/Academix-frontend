import React, { useState, useEffect } from 'react';
import logo from '../assets/img/logo.jpeg';
import clgfylogo from '../assets/img/clgfylog.png';
import { getCookie } from "./cookieUtil";

const Header = () => {
    const [collegeData, setCollegeData] = useState({
        collegeID: '',
        college_name: '',
        college_logo: logo, // Using the imported logo as default
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCollegeData = async () => {
            try {
                const collegeID = getCookie('collegeId');
                console.log(getCookie("userID"));
                console.log(collegeID);
                console.log(getCookie("role"));
                if (!collegeID) {
                    throw new Error("College ID not found in cookies");
                }

                if (collegeID != -1) {
                    const response = await fetch(`http://localhost:8080/getCollege?id=${collegeID}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch college data");
                    }

                    const data = await response.json();
                    setCollegeData(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCollegeData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <header className="header">
            <div className="header__logo">
                <img className="header__logo" src={logo} alt="logo"/>
                <button><img className="header__logo" src={clgfylogo} alt="clgfy logo"/></button>
            </div>

            <div className="header__college">
                <div className="college__title">
                    <h3>{collegeData.college_name}</h3>
                </div>
                <div className="college__logo">
                    <img className="college__logo" src={collegeData.college_logo} alt="college logo"/>
                </div>
            </div>
        </header>
    );
}

export default Header;