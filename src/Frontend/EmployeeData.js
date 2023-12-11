import React,{useState,useEffect} from "react";
import Axios from 'axios';
import classes from './EmployeeData.module.css';
import moment from 'moment';

const EmployeeData = () => {
    const [newData,setNewData] = useState([]);

    useEffect(() => {
        GetData()
    }, []);

    const GetData = async () => {
        try{
            const result = await Axios.get('http://localhost:3001/employeeData');
            setNewData(result.data);
        } catch (e) {
            console.log("Something went wrong", e);
        }

    }

    return(
        <div className={classes.employee}>
            <h2>Employee Details</h2>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th className={classes.Cell}>Employee Id</th>
                        <th className={classes.Cell}>Employee Name</th>
                        <th className={classes.Cell}>Salary</th>
                        <th className={classes.Cell}>Department</th>
                        <th className={classes.Cell}>DOB</th>
                        <th className={classes.Cell}>Phone No</th>
                    </tr>
                </thead>
                <tbody>
                {
                    newData.map((data) => {
                        return (
                            <tr>
                                <td className={classes.Cell}>{data.Employee_id}</td>
                                <td className={classes.Cell}>{data.EmployeeName}</td>
                                <td className={classes.Cell}>{data.Salary}</td>
                                <td className={classes.Cell}>{data.Department}</td>
                                <td className={classes.Cell}>{moment(data.DOB).utc().format('YYYY-MM-DD')}</td>
                                <td className={classes.Cell}>{data.PhoneNo}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeData;
