// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { postCustomer, loginCustomer } from "../service/customerService";

// const initialState = {
//     currentCustomer: null,
//     loading: false,
//     error: ""
// };

// // פעולה לרישום
// export const signUp = createAsyncThunk(
//     "http://localhost:8080/api/customer/signup",
//     async (customer) => {
//         const response = await postCustomer(customer);
//         return response;
//     }
// );

// // פעולה לכניסה
// export const login = createAsyncThunk(
//     "http://localhost:8080/api/customer/login",
//     async (loginData) => {
//         const response = await loginCustomer(loginData);
//         return response;
//     }
// );

// const customerSlice = createSlice({
//     name: "customer",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Sign Up
//             .addCase(signUp.fulfilled, (state, action) => {
//                 state.currentCustomer = action.payload;
//                 state.loading = false;
//             })
//             .addCase(signUp.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(signUp.rejected, (state, action) => {
//                 state.error = action.error.message;
//                 state.loading = false;
//             })
//             // Login
//             .addCase(login.fulfilled, (state, action) => {
//                 state.currentCustomer = action.payload;
//                 state.loading = false;
//             })
//             .addCase(login.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.error = action.error.message;
//                 state.loading = false;
//             });
//     },
// });

// export default customerSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postCustomer, loginCustomer } from "../service/customerService";

const initialState = {
    currentCustomer: null,
    isLoggedIn: false, // שדה חדש כדי לעקוב אחרי מצב ההתחברות
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

// פעולה ליציאה
export const logout = createAsyncThunk("customer/logout", () => {
    return null; // אנחנו לא צריכים לשלוח שום נתון במקרה הזה, רק לנקות את המידע
});

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomer(state, action) {
            // עדכון המידע הקיים של הלקוח עם הנתונים החדשים מ-action.payload
            state.currentCustomer = { 
                ...action.payload // הוספת הנתונים החדשים
            };
        },
    },
    
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(signUp.fulfilled, (state, action) => {
                state.currentCustomer = action.payload;
                state.isLoggedIn = true;
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
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.currentCustomer = null;
                state.isLoggedIn = false;
            });
    },
});
export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;
