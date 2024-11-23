// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createDiaryEntry } from '../service/diaryService'
// // פעולה אסינכרונית
// export const createDiaryEntryAsync = createAsyncThunk(
//   'diary/createDiaryEntry', // שם הפעולה
//   async (diaryData, { rejectWithValue }) => {
//     try {
//       const response = await createDiaryEntry(diaryData); // שלח את הנתונים לאחור
//       return response;  // אם הצליח, מחזיר את התוצאה
//     } catch (error) {
//       return rejectWithValue(error.response.data); // אם יש שגיאה, החזר את השגיאה
//     }
//   }
// );

// const diarySlice = createSlice({
//   name: 'diary',
//   initialState: {
//     diaryEntries: [],
//     status: 'idle', // idle | loading | succeeded | failed
//     error: null,
//   },
//   reducers: {
//     // כל פעולה סינכרונית אחרת אם יש צורך
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createDiaryEntryAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createDiaryEntryAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.diaryEntries.push(action.payload);  // הוסף את הערך שהתקבל
//       })
//       .addCase(createDiaryEntryAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;  // הצגת השגיאה
//       });
//   },
// });

// export default diarySlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDiaryEntry } from '../service/diaryService';

// פעולה אסינכרונית לשליחת נתוני היומן
export const createDiaryEntryAsync = createAsyncThunk('diary/createDiaryEntry',
    async (diaryData, { rejectWithValue }) => {
        try {
            const response = await createDiaryEntry(diaryData); // שלח את הנתונים לשרת
            return response;  // אם הצליח, מחזיר את התוצאה
        } catch (error) {
            // אם יש שגיאה, החזר את פרטי השגיאה
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        diaryEntries: [],   // רשימה של כל הכניסות ליומן
        status: 'idle',      // מצב פעולתה: idle | loading | succeeded | failed
        error: null,         // שדה לשגיאות
    },
    reducers: {
        // כל פעולה סינכרונית נוספת אם יש צורך
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDiaryEntryAsync.pending, (state) => {
                state.status = 'loading';  // מצב טוען
            })
            .addCase(createDiaryEntryAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'; // הצלחה
                state.diaryEntries.push(action.payload);  // הוסף את הכניסה החדשה
            })
            .addCase(createDiaryEntryAsync.rejected, (state, action) => {
                state.status = 'failed';    // נכשל
                state.error = action.payload || action.error.message; // הצגת השגיאה
            });
    },
});

export default diarySlice.reducer;
