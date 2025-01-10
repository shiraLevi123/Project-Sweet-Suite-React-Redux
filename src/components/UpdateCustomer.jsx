import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../slice/customerSlice';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";

const UpdateCustomer = ({onClose}) => {
  const dispatch = useDispatch();
  const currentCustomer = useSelector((state) => state.customer.currentCustomer);
  const loading = useSelector((state) => state.customer.loading);
  const error = useSelector((state) => state.customer.error);

  // אתחול השדות אם קיימים נתונים מהלקוח הנוכחי
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  // אתחול השדות עם הערכים הקיימים
  useEffect(() => {
    if (currentCustomer) {
      setName(currentCustomer.name);
      setEmail(currentCustomer.email);
      setPassword(currentCustomer.password);
    }
  }, [currentCustomer]);

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    setFile(file);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    // יצירת אובייקט עם הנתונים החדשים
    const updatedCustomer = {  id: currentCustomer.id, name, email, password};
    const formData = new FormData();
    formData.append("customer", new Blob([JSON.stringify(updatedCustomer)], { type: "application/json" }))// JSON  );
    if(file){
        formData.append('image', file);
    }
    formData.append('id', currentCustomer.id);
    const res = await dispatch(update({id: currentCustomer.id, formData}))
    if(res.meta.requestStatus === "fulfilled"){
      onClose();
    }

    // dispatch(update({ customerData: updatedCustomer, id: currentCustomer.id }));
  };
  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        עדכון הפרטים שלי
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
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
          {file && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              קובץ נבחר: {file.name}
            </Typography>
          )}
        </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
         // value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

<Button
  type="submit"
  variant="contained"
  sx={{
    backgroundColor: "#B3E5FC", 
    color: "#ffffff",
    textTransform: "uppercase",
    boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.4)", 
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#4fc3f7", 
    },
    fullWidth: true, 
    mt: 2,
    borderRadius: "20px", 
  }}
  disabled={loading}
>
  {loading ? "Updating..." : "עדכון"}
</Button>

      </form>
    </Box>
  );
};

export default UpdateCustomer;
