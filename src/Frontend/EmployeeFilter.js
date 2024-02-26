import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const EmployeeFilter = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    onFilterChange(localFilters);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          label="employeeName"
          name="employeeName"
          value={localFilters.employeeName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="employeeId"
          name="employeeId"
          value={localFilters.employeeId}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="department"
          name="department"
          value={localFilters.department}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="designation"
          name="designation"
          value={localFilters.designation}
          onChange={handleChange}
        />
      </Grid>
      
      <Grid item>
        <Button variant="contained" onClick={handleFilter}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmployeeFilter;
