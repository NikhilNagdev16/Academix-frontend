import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {setCookie} from "../components/cookieUtil";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const LoginFunc = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`, {
                method: "POST", // Using GET since parameters are in the URL
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

                if(data.userID) {
                    setCookie("userID", data.userID, 7);
                    setCookie("role", data.role, 7);
                    setCookie("name", data.name, 7);
                    setCookie("collegeId", data.collegeId, 7);
                    if (data.role=="websiteadmin") {
                        navigate('/wsdash');
                    }
                    else if(data.role=="teacher") {
                        navigate('/tdash');
                    }
                    else if(data.role=="student") {
                        navigate('/sdash');
                    }
                    else if(data.role=="collegeadmin") {
                        navigate('/cdash');
                    }
                }

        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred during login.");
        }
    };

    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="login__title">
                    <h1>AcademiX</h1>
                    <h3>Login</h3>
                </div>
                <div className="login__form">
                    <form className="login__form" onSubmit={LoginFunc}>
                        <div className="login__form__inputs">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login__form__submit">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    {error && <div className="error">{error}</div>}
                    <div className="forgot">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;