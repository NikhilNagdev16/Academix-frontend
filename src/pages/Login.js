import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../components/cookieUtil";

const Login = () => {
    const navigate = useNavigate();

    const navigateByRole = (role) => {
        switch (role) {
            case "collegeadmin":
                navigate("/cdash");
                break;
            case "websiteadmin":
                navigate("/wsdash");
                break;
            case "teacher":
                navigate("/tdash");
                break;
            case "student":
                navigate("/sdash");
                break;
            default:
                break;
        }
    };

    // Check if user is already logged in
    useEffect(() => {
        const role = getCookie("role");
        if (role) {
            navigateByRole(role);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const LoginFunc = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your username and password.");
            }

            const data = await response.json();

            if (data.userID) {
                setCookie("userID", data.userID, 7);
                setCookie("role", data.role, 7);
                setCookie("name", data.name, 7);
                setCookie("collegeId", data.collegeId, 7);
                navigateByRole(data.role);
            } else {
                setError("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        }
    };

    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="login__title">
                    <p>AcademiX</p>
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
                        <a href="/ForgotPassword">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;