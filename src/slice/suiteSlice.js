import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSuitesServer, searchSuitesServer, deleteSuiteService, addSuiteServer } from "../service/suiteService";

// פונקציה לקבלת כל הסוויטות
export const getAllSuites = createAsyncThunk('suites/getAll', async () => {
    const suites = await getAllSuitesServer();
    return suites;
});

// פונקציה לחיפוש סוויטות לפי קריטריונים
export const searchSuites = createAsyncThunk('suites/search', async (filters) => {
    const suites = await searchSuitesServer(filters);
    return suites;
});

export const addSuite = createAsyncThunk("suites/addSuite",
    async (suiteData) => {
        const response = await axios.post("http://localhost:8080/api/suites", suiteData)
        return response.data;
    })

export const deleteSuiteThunk = createAsyncThunk('suites/deleteSuite', async (suiteId, { rejectWithValue }) => {
    try {
        const s = await deleteSuiteService(suiteId);
        return s;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error deleting suite');
    }
})

export const addSuiteThunk = createAsyncThunk('suites/addSuite', async (formData, { rejectWithValue }) => {
    try {
        const newSuite = await addSuiteServer(formData);
        return newSuite;
    } catch (error) {
        console.error("Failed to add suite:", error);
        return rejectWithValue(error.response.data);
    }
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
            .addCase(getAllSuites.fulfilled, (state, action) => {
                state.allSuites = action.payload;
                state.loading = false;
            })
            .addCase(getAllSuites.rejected, (state) => {
                state.loading = false;
                state.error = 'הפעלת getAllSuites נכשלה';
            })
            .addCase(getAllSuites.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchSuites.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.loading = false;
            })
            .addCase(searchSuites.rejected, (state) => {
                state.loading = false;
                state.error = 'הפעלת searchSuites נכשלה';
            })
            .addCase(searchSuites.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSuiteThunk.fulfilled, (state, action) => {
                state.allSuites.push(action.payload);
                state.loading = false;
            })
            .addCase(addSuiteThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSuite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteSuiteThunk.fulfilled, (state, action) => {
                state.allSuites = state.allSuites.filter((suite) => suite.id !== action.meta.arg);
             //   state.allSuites = state.allSuites.filter((suite) => suite.id !== action.payload.id);

            });


    }

});
export const { setMySuite, deleteSuite } = suiteSlice.actions;

export default suiteSlice.reducer;
