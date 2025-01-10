import { addSuiteThunk } from "../slice/suiteSlice";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Rating,
  Button,
  Box,
  Grid,
} from "@mui/material";

const SuiteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: '',
    address: '',
    pool: false,
    jacuzzi: false,
    wifi: false,
    seaView: false,
    parking: false,
    airConditioning: false,
    kitchenFacilities: false,
    tv: false,
    rating: 1,
    pricePerNight: 1000,
    numberBeds: 2
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the addSuiteThunk and await its completion
      await dispatch(addSuiteThunk(formData)).unwrap();
      navigate('/suitDisplay');
    } catch (error) {
      console.error("Error adding suite:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: "16px" }}>
      <Grid container spacing={4}>
        {/* עמודת שדות קלט */}
        <Grid item xs={12} md={6}>
          {/* שדה עיר */}
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
              variant="outlined"
            />
          </FormControl>

          {/* שדה כתובת */}
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              variant="outlined"
            />
          </FormControl>

          {/* דירוג */}
          <FormControl component="fieldset" margin="normal">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              size="large"
            />
          </FormControl>

          {/* מחיר ללילה */}
          <FormControl fullWidth margin="normal">
            <TextField
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight}
              min="900"
              max="12000"
              step="10"
              onChange={handleChange}
              label="Price per Night"
              variant="outlined"
            />
          </FormControl>

          {/* מספר מיטות */}
          <FormControl fullWidth margin="normal">
            <TextField
              type="number"
              name="numberBeds"
              value={formData.numberBeds}
              min="2"
              max="4"
              step="2"
              onChange={handleChange}
              label="Number of Beds"
              variant="outlined"
            />
          </FormControl>
        </Grid>

        {/* עמודת Checkboxes */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Features</FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "בריכה", name: "pool" },
                { label: "ג'קוזי", name: "jacuzzi" },
                { label: "Wifi", name: "wifi" },
                { label: "נוף לים", name: "seaView" },
                { label: "חניה", name: "parking" },
                { label: "מזגן", name: "airConditioning" },
                { label: "מטבח", name: "kitchenFacilities" },
                { label: "טלוויזיה", name: "tv" },
              ].map(({ label, name }) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      name={name}
                      checked={formData[name]}
                      onChange={handleChange}
                    />
                  }
                  label={label}
                />
              ))}
            </Box>
          </FormControl>
        </Grid>
      </Grid>

      {/* כפתור הוספת סוויטה */}
      <Box sx={{ textAlign: "center", marginTop: "16px" }}>
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
          הוסף סוויטה
        </Button>

      </Box>
    </Box>
  );
};

export default SuiteForm;