import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slice/customerSlice';
import diaryReducer from '../slice/diarySlice';
 import mailReducer from '../slice/mailSlice';
 import reviewReducer from '../slice/reviewSlice';
import suiteReducer from '../slice/suiteSlice';


export const store = configureStore({

    reducer: {
        customer: customerReducer,
        diary: diaryReducer,
        mail: mailReducer,
        review: reviewReducer,
        suite: suiteReducer,
    }

});
