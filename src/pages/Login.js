import React, {useEffect, useState} from "react";


import './login.css'

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [res,setRes] = useState([]);

    const handleLogin=(e)=>{
        e.preventDefault();

        alert(res);
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRes(data);
        }
        fetchData();
    }, []);
    return  (
        <div className="login">
            <div className="loginContainer">
                <div className="title">Login</div>
                <div className="input">
                    <form onSubmit={handleLogin}>
                        <div className="inputfield">
                            <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="inputfield">
                            <input placeholder="Password" type="password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="submitbutton">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;