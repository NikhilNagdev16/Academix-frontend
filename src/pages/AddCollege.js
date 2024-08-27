import React from "react";
import Header from "../components/Header";
import logo from "../assets/img/logo.jpeg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardButton from "../components/CardButton";
import {Form} from "react-router-dom";
import Login from "./Login";

const AddCollege = () => {
    return(
      <>
          <Header collegeName={"collegeName"} collegeLogo={logo}/>
          <div className="container">
              <Sidebar avatar={logo} name={"Nikhil Nagdev"} role={"WebSite Admin"}/>

              <div className="main">
                    <div className="App">
                        <div className="App-header">
                            <h3>Add College</h3>
                        </div>
                        <div className="App-content">
                            <form>
                                <input type="text" name='college_name' placeholder="college name"/>
                            </form>
                        </div>
                    </div>
              </div>
          </div>
      </>
    );
}
export default AddCollege;