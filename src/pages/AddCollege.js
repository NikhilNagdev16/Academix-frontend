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
                      <div className="FormBox">
                          <div className="FormTitle">
                              <div className="App-header">
                                  <h2> Add College </h2>
                              </div>


                          </div>
                          <div className="FormTitle">
                              <div className="App-header">
                                  <h4>College Details</h4>
                              </div>
                              <div className="App-header">
                                  <h4>College Admin Details</h4>
                              </div>
                          </div>
                          <div className="FormFields">
                              <div className="App-content">
                                  <div className="form__inputs">
                                      <form>
                                          <input type="text" name='college_name' placeholder="college name"/>
                                          <input type="text" name='college_address' placeholder="college address"/><br/>
                                          <input type="text" name='email' placeholder="college email"/>
                                          <input type="text" name='phone' placeholder="college phone"/><br/>
                                          <input type="text" name='phone' placeholder="college phone"/>
                                          <input type="number" name='classes' placeholder="No Of Classes"/><br/>
                                      </form>
                                  </div>
                              </div>

                              <div className="App-content">
                                  <div className="form__inputs">
                                      <form>
                                          <input type="text" name='User Name' placeholder="Admin name"/>
                                          <input type="text" name='college_address' placeholder="Admin password"/><br/>
                                          <input type="text" name='email' placeholder="Admin email"/>
                                          <input type="text" name='phone' placeholder="Admin phone"/><br/>

                                      </form>
                                  </div>
                              </div>
                          </div>
                          <div className="FormTitle">
                              <div className="App-header">
                                  <button>Add College</button>
                              </div>


                          </div>
                      </div>
                  </div>


              </div>
          </div>
      </>
    );
}
export default AddCollege;