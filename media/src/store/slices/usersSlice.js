import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUsers';
import { removeUser } from '../thunks/removeUsers';
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            }
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        });
        builder.addCase(addUser.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            return {
                ...state,
                data: [...state.data, action.payload],
                isLoading: false,
                error: null,
            }
        });
        builder.addCase(addUser.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        });
        builder.addCase(removeUser.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            return {
                isLoading: false,
                error: null,
                data: state.data.filter(user => user.id !== action.payload.id),
            }
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        });

    }
});

export const usersReducer = usersSlice.reducer;
