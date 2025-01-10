import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Button } from "@mui/material";
import UpdateCustomer from "./UpdateCustomer";
import './Profile.css';

const Profile = () => {
    const { currentCustomer } = useSelector((state) => state.customer);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        if (currentCustomer.image) {
            setImage(currentCustomer.image);
        }
    }, [currentCustomer.image]);

    return (
        <div className="profile-container">
          <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#7bd0f8' }}>Sweet Profile 🍭</h1>
          <div className="profile-box">
          <div className="profile-details">
            <p><strong>NAME:</strong> {currentCustomer.name}</p>
            <p><strong>EMAIL:</strong> {currentCustomer.email}</p>
          </div>
    
          <div className="profile-image-container">
            {currentCustomer.image ? (
              <img
                src={`data:image/jpeg;base64,${currentCustomer.image}`}
                alt="Customer Profile"
                className="customer-image"
              />
            ) : (
              <p className="error-message">לא נמצאה תמונה</p>
            )}
          </div>
    
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: '#b3e5fc',
              padding: '8px 20px',
              fontSize: '16px',
              minWidth: '150px',
              height: '45px',
              marginTop: '20px',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#81d4fa',
              },
            }}
          >
            עדכון הפרופיל שלי
          </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="update-customer-modal"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}
            >
              <UpdateCustomer  onClose={handleClose} />
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: "#B3E5FC",
                color: "#ffffff", 
                textTransform: "uppercase",
                boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.4)", 
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#4fc3f7", 
                  },
                  mt: 2,
                  borderRadius: '20px', 
                }}
              >
                סגירה
              </Button>
            </Box>
          </Modal>
        </div>
      );
    };
    
    export default Profile;