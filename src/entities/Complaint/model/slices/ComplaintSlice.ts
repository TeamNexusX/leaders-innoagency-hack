import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { submitComplaint } from '../services/submitComplaint';
import { ComplaintSchema } from '../types/ComplaintSchema';

const initialState: ComplaintSchema = {
    isLoading: false,
};

export const ComplaintSlice = createSlice({
    name: 'Complaint',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitComplaint.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(submitComplaint.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(submitComplaint.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: ComplaintActions } = ComplaintSlice;
export const { reducer: ComplaintReducer } = ComplaintSlice;
