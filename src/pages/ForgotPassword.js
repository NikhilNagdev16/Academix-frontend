import React, { useState } from "react";

const ForgotPassword = () => {
    const [username, setUsername] = useState(""); // Corrected useState
    const [error, setError] = useState("");

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        alert("password will be mailed if user exists!");

        try {
            const response = await fetch(`http://localhost:8080/forgot?email=${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="login__title">
                    <h1>AcademiX</h1>
                    <h3>Forgot Password</h3>
                </div>
                <div className="login__form">
                    <form className="login__form" onSubmit={handleForgotPassword}>
                        <div className="login__form__inputs">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="login__form__submit">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    {error && <div className="error">{error}</div>}
                    <div className="forgot">
                        <a href="/">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;