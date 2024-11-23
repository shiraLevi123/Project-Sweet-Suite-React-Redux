import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        imageUrl: '',
    },
    reducers: {
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
    },
});

export default imageSlice.reducer;  // ודא שיש export default
