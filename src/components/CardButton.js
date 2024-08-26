import React from 'react';

const CardButton=({num,til}) =>{
    return(
        <button className="btn" onClick={()=>{alert("clicked")}}>
            <div className="card">
                <div className="card-num">
                    <h3>{num}</h3>
                </div>
                <div className="card-til">
                    <h3> {til}</h3>
                </div>
            </div>
        </button>
    );
}
export default CardButton;