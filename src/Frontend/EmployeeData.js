import React,{useState,useEffect} from "react";
import Axios from 'axios';
import classes from './EmployeeData.module.css';
import moment from 'moment';
import {
    AppBar,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    IconButton,
    Button,
    colors,
  } from '@mui/material';
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
            const result = await Axios.get('http://localhost:8080/employeeData');
            console.log(result.data);
            setNewData(result.data);
        } catch (e) {
            console.log("Something went wrong", e);
        }

    }

    const handleDelete = async (id) => {
        try {
            const response = await Axios.delete(`http://localhost:8080/deleteData/${id}`);
            console.log("response message:", response.data);
            //window.location.reload();
        }catch (e) {
            console.log("Something went wrong in deleting in data",e);
        }
    }

    return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '4px solid #000', borderRadius: '5px', overflow: 'hidden', margin: '20px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#000', padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="h4">Employee Details</Typography>
          <IconButton sx={{ fontSize: 38,  color: 'white'}} onClick={backToHomeButton}>
            <CancelOutlinedIcon/>
          </IconButton>
        </div>
      </AppBar>
      <Table style={{width: '100%', marginTop: '10px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Employee Name</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Employee Id</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Department</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>DOB</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Gender</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Designation</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Salary</TableCell>
            <TableCell style={{ fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newData.map((data) => (
            <TableRow key={data.id}>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{data.employeeName}</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{data.employeeId}</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{data.department}</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{moment(data.dob).utc().format('YYYY-MM-DD')}</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{data.gender}</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{data.designation}</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{data.salary}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button variant="contained" color="error" onClick={() => handleDelete(data.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
}

export default EmployeeData;
