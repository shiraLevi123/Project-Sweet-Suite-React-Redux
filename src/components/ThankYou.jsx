import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function ThankYou() {
  // קבלת נתוני התשלום מ-location
  const location = useLocation();
  const { paymentData } = location.state || {}; // קבלת נתונים שנשלחו
  const mySuite = useSelector((state) => state.suite.mySuite); // פרטי הסוויטה
  const myProfile = useSelector((state) => state.customer.currentCustomer); // פרטי המשתמש (אם יש)

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Thank You for Your Booking!
      </Typography>

      {/* פרטי המשתמש */}
      <Box sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        boxShadow: 2,
        marginBottom: 3
      }}>
        <Typography variant="h6" color="secondary">
          User Profile:
        </Typography>
        <Typography>
          <strong>Name:</strong> {myProfile.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {myProfile.email}
        </Typography>
      </Box>

      {/* פרטי התשלום */}
      <Box sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        boxShadow: 2,
        marginBottom: 3
      }}>
        <Typography variant="h6" color="secondary">
          Booking Details:
        </Typography>
        <Typography>
          <strong>Card Number:</strong> **** **** **** {paymentData.cardNumber.slice(-4)}
        </Typography>
        <Typography>
          <strong>Expiry Date:</strong> {paymentData.expiryMonth}/{paymentData.expiryYear}
        </Typography>
        <Typography>
          <strong>ID Number:</strong> {paymentData.idNumber}
        </Typography>
      </Box>

      <Divider sx={{ margin: '20px 0' }} />

      {/* פרטי הסוויטה */}
      <Box sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        boxShadow: 2
      }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Suite Details:
        </Typography>
        <Typography><strong>Suite Number:</strong> {mySuite.numberBeds} Beds</Typography>
        <Typography><strong>Rating:</strong> {mySuite.rating} / 5</Typography>
        <Typography><strong>Price Per Night:</strong> {mySuite.pricePerNight} ₪</Typography>
        <Typography><strong>City:</strong> {mySuite.city}</Typography>
        <Typography><strong>Address:</strong> {mySuite.address}</Typography>
        <Typography><strong>Pool:</strong> {mySuite.pool ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Jacuzzi:</strong> {mySuite.jacuzzi ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Wifi:</strong> {mySuite.wifi ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Sea View:</strong> {mySuite.seaView ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Parking:</strong> {mySuite.parking ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Air Conditioning:</strong> {mySuite.airConditioning ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Kitchen Facilities:</strong> {mySuite.kitchenFacilities ? 'Yes' : 'No'}</Typography>
        <Typography><strong>TV:</strong> {mySuite.tv ? 'Yes' : 'No'}</Typography>
      </Box>
    </Box>
  );
}
