import React from 'react';
import {deleteCookie, getCookie} from "./cookieUtil";
import {useNavigate} from "react-router-dom";


const Sidebar = (avatar) => {

const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="user__info">
                <div className="user__avatar">
                    <img className="user__avatar-img" src={avatar} alt="avatar" />
                </div>
                <div className="user__name"><h3>{getCookie('name')}</h3></div>
                <div className="user__role">{getCookie('role')}</div>
            </div>
            <div className="options">
                <button onClick={()=>{
                    navigate('/');
                }} >Home</button>
                <button onClick={()=>{
                    deleteCookie('userID');
                    deleteCookie('role');
                    deleteCookie('name');
                    deleteCookie('collegeId');
                    navigate('/');
                }}
                >Logout</button>
            </div>
        </div>
    );
}
export default Sidebar;