

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSuitesServer, searchSuitesServer } from "../service/suiteService";

// פונקציה להורדת כל הסוויטות
export const getAllSuites = createAsyncThunk('suites/getAll', async () => {
    const suites = await getAllSuitesServer();
    return suites;
});

// פונקציה לחיפוש סוויטות לפי קריטריונים
export const searchSuites = createAsyncThunk('suites/search', async (filters) => {
    const suites = await searchSuitesServer(filters);
    return suites;
});


const suiteSlice = createSlice({
    name: 'suite',
    initialState: {
        allSuites: [],
        mySuite: null,  // או פרטי סוויטה ריקים
        searchResults: [], // תוצאות חיפוש
        loading: false,
        error: null,
    },
    reducers: {
        setMySuite: (state, action) => {
            state.mySuite = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // מקרה אם כל הסוויטות הושלמו בהצלחה
            .addCase(getAllSuites.fulfilled, (state, action) => {
                state.allSuites = action.payload;
                state.loading = false;
            })
            // מקרה אם כל הסוויטות לא הושלמו
            .addCase(getAllSuites.rejected, (state) => {
                state.loading = false;
                state.error = 'הפעלת getAllSuites נכשלה';
            })
            // מקרה אם כל הסוויטות עדיין נטענות
            .addCase(getAllSuites.pending, (state) => {
                state.loading = true;
            })
            
            // מקרה אם החיפוש הושלם בהצלחה
            .addCase(searchSuites.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.loading = false;
            })
            // מקרה אם החיפוש לא הושלם
            .addCase(searchSuites.rejected, (state) => {
                state.loading = false;
                state.error = 'הפעלת searchSuites נכשלה';
            })
            // מקרה אם החיפוש עדיין בסטטוס טעינה
            .addCase(searchSuites.pending, (state) => {
                state.loading = true;
            });
    
        }

});
export const { setMySuite } = suiteSlice.actions;

export default suiteSlice.reducer;
