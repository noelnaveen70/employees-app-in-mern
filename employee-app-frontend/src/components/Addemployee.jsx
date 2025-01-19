import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Addemployee = () => {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    salary: '',
    department: '',
    emplocation: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (location.state != null) {
      // Update Employee
      axiosInstance
        .put(`http://localhost:3000/employees/updateemployee/${location.state.val._id}`, form)
        .then((res) => {
          alert(res.data);
          navigate('/employees'); // Redirect to employee list
        })
        .catch((error) => {
          alert('Failed to update employee. Please try again.');
          console.error(error);
        });
    } else {
      // Add Employee
      try {
        const response = await axiosInstance.post('http://localhost:3000/employees/addemployee', form);
        alert(response.data);
        setForm({ name: '', designation: '', salary: '', department: '', emplocation: '' }); // Reset form
        navigate('/employees'); // Redirect to employee list
      } catch (error) {
        alert('Failed to add the employee. Please try again.');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (location.state != null) {
      // Pre-fill the form for update
      const { name, designation, salary, department, emplocation } = location.state.val;
      setForm({ name, designation, salary, department, emplocation });
    } else {
      // Reset form for adding a new employee
      setForm({ name: '', designation: '', salary: '', department: '', emplocation: '' });
    }
  }, [location.state]);

  return (
    <div style={{ margin: '8%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Employee Name"
            variant="outlined"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Designation"
            variant="outlined"
            name="designation"
            value={form.designation}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Salary"
            variant="outlined"
            name="salary"
            value={form.salary}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Department"
            variant="outlined"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            name="emplocation"
            value={form.emplocation}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button color="secondary" variant="contained" onClick={handleSubmit}>
            {location.state != null ? 'Update Employee' : 'Add Employee'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Addemployee;
