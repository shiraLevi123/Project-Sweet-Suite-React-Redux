import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addReview, getAllReview } from '../service/reviewSrvice';

export const addComment = createAsyncThunk('review/addComment', async (newReview) => {
    const review = await addReview(newReview);
    return review;
});

export const getAllComment = createAsyncThunk('review/getAll', async () => {
    const review = await getAllReview();
    return review;
});
const reviewSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload); // הוספת תגובה חדשה
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAllComment.pending, (state) => {
                state.loading = true;
              })
              .addCase(getAllComment.fulfilled, (state, action) => {
                state.loading = false;
                // עדכון רשימת התגובות שמתקבלת מה-API
                state.comments = action.payload; // action.payload הוא רשימת התגובות שהתקבלו מה-API
              })
              .addCase(getAllComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
              
}});

export const { setComments } = reviewSlice.actions;
export default reviewSlice.reducer;