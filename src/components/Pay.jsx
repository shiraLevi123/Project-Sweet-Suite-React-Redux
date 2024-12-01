import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Pay() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '1234123412341234',
    expiryMonth: '12',
    expiryYear: '25',
    cvc: '123',
    idNumber: '215774282',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // מבצעים אימותים על כל שדה
    let newValue = value;

    if (name === 'cardNumber' && value.length > 16) {
      newValue = value.slice(0, 16); // מבטיח רק 16 ספרות
    }

    if (name === 'cvc' && value.length > 3) {
      newValue = value.slice(0, 3); // מבטיח רק 3 ספרות בCVC
    }

    if (name === 'idNumber' && value.length > 9) {
      newValue = value.slice(0, 9); // מבטיח רק 9 ספרות בתעודת זהות
    }

    if (/[^0-9]/.test(value)) {
      newValue = value.replace(/[^0-9]/g, ''); // מסנן רק ספרות
    }

    if (name === 'expiryDate') {
      // מאמתים תאריך נכון בפורמט MM/YY
      if (value.length === 2 && !value.includes('/')) {
        newValue = `${value.slice(0, 2)}/`; // מוסיף '/' לאחר שני התוויים הראשונים
      }
    }

    setPaymentData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל להוסיף את הקוד לשלוח את הנתונים לשרת או לבצע את התשלום
    console.log('Payment Data:', paymentData);
    navigate('/thank-you', {
      state: { paymentData }, // ניתן לשלוח נתונים בעזרת state
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Pay Now
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* שדה מספר כרטיס אשראי */}
          <Grid item xs={12}>
            <TextField
              label="Card Number"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 16 }} // מקסימום 16 ספרות
            />
          </Grid>

          {/* שדה תאריך תפוגה */}
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel>Month</InputLabel>
              <Select
                name="expiryMonth"
                value={paymentData.expiryMonth}
                onChange={handleChange}
                label="Month"
              >
                {[...Array(12)].map((_, index) => (
                  <MenuItem key={index} value={String(index + 1).padStart(2, '0')}>
                    {String(index + 1).padStart(2, '0')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel>Year</InputLabel>
              <Select
                name="expiryYear"
                value={paymentData.expiryYear}
                onChange={handleChange}
                label="Year"
              >
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index} value={String(new Date().getFullYear() + index).slice(-2)}>
                    {String(new Date().getFullYear() + index).slice(-2)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* שדה CVC */}
          <Grid item xs={6}>
            <TextField
              label="CVC"
              name="cvc"
              type="password"
              value={paymentData.cvc}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 3 }} // מקסימום 3 ספרות
            />
          </Grid>

          {/* שדה תעודת זהות */}
          <Grid item xs={12}>
            <TextField
              label="ID Number"
              name="idNumber"
              value={paymentData.idNumber}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 9 }} // מקסימום 9 ספרות
            />
          </Grid>

          {/* כפתור שליחה */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Complete Payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
