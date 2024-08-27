import React from 'react';


const Sidebar = ({avatar,name,role}) => {


    return (
        <div className="sidebar">
            <div className="user__info">
                <div className="user__avatar">
                    <img className="user__avatar-img" src={avatar} alt="avatar" />
                </div>
                <div className="user__name"><h3>{name}</h3></div>
                <div className="user__role">{role}</div>
            </div>
            <div className="options">
                <button >Home</button>
                <button >Logout</button>
            </div>
        </div>
    );
}
export default Sidebar;