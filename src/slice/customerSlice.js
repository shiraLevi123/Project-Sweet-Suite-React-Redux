import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postCustomer, loginCustomer, updateCustomer, getAllCustomer } from "../service/customerService";

const initialState = {
    currentCustomer: "",
    isLoggedIn: false,
    loading: false,
    error: "",
    allCustomers: [],
};
export const getCustomers = createAsyncThunk("customer/get",
    async () => {
        const respone = await getAllCustomer()
        return respone.data;

    }
);

// פעולה לרישום
export const signUp = createAsyncThunk("customer/signUp",
    async (formCustomer, { rejectWithValue }) => {
        try {
            const response = await postCustomer(formCustomer);
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    });

// פעולה לכניסה
export const login = createAsyncThunk("customer/login",
    async (customer, { rejectWithValue }) => {
        try {
            const response = await loginCustomer(customer);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data); // החזרת שגיאה
        }
    }
);

// פעולה ליציאה
export const logout = createAsyncThunk("customer/logout", async () => {
    try {
        await signoutService();
        return null;
    } catch (error) {
        console.log('error', error);
    }

});

//עדכון פרטי לקוח
export const update = createAsyncThunk("customer/Update",
    async ({ formData, id }) => {
        const response = await updateCustomer(formData, id);
        return response;
    }
)

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            //get all
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.allCustomers = action.payload;
            })
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
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.currentCustomer = null;
                state.isLoggedIn = false;
            })
            .addCase(update.pending, (state) => {
                state.loading = true;
            })
            .addCase(update.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.currentCustomer = action.payload;
                state.loading = false;
            });
    },
});

export const { clearError } = customerSlice.actions;
export default customerSlice.reducer;
