import React from 'react';
import logo from './assets/img/logo.jpeg';
import './App.css';
import Card from "./components/Card";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
       <>
           <Header className="App-header" collegeName={"Indira College Of Commerce And Science"} collegeLogo={logo}/>
           <div className="container">
               <Sidebar avatar={logo} name={"Nikhil Nagdev"} role={"WebSite Admin"}/>

               <div className="main">
                   <div className="App">
                       <div className="App-header">
                           <h3>Records</h3>
                       </div>
                       <div className="App-content">
                           <Card num={10} til={"Num OF College"}/>
                           <Card num={100} til={"Num OF Users"}/>
                           <Card num={5} til={"Num OF Inactive Users"}/>
                           <Card num={90} til={"Num OF Students"}/>
                       </div>
                   </div>
                   <div className="App">
                       <div className="App-header">
                           <h3>Records</h3>
                       </div>
                       <div className="App-content">
                           <Card num={10} til={"Num OF College"}/>
                           <Card num={100} til={"Num OF Users"}/>
                           <Card num={5} til={"Num OF Inactive Users"}/>
                           <Card num={90} til={"Num OF Students"}/>
                       </div>
                   </div>
               </div>
           </div>
       </>


    );
};

export default App;