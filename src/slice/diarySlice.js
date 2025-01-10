import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDiaryEntry, getDiaries } from '../service/diaryService';

// פעולה אסינכרונית לשליחת נתוני היומן
export const createDiaryEntryAsync = createAsyncThunk('diary/createDiaryEntry',
    async (diaryData, { rejectWithValue }) => {
        try {
            const response = await createDiaryEntry(diaryData); 
            return response;  
        } catch (error) {
            return rejectWithValue('לצערנו סוויטה זאת תפוסה בתאריך שהזנת, אנא בחר תאריך אחר או סוויטה אחרת',error.response ? error.response.data : error.message);
        }
    }
);

export const getDiariesAsync = createAsyncThunk('diary/getDiariesAsync', async () => {
    try {
        const response = await getDiaries(); 
        return response;  
    } catch (error) {
       console.log('failed get all diaries');
    }
});


const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        diaryEntries: [],   
        status: 'idle',      // מצב פעולתה: idle | loading | succeeded | failed
        error: null,         
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDiaryEntryAsync.pending, (state) => {
                state.status = 'loading';  
            })
            .addCase(createDiaryEntryAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.diaryEntries.push(action.payload); 
            })
            .addCase(createDiaryEntryAsync.rejected, (state, action) => {
                state.status = 'failed'; 
                state.error = action.payload || action.error.message; 

            })
            .addCase(getDiariesAsync.fulfilled, (state, action) => {
                state.diaryEntries=action.payload;
                state.loading = false;
            })
            .addCase(getDiariesAsync.pending, (state) => {
                state.status = 'loading';  // מצב טוען
            })
            .addCase(getDiariesAsync.rejected, (state, action) => {
                state.status = 'failed';  // נכשל
                state.error = action.error.message; // הצגת השגיאה
            })

    },
});

export default diarySlice.reducer;
