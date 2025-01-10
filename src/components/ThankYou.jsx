import React from 'react';
import { Box, Typography, Divider, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();
  const { paymentData } = location.state || {};
  const mySuite = useSelector((state) => state.suite.mySuite);
  const myProfile = useSelector((state) => state.customer.currentCustomer);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        תודה על הזמנתך
      </Typography>

      <Box sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        boxShadow: 2,
        marginBottom: 3
      }}>
        <Typography variant="h6" color="secondary">
          שם משתמש:
        </Typography>
        <Typography>
          <strong>שם:</strong> {myProfile.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {myProfile.email}
        </Typography>
      </Box>

      <Box sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        boxShadow: 2,
        marginBottom: 3
      }}>
        <Typography variant="h6" color="secondary">
          פרטי הזמנה:
        </Typography>
        <Typography>
          <strong>חיוב כרטיס: </strong> **** **** **** {paymentData.cardNumber.slice(-4)}
        </Typography>
        <Typography>
          <strong>בתאריך: </strong> {paymentData.expiryMonth}/{paymentData.expiryYear}
        </Typography>
        <Typography>
          <strong>מ.ז:</strong> {paymentData.idNumber}
        </Typography>
      </Box>

      <Divider sx={{ margin: '20px 0' }} />

      <Box sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        boxShadow: 2
      }}>
        <Typography variant="h6" color="secondary" gutterBottom>
         פרטי סוויטה
        </Typography>
        <Typography><strong>Suite Number:</strong> {mySuite.id}</Typography>
        <div>
          <Typography>
            <Rating
              name="suite-rating"
              value={mySuite.rating} // הכנס את הדירוג כאן
              readOnly // אם לא רוצים שתהיה אפשרות לשנות את הדירוג
            />
          </Typography>
        </div>

        <Typography><strong>ב:</strong> {mySuite.city}</Typography>
        <Typography><strong>בכתובת:</strong> {mySuite.address}</Typography>
        <Typography><strong>מחיר ללילה:</strong> {mySuite.pricePerNight} ₪</Typography>
        <Typography><strong>בריכה:</strong> {mySuite.pool ? 'כן' : 'לא'}</Typography>
        <Typography><strong>ג'קוזי:</strong> {mySuite.jacuzzi ? 'כן' : 'לא'}</Typography>
        <Typography><strong>Wifi:</strong> {mySuite.wifi ? 'כן' : 'לא'}</Typography>
        <Typography><strong>נוף לים :</strong> {mySuite.seaView ? 'כן' : 'לא'}</Typography>
        <Typography><strong>חניה:</strong> {mySuite.parking ? 'כן' : 'No'}</Typography>
        <Typography><strong>מזגן :</strong> {mySuite.airConditioning ? 'כן' : 'לא'}</Typography>
        <Typography><strong> מטבח מאובזר:</strong> {mySuite.kitchenFacilities ? 'Yes' : 'לא'}</Typography>
        <Typography><strong>טלוויזיה:</strong> {mySuite.tv ? 'כן' : 'לא'}</Typography>
        <Typography><strong>מספר מיטות:</strong> {mySuite.numberBeds}</Typography>
      </Box>
      
    </Box>
  );
}
