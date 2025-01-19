import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Home = () => {

    const [cardData,setData] = useState([]);
    const navigate = useNavigate();
    const role = sessionStorage.getItem('role');
    
    useEffect(() =>{
        axiosInstance.get('http://localhost:3000/employees').then((res) =>{
            setData(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    function update_data(val){
        navigate('/addemployee',{state:{val}})
        //state is a keyword
    }

    const delete_data = (id) => {
        axiosInstance.delete(`http://localhost:3000/employees/deleteemployee/${id}`)
          .then(() => {
            setData(cardData.filter((item) => item._id !== id)); // Update the UI after deletion
            alert("Employee deleted successfully");
            navigate('/employees'); // Navigate back to the Home page
          })
          .catch((err) => {
            console.log(err);
            alert("Failed to delete employee");
          });
      };


  return (
    <div style={{margin:'5%'}}>
        <Grid container spacing={2}>
            {cardData.map((row) => (
            <Grid size={4}>
            <Card sx={{ maxWidth: 345 }}>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {row.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.designation}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.salary}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.department}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.emplocation}
                    </Typography>
                </CardContent>
                {role == 'Admin' && (
                <CardActions>
                    <Button size="small" color='warning' variant='contained'onClick={(()=>{update_data(row);})}>Update</Button>
                    <Button size="small" color='error' variant='contained' onClick={() => delete_data(row._id)}>Delete</Button>
                </CardActions>
                )}
            </Card>
            </Grid>
            ))}
        </Grid>
        
    </div>
  )
}

export default Home