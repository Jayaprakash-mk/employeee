import React,{useState,useEffect} from "react";
import Axios from 'axios';
import classes from './EmployeeData.module.css';
import moment from 'moment';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from "axios";

//{moment(data.dob).utc().format('YYYY-MM-DD')}
const EmployeeData = (props) => {
    const [newData,setNewData] = useState([]);

    useEffect(() => {
        GetData()
    }, []);

    const backToHomeButton = () => {
        props.choice2(false);
    }
    const GetData = async () => {
        try{
            const result = await Axios.get('http://localhost:3001/employeeData');
            console.log(result.data);
            setNewData(result.data);
        } catch (e) {
            console.log("Something went wrong", e);
        }

    }

    const Delete = async (id) => {
        try {
            const response = await Axios.delete(`https://employee-h4u5.onrender.com/deleteData/${id}`);
            console.log("response message:", response.data);
            //window.location.reload();
        }catch (e) {
            console.log("Something went wrong in deleting in data",e);
        }
    }

    return(
        <div className={classes.employee}>
            <div className={classes.TopBar}>
                <h1>Employee Details</h1>
                <div className={classes.backButton}>
                    <CancelOutlinedIcon sx={{fontSize: 32}} onClick={backToHomeButton}/>
                </div>
            </div>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th className={classes.Cell}>Employee Name</th>
                        <th className={classes.Cell}>Employee Id</th>
                        <th className={classes.Cell}>Department</th>
                        <th className={classes.Cell}>DOB</th>
                        <th className={classes.Cell}>Gender</th>
                        <th className={classes.Cell}>Designation</th>
                        <th className={classes.Cell}>Salary</th>
                    </tr>
                </thead>
                <tbody>
                {
        
                    newData.map((data) => {
                        return (
                            <tr>
                                
                                <td className={classes.Cell}>{data.employeeName}</td>
                                <td className={classes.Cell}>{data.employeeId}</td>
                                <td className={classes.Cell}>{data.department}</td>
                                <td className={classes.Cell}>{moment(data.dob).utc().format('YYYY-MM-DD')}</td>
                                <td className={classes.Cell}>{data.gender}</td>
                                <td className={classes.Cell}>{data.designation}</td>
                                <td className={classes.Cell}>{data.salary}</td>
                                <td><button onClick={(e) => Delete(data.employeeId)}>delete</button></td>
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
