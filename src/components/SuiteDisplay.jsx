import React, { useEffect } from "react";
import { getAllSuites, setMySuite, deleteSuiteThunk } from "../slice/suiteSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Box, Rating } from '@mui/material';
import "./SuiteDisplay.css";
import { useNavigate } from "react-router-dom";

const SuiteDisplay = () => {
  const dispatch = useDispatch();
  const { allSuites, loading } = useSelector((state) => state.suite);
  const { currentCustomer } = useSelector((state) => state.customer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllSuites());
  }, [dispatch]);


  if (loading) return <>הדף נטען...</>;

  const suites = Array.isArray(allSuites) ? allSuites : [];

  const handleCommentClick = (suiteId) => {
    dispatch(setMySuite(suiteId));
    navigate('/comment')
  };
  const handleDeleteSuiteClick = (id) => {
    dispatch(deleteSuiteThunk(id))

  };

  return (
    <div>
      <div className="suites-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {suites.map((suite) => (
          <Card
            key={suite.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              padding: '40px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '2px solid #7bd0f8', 
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              marginTop: '20px', 
              marginBottom: '20px',
              textAlign: 'center',

            }}
          >
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                <Rating value={suite.rating} readOnly precision={0.5} />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                מחיר ללילה: ₪{suite.pricePerNight}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                מספר מיטות: {suite.numberBeds}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                עיר: {suite.city}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                כתובת: {suite.address}
              </Typography>

              <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <Button
                  variant="contained"
                  onClick={() => handleCommentClick(suite.id)}
                  sx={{
                    flexGrow: 1,
                    backgroundColor: "#B3E5FC", 
                    color: "#ffffff", 
                    textTransform: "uppercase", 
                    boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.4)", 
                    transition: "background-color 0.3s ease, transform 0.2s ease", // מעבר רך
                    "&:hover": {
                      backgroundColor: "#4fc3f7",
                    },
                  }}

                >
                  צפייה בתגובות והוספת תגובה
                </Button>


                {currentCustomer?.name === "manager" && (
                  <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteSuiteClick(suite.id)}
                  sx={{
                    flexGrow: 1,
                    borderColor: '#d32f2f', // צבע מסגרת אדום
                    color: '#d32f2f', // צבע טקסט אדום
                    backgroundColor: 'transparent', // רקע שקוף
                    '&:hover': {
                      backgroundColor: '#d32f2f', // צבע אדום בעת hover
                      color: 'white', // צבע טקסט לבן בעת hover
                      borderColor: '#d32f2f', // צבע מסגרת אדום גם בעת hover
                    },
                    fontSize: '1rem',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    textTransform: 'none', // מונע את ההפיכה לאותיות רישיות
                  }}
                >
                  מחיקת סוויטה
                </Button>
                
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default SuiteDisplay;
