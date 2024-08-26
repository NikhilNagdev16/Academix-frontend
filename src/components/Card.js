import React from 'react';

const Card=({num,til}) =>{
    return(
        <div className="card">
            <div className="card-num">
               <h3>{num}</h3>
            </div>
            <div className="card-til">
               <h3> {til}</h3>
            </div>
        </div>
    );
}
export default Card;