import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMail } from '../service/mailService';

export const sendMailData = createAsyncThunk("mail/sendMail",
    async (formMail, { rejectWithValue }) => {
        try {
            const response = await sendMail(formMail);
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    },
);

const initialState = {
    currentMail: null,
    error: "",
};

const mailSlice = createSlice({
    name: "mail",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = "";
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(sendMailData.fulfilled, (state, action) => {
                state.currentMail = action.payload;
            })
            .addCase(sendMailData.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearError } = mailSlice.actions;
export default mailSlice.reducer;
