import React,{useState} from 'react';
import Axios from 'axios';
import classes from './Employee.module.css';

const EmployeeInfo = () => {
    const [newData, setInputData] = useState({Employee_id:"",EmployeeName:"",Salary:0,Department:"",DOB:"",phoneNo:0});
    const [updateStatus, updateEmployee] = useState("");

    const Submit = (e) => {
        e.preventDefault();
        console.log(123)
        Axios.post('http://localhost:3001/employee', {
            Employee_id:newData.Employee_id,
            EmployeeName:newData.EmployeeName,
            Salary:newData.Salary,
            Department:newData.Department,
            DOB:newData.DOB,
            phoneNo:newData.phoneNo,
        }).then((response) => {
            if(response.data.message){
                updateEmployee(response.data.message);
            }
            else{
                updateEmployee("Employee data inserted successfully");
            }
        });
    }
    return (
        <form onSubmit={Submit} className={classes.EmployeeForm}>
            <h2>Enter Employee Information</h2>
            <div>
                <div className={classes.EachInput}>
                    <label className={classes.FieldName}>Employee id  :</label>
                    <input className={classes.InputField} type="text" onChange={(e) => {setInputData((prev) => ({...prev, Employee_id: e.target.value}))}} ></input>
                </div>
                <div className={classes.EachInput}>
                    <label className={classes.FieldName}>Name  :</label>
                    <input className={classes.InputField} type="text" onChange={(e) => {setInputData((prev) => ({...prev, EmployeeName: e.target.value}))}} ></input>
                </div>
                <div className={classes.EachInput}>
                    <label className={classes.FieldName}>Salary  :</label>
                    <input className={classes.InputField} type="number" onChange={(e) => {setInputData((prev) => ({...prev, Salary: e.target.value}))}} ></input>
                </div>
                <div className={classes.EachInput}>
                    <label className={classes.FieldName}>Department  :</label>
                    <input className={classes.InputField} type="text" onChange={(e) => {setInputData((prev) => ({...prev, Department: e.target.value}))}} ></input>
                </div>
                <div className={classes.EachInput}>
                    <label className={classes.FieldName}>D O B  :</label>
                    <input className={classes.InputField} type="date" onChange={(e) => {setInputData((prev) => ({...prev, DOB: e.target.value}))}} ></input>
                </div>
                <div className={classes.EachInput}>
                    <label className={classes.FieldName}>Phone No  :</label>
                    <input className={classes.InputField} type="number" onChange={(e) => {setInputData((prev) => ({...prev, PhoneNo: e.target.value}))}} ></input>
                </div>
            </div>
            <button className={classes.SubmitBtn} type='submit'>submit</button>
            <h2>{updateStatus}</h2>
        </form>
    );
}

export default EmployeeInfo;