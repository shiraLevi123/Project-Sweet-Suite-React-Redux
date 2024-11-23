import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postCustomer, loginCustomer } from "../service/customerService";

const initialState = {
    currentCustomer: null,
    loading: false,
    error: ""
};

// פעולה לרישום
export const signUp = createAsyncThunk(
    "http://localhost:8080/api/customer/signup",
    async (customer) => {
        const response = await postCustomer(customer);
        return response;
    }
);

// פעולה לכניסה
export const login = createAsyncThunk(
    "http://localhost:8080/api/customer/login",
    async (loginData) => {
        const response = await loginCustomer(loginData);
        return response;
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(signUp.fulfilled, (state, action) => {
                state.currentCustomer = action.payload;
                state.loading = false;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // Login
            .addCase(login.fulfilled, (state, action) => {
                state.currentCustomer = action.payload;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default customerSlice.reducer;
