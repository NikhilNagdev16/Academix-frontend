import React from 'react';
import logo from '../assets/img/logo.jpeg';
import clgfylogo from '../assets/img/clgfylog.png';
const Header = ({collegeName,collegeLogo}) => {
    return(
        <header className="header">
            <div className="header__logo">
                <img className="header__logo" src={logo} alt="logo"/>
                <button ><img className="header__logo" src={clgfylogo} alt="logo"/></button>
            </div>

            <div className="header__college">
                <div className="college__title">
                    <h3>{collegeName}</h3>
                </div>
                <div className="college__logo">
                    <img className="college__logo" src={collegeLogo} alt="logo"/>
                </div>
            </div>
        </header>
    );
}
export default Header;