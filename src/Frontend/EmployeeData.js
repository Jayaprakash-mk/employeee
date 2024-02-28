import React,{useState,useEffect} from "react";
import Axios from 'axios';
//import classes from './EmployeeData.module.css';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
  } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from "axios";
import EmployeeFilter from "./EmployeeFilter";

//{moment(data.dob).utc().format('YYYY-MM-DD')}
const EmployeeData = (props) => {
    const [newData,setNewData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [filters, setFilters] = useState({
      employeeName: '',
      employeeId: '',
      department: '',
      designation: '',
    });
    
    useEffect(() => {
        GetData()
    }, [filters]);

    const backToHomeButton = () => {
        props.choice2(false);
    }
    const GetData = async () => {
        try{
            const result = await Axios.get('https://employeee-9vp3.onrender.com/employeeData',{
              params: filters,
            });
            console.log(result.data);
            setNewData(result.data);
        } catch (e) {
            console.log("Something went wrong", e);
        }

    }

    const handleDelete = (id) => {
        setSelectedEmployee(id);
        setOpenDialog(true);
      }
    
      const confirmDelete = async () => {
        try {
          await Axios.delete(`https://employeee-9vp3.onrender.com/deleteData/${selectedEmployee}`);
          GetData();
          setOpenDialog(false);
          setAlertMessage("Employee deleted successfully!");
          setOpenSnackbar(true);
        } catch (e) {
          console.log("Something went wrong in deleting data", e);
        }
      }
    
      const cancelDelete = () => {
        setOpenDialog(false);
      }

      const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      }

      const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
      };

    return(
    <div style={{marginTop: '20px'}}>
      <div style={{marginLeft: '25px'}}>
       <EmployeeFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '4px solid #000', borderRadius: '5px', overflow: 'hidden', margin: '20px' }}>
        <AppBar position="static" sx={{ backgroundColor: '#000', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="h4">Employee Details</Typography>
            <IconButton sx={{ fontSize: 38,  color: 'white'}} onClick={backToHomeButton}>
              <CancelOutlinedIcon/>
            </IconButton>
          </div>
          
        </AppBar>
        {/* <div style={{ widht: '50%',height: '500px', overflowY: 'scroll' }}> */}
        <Table style={{width: '100%', marginTop: '10px', border: '1px solid #ddd', borderRadius: '5px', overflowY: 'hidden', overflowX: "clip" , display: 'flex', flexDirection: 'column' }}>
          <TableHead sx={{position:'sticky', background:'white', zIndex: 20, overflowX:'hidden', top:0}}>
            <TableRow sx={{ display:'flex', justifyContent:'space-between'}}>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Employee Name</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Employee Id</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Department</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>DOB</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Gender</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Designation</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Salary</TableCell>
              <TableCell style={{ width: "100%", fontSize: '20px' ,fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{overflowY: 'scroll', height:'500px', display: 'flex', flexDirection: 'column', '::-webkit-scrollbar': {
            display: 'none'
          }}}>
            {newData.map((data) => (
              <TableRow key={data.id} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <TableCell style={{ fontSize: '18px', textAlign: 'center', width: '100%' }}>{data.employeeName}</TableCell>
                <TableCell style={{ fontSize: '18px', textAlign: 'center',width: '100%' }}>{data.employeeId}</TableCell>
                <TableCell style={{ fontSize: '18px', textAlign: 'center' ,width: '100%'}}>{data.department}</TableCell>
                <TableCell style={{ fontSize: '18px', textAlign: 'center',width: '100%' }}>{moment(data.dob).utc().format('YYYY-MM-DD')}</TableCell>
                <TableCell style={{ fontSize: '18px', textAlign: 'center' ,width: '100%'}}>{data.gender}</TableCell>
                <TableCell style={{ fontSize: '18px', textAlign: 'center' ,width: '100%'}}>{data.designation}</TableCell>
                <TableCell style={{ fontSize: '18px', textAlign: 'center' ,width: '100%'}}>{data.salary}</TableCell>
                <TableCell style={{ textAlign: 'center',width: '100%' }}>
                  <Button variant="contained" color="error" onClick={() => handleDelete(data.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </div> */}
        
        
        <Dialog
          open={openDialog}
          onClose={cancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ 
              border: '5px solid #ddd',
              borderRadius: '10px',     

              '& .MuiDialogTitle-root': {
                backgroundColor: '#d32f2f', // Red background for delete operation
                color: 'white',
                fontWeight: 'bold',
                fontSize: '22px'
              },
              '& .MuiDialogContent-root': {
                marginTop: '5px',
                padding: '20px',
                color: 'black',
                borderRadius: '5px',
              },
              '& .MuiDialogActions-root': {
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px',
              },
              '& .MuiButton-root': {
                border: '2px solid #ddd',
                borderRadius: '10px',
                color: 'black',
                transition: 'background-color 0.3s, border 0.3s',
              },
              '& .MuiButton-root:hover': {
                backgroundColor: '#000',
                color: 'white',
                border: '2px solid #fff',
              },
            }}
        >
          <DialogTitle id="alert-dialog-title">{"Delete Employee?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={alertMessage}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
          }}       
        />
      </div>
    </div>
    );
}

export default EmployeeData;
