import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/customerSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { currentCustomer, loading, error } = useSelector((state) => state.customer);

  // const { loading, error } = useSelector((state) => state.customer);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      // קריאה לפעולה והמתנה לתוצאה
      const response = await dispatch(login(loginData)).unwrap();
      console.log("Login successful:", response);

      navigate("/"); // ניתוב לאחר התחברות מוצלחת
    } catch (err) {
      console.error("Login error:", err);

      // טיפול בשגיאה לפי הערכים המוחזרים
      switch (err.status) {
        case 400:
          setErrorMessage("יש למלא את הנתונים");
          break;
        case 401:
          setErrorMessage("סיסמה שגויה");
          break;
        default:
          setErrorMessage("שגיאה לא צפויה. נסה שוב מאוחר יותר.");
      }
    }
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
        direction: 'rtl',
        borderWidth: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        כניסה
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
        <>
          <TextField
            label="מייל"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: 2,
              direction: 'rtl', // כיוון טקסט מימין לשמאל
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b3e5fc', // צבע המסגרת תמיד תכלת
                  borderWidth: '2px', // רוחב המסגרת 2px
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#b3e5fc', // צבע המסגרת תכלת גם כשיש פוקוס
                },
              },
            }}
          />

          <TextField
            label="סיסמא"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 2,
              direction: 'rtl', // כיוון טקסט מימין לשמאל
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b3e5fc', // צבע המסגרת תמיד תכלת
                  borderWidth: '2px', // רוחב המסגרת 2px
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#b3e5fc', // צבע המסגרת תכלת גם כשיש פוקוס
                  borderWidth: '2px', // רוחב המסגרת 2px גם בפוקוס
                },
              },
            }}
          />


          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              marginBottom: 2,
              backgroundColor: '#b3e5fc',
              padding: '6px 16px',
              //fontSize: '15px',
              height: '40px',
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: '#b3e5fc',
              },
            }}
          >
            {loading ? <CircularProgress size={20} /> : 'התחבר'}
          </Button>
        </>
      </form>

      <Typography variant="body2" color="textSecondary">
        אם עדיין אין לך חשבון <a href="/signup">הירשם כעת</a>
      </Typography>
    </Box>
  );

};

export default Login;