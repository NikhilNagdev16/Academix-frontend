import React from 'react';
import { useNavigate } from "react-router-dom";

const CardButton=({num,til,onclickfunc}) =>{
    const navigate = useNavigate();
    function handleClick() {
        if (onclickfunc) {
            onclickfunc(); // Call the passed function if provided
        }
    }
    return(
        <div className="card">
            <button className="btn" onClick={handleClick}>

                <div className="card-num">
                    <h3>{num}</h3>
                </div>
                <div className="card-til">
                    <h3> {til}</h3>
                </div>

            </button>
        </div>
    );
}
export default CardButton;