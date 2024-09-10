import React from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MarkAttendance = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <Sidebar/>
                <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Select Details</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MarkAttendance;