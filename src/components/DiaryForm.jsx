import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDiaryEntryAsync } from '../slice/diarySlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";

const DiaryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.diary);
  const { suiteId } = useParams();

  // מצב שדות הטופס
  const [diaryData, setDiaryData] = useState({
    suiteId: +suiteId,
    checkIn: '',
    checkOut: '',
  });

  // מצב שגיאה לטופס
  const [formError, setFormError] = useState('');

  // עדכון שדות הטופס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // שליחת הטופס
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!diaryData.checkIn || !diaryData.checkOut) {
      setFormError('נא למלא את כל השדות');
      return;
    }

    if (new Date(diaryData.checkIn) >= new Date(diaryData.checkOut)) {
      setFormError('תאריך צ\'ק-אאוט צריך להיות אחרי תאריך צ\'ק-אין');
      return;
    }

    try {
      await dispatch(createDiaryEntryAsync(diaryData)).unwrap(); 
      navigate("/Pay");
      setFormError('');
    } catch (error) {
      console.error('Error:', error);
      setFormError('אירעה שגיאה בשליחת הנתונים');
    }


    setFormError('');
  };
  const handleApiError = (error) => {
    if (error.response) {
      setFormError(`הייתה שגיאה: ${error.response.status} - ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      setFormError('השרת לא החזיר תשובה');
    } else {
      setFormError('אירעה שגיאה במהלך הגדרת הבקשה');
    }
  };

  useEffect(() => {
    if (error) {
      handleApiError(error);
      setTimeout(() => {
        setFormError('');
      }, 3000);
    }
  }, [error]);


  return (
    <Box
      component="div"
      sx={{
        maxWidth: 500,
        margin: "50px auto",
        padding: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          marginBottom: 3,
          color: "#4FCCF7~",
          fontWeight: "bold",
        }}
      >
        תאריך שהייה
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="תאריך צ'ק-אין"
          type="date"
          name="checkIn"
          value={diaryData.checkIn}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />
        <TextField
          label="תאריך צ'ק-אאוט"
          type="date"
          name="checkOut"
          value={diaryData.checkOut}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />
        {formError && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center", fontStyle: "italic" }}
          >
            {formError}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            paddingX: 5,
            paddingY: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            alignSelf: "center",
            borderRadius: 25,
            backgroundColor: "#4fc3f7",
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
          שלח
        </Button>
      </Box>

      {/* סטטוסים */}
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 3,
          }}
        >
          <CircularProgress size={30} />
        </Box>
      )}
      {status === "failed" && (
        <Typography
          variant="body2"
          color="error"
          sx={{
            textAlign: "center",
            marginTop: 3,
            fontWeight: "bold",
          }}
        >
          הייתה שגיאה: {error}
        </Typography>
      )}
    </Box>
  );
};

export default DiaryForm;