import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendMailData } from '../slice/mailSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Pay() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    idNumber: '',
  });
  const suiteForm = useSelector((state) => state.suite.mySuite);
  const currentCustomer = useSelector((state) => state.customer.currentCustomer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const formMail = {
      recipient: currentCustomer.email,
      msgBody: `
      
      תודה על הזמנתך!
      
      אנו שמחים לאשר את הזמנתך עבור סוויטה מספר: ${suiteForm.id}. 
      הסוויטה נמצאת בעיר ${suiteForm.city}, בכתובת ${suiteForm.address}. 
      הסוויטה כוללת את כל השירותים הנדרשים להנאתך:
      
      - בריכה: ${suiteForm.pool ? "✅" : "❌"}
      - ג'קוזי: ${suiteForm.jacuzzi ? "✅" : "❌"}
      - אינטרנט אלחוטי: ${suiteForm.wifi ? "✅" : "❌"}
      - נוף לים: ${suiteForm.seaView ? "✅" : "❌"}
      - חניה: ${suiteForm.parking ? "✅" : "❌"}
      - מיזוג אוויר: ${suiteForm.airConditioning ? "✅" : "❌"}
      - מתקני מטבח: ${suiteForm.kitchenFacilities ? "✅" : "❌"}
      - טלוויזיה: ${suiteForm.tv ? "✅" : "❌"}
      
      הדירוג הכולל של הסוויטה: ${suiteForm.rating} כוכבים
      מחיר ללילה: ${suiteForm.pricePerNight} ₪
      
      מספר מיטות בסוויטה: ${suiteForm.numberBeds}
      
      אנו מקווים שתהיה לך שהות נעימה, ונשמח לראותך שוב בקרוב!
      
      בברכה,  
      צוות SWEET SUITE🍭
      `

      ,
      subject: `שלום ${currentCustomer.name} 😊,  תודה על הזמנתך`,
      attachment: ""
    }
    dispatch(sendMailData(formMail))
    navigate('/thank-you', {
      state: { paymentData },
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        שלם עכשיו
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

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

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                paddingX: 5,
                paddingY: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                alignSelf: "center",
                borderRadius: 25,
                backgroundColor: "#B3E5FC", 
                color: "#ffffff",
                textTransform: "uppercase",
                boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.4)", 
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#4fc3f7",
                  transform: "scale(1.05)",
                },
              }}
            >
              בצע תשלום
            </Button>

          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
