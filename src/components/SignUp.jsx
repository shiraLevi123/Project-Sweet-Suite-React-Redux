import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../slice/customerSlice";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [formCustomer, setFormCustomer] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleFileChange = (e) => {

    const file = e.target.files[0];
    setFile(file);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormCustomer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("customer", new Blob([JSON.stringify(formCustomer)], { type: "application/json" }))// JSON  );
    formData.append('image', file);
    dispatch(signUp(formData))
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        console.log("שגיאה בהעלאת משתמש:", error);
      });

  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        הירשם
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="שם"
          name="name"
          type="text"
          fullWidth
          value={formCustomer.name}
          onChange={handleChange}
          sx={{
            marginBottom: 2,
            direction: 'rtl', 
            backgroundColor: 'transparent',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#b3e5fc', 
                borderWidth: 2,
              },
              '&.Mui-focused fieldset': {
                borderColor: '#b3e5fc', 
                borderWidth: 2, 
              },
            },
          }}
        />

        <TextField
          label="מייל"
          name="email"
          type="email"
          fullWidth
          value={formCustomer.email}
          onChange={handleChange}
          sx={{
            marginBottom: 2,
            direction: 'rtl', 
            backgroundColor: 'transparent',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#b3e5fc', 
                borderWidth: 2,
              },
              '&.Mui-focused fieldset': {
                borderColor: '#b3e5fc', 
                borderWidth: 2, 
              },
            },
          }}
        />

        <TextField
          label="סיסמא"
          name="password"
          type="password"
          fullWidth
          value={formCustomer.password}
          onChange={handleChange}
          sx={{
            marginBottom: 2,
            direction: 'rtl',
            backgroundColor: 'transparent', 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#b3e5fc', 
                borderWidth: 2,
              },
              '&.Mui-focused fieldset': {
                borderColor: '#b3e5fc', 
                borderWidth: 2, 
              },
            },
          }}
        />


        <Box sx={{ marginBottom: 2, width: '100%' }}>
          <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
            העלה תמונה
          </Typography>
          <Button
            variant="outlined"
            component="label"
            sx={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              borderWidth: 2,
              color: '#b3e5fc',
              borderColor: '#b3e5fc',
              '&:hover': {
                backgroundColor: '#e1f5fe',
              },
            }}
          >
            בחר קובץ
            <input
              type="file"
              onChange={handleFileChange}
              hidden
            />
          </Button>
          {formCustomer.file && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              קובץ נבחר: {formCustomer.file.name}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: '#b3e5fc',
            padding: '6px 16px',
            fontSize: '15px',
            height: '40px',
          }}
        >
          הירשם
        </Button>

      </form>
    </Box>
  );
};

export default SignUp;