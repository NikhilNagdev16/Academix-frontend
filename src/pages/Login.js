import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const LoginFunc = (event) => {
        event.preventDefault();
            
        navigate("/");
    };

    return(
        <div className="loginBody">
            <div className="loginBox">
                <div className="login__title">
                    <h2>Login</h2>
                </div>
                <div className="login__form">
                    <form className="login__form" onSubmit={LoginFunc}>
                        <div className="login__form__inputs">
                            <input type="text" name="username" placeholder="Username" />
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="login__form__submit">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <div className="forgot">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;