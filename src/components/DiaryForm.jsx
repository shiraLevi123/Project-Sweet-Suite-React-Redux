import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDiaryEntryAsync } from '../slice/diarySlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const DiaryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.diary);
  const { suiteId } = useParams();

  console.log("useParams()", useParams());

  console.log("suiteId", suiteId);
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // בדיקת שדות חובה
    if (!diaryData.checkIn || !diaryData.checkOut) {
      setFormError('נא למלא את כל השדות');
      return;
    }

    // בדיקה אם תאריך הצ'ק-אין לא גדול מצ'ק-אאוט
    if (new Date(diaryData.checkIn) >= new Date(diaryData.checkOut)) {
      setFormError('תאריך צ\'ק-אאוט צריך להיות אחרי תאריך צ\'ק-אין');
      return;
    }
    // שליחה ל-redux
    dispatch(createDiaryEntryAsync(diaryData));
    navigate("/Pay");


    // מחיקת שגיאה אחרי שליחה
    setFormError('');
  };
  const handleApiError = (error) => {
    if (error.response) {
      console.log("API Error Response:", error.response);
      setFormError(`הייתה שגיאה: ${error.response.status} - ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      console.log("No response received:", error.request);
      setFormError('השרת לא החזיר תשובה');
    } else {
      console.log("Error setting up request:", error.message);
      setFormError('אירעה שגיאה במהלך הגדרת הבקשה');
    }
  };

  useEffect(() => {
    if (error) {
      handleApiError(error);  // טיפול בשגיאה בצורה מפורטת
      setTimeout(() => {
        setFormError('');
      }, 3000);
    }
  }, [error]);



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>תאריך צ'ק-אין:</label>
          <input
            type="date"
            name="checkIn"
            value={diaryData.checkIn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>תאריך צ'ק-אאוט:</label>
          <input
            type="date"
            name="checkOut"
            value={diaryData.checkOut}
            onChange={handleChange}
          />
        </div>
        {formError && <p>{formError}</p>} {/* הצגת שגיאה רק לזמן קצר */}
        <button type="submit">שלח</button>
      </form>


      {status === 'loading' && <p>טוען...</p>}
      {status === 'failed' && <p>הייתה שגיאה: {error}</p>}
      {status === 'succeeded' && <p>היומן נוסף בהצלחה!</p>}
    </div>
  );
};

export default DiaryForm;
