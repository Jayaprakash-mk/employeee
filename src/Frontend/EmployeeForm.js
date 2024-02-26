import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
//import {DatePicker} from '@mui/x-date-pickers';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import classes from './EmployeeData.module.css';

const EmployeeForm = (props) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: 'male',
    designation: '',
    salary: '',
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showRequestError, setRequestError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const backToHomeButton = () => {
    props.choice1(false);
  }

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleSubmit = () => {
    if (
      formData.employeeName &&
      formData.employeeId &&
      formData.department &&
      formData.dob &&
      formData.gender &&
      formData.designation &&
      formData.salary
    ) {
     
      //console.log(formData);

      Axios.post('https://employeee-9vp3.onrender.com/employee', {
        employeeName:formData.employeeName,
        employeeId:formData.employeeId,
        department:formData.department,
        dob:formData.dob,
        gender:formData.gender,
        designation:formData.designation,
        salary:formData.salary,
    }).then((response) => {
        if(response.data.message){
            console.log(response.data.message);
           //console.log("error");
           setShowSuccessAlert(true);
           
        }
        else{
            setShowSuccessAlert(true);
        }
    });

      // Show success alert
      //setShowSuccessAlert(true);

      // Clear the form
      setFormData({
        employeeName: '',
        employeeId: '',
        department: '',
        dob: null,
        gender: 'male',
        designation: '',
        salary: '',
      });
    } else {
      // Show error alert
      setShowErrorAlert(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        Employee Details
        <div className={classes.backButton}>
            <CancelOutlinedIcon sx={{fontSize: 32}} onClick={backToHomeButton}/>
        </div>
      </Typography>
      <form>
        <TextField
          label="Employee Name"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </TextField>
        <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{
                shrink: true,
              }}
            value={formData.dob}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />
        {/* <DatePicker
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        /> */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
          Submit
        </Button>
      </form>
      {showSuccessAlert && (
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Form submitted successfully!
        </Alert>
      )}
      {showRequestError && (
        <Alert severity="error" onClose={() => setRequestError(false)}>
          Something went wrong! Submission unsuccessfull!
        </Alert>
      )}
      {showErrorAlert && (
        <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
          Please fill in all required fields.
        </Alert>
      )}
    </div>
    </div>
  );
};

export default EmployeeForm;
