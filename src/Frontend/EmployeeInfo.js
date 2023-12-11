import React,{useState} from 'react';
import Axios from 'axios';

const EmployeeInfo = () => {
    const [newData, setInputData] = useState({Employee_id:"",EmployeeName:"",Salary:0,Department:"",DOB:"",phoneNo:0});
    const [updateStatus, updateEmployee] = useState("");

    const Submit = (e) => {
        e.preventDefault();
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
        }).catch((error) => {
                console.error("Axios Error:", error);
                if (error.response) {
                    console.error("Server Response Status:", error.response.status);
                    console.error("Server Response Data:", error.response.data);

                    // Check if there is an 'error' property in the response data
                    if (error.response.data && error.response.data.error) {
                        console.error("MySQL Error Message:", error.response.data.error);
                    } else {
                        console.error("No MySQL Error Message in the Response Data");
                    }
                } else {
                    console.error("No response received. Request made but no response.");
                }
        });
    }
    return (
        <form>
            <h2>Enter Employee Information</h2>
            <div>
                <div>
                    <label>Employee id  :</label>
                    <input type="text" onChange={(e) => {setInputData((prev) => ({...prev, Employee_id: e.target.value}))}} ></input>
                </div>
                <div>
                    <label>Name  :</label>
                    <input type="text" onChange={(e) => {setInputData((prev) => ({...prev, EmployeeName: e.target.value}))}} ></input>
                </div>
                <div>
                    <label>Salary  :</label>
                    <input type="number" onChange={(e) => {setInputData((prev) => ({...prev, Salary: e.target.value}))}} ></input>
                </div>
                <div>
                    <label>Department  :</label>
                    <input type="text" onChange={(e) => {setInputData((prev) => ({...prev, Department: e.target.value}))}} ></input>
                </div>
                <div>
                    <label>D O B  :</label>
                    <input type="date" onChange={(e) => {setInputData((prev) => ({...prev, DOB: e.target.value}))}} ></input>
                </div>
                <div>
                    <label>Phone No  :</label>
                    <input type="number" onChange={(e) => {setInputData((prev) => ({...prev, PhoneNo: e.target.value}))}} ></input>
                </div>
            </div>
            <button onChange={Submit}>submit</button>
            <h2>{updateStatus}</h2>
        </form>
    );
}

export default EmployeeInfo;