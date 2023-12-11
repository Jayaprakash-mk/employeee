import logo from './logo.svg';
import React, {useState}from "react";
import './App.css';
import HomePage from "./Frontend/HomePage";
import EmployeeInfo from "./Frontend/EmployeeInfo";


function App() {
  const [Add, AddNewData] = useState(false);
  const [View, ViewNewData] = useState(false);

  const AddData = (okay) => {
    AddNewData(okay);
  }
  const ViewData = (okay) => {
    ViewNewData(okay);
  }
  return (
    <>
      {!Add && !View && <HomePage choice1={AddData} choice2={ViewData}/>}
      {Add && !View && <EmployeeInfo/>}
    </>
  );
}

export default App;
