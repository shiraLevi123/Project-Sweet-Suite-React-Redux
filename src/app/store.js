import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slice/customerSlice';
import diaryReducer from '../slice/diarySlice';
 import imageReducer from '../slice/imageSlice';
// import reviewReducer from '../slice/reviewSlice';
import suiteReducer from '../slice/suiteSlice';


export const store = configureStore({

    reducer: {
        customer: customerReducer,
        diary: diaryReducer,
        image: imageReducer,
        // review: reviewReducer,
        suite: suiteReducer,
    }

});
// export default store;
