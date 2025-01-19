import React,  { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInterceptor';

const Signup = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };


    const handleSubmit = async () =>{
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axiosInstance.post('http://localhost:3000/users/adduser', form);
            alert(response.data);
            setForm({ email: '', password: '', confirmpassword:''}); // Reset form
            navigate('/'); 
          } catch (error) {
            alert('Failed to Signup. Please try again.');
            console.error(error);
          }
    }
  return (
    <div style={{margin:'8%'}}>
        <Grid container spacing={2}>
            <Grid  size={{ xs: 6, md: 6 }}>
                <TextField fullWidth label='Email' name="email" onChange={handleChange} variant='outlined'></TextField>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
                <TextField fullWidth label='Password' name="password" type="password" onChange={handleChange}  variant='outlined'></TextField>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
                <TextField fullWidth label='Confirm Password'name="confirmPassword" type="password" onChange={handleChange} variant='outlined'></TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Button color="secondary" variant='contained' onClick={handleSubmit}>Register</Button>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Link to={'/'} style={{color: 'purple'}}>Already Registered? Login here</Link>
            </Grid>
        </Grid>
    </div>
  )
}

export default Signup