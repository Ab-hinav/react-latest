import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';


const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;
export * from './thunks/fetchUsers';
export * from './thunks/addUsers';