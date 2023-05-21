import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Platform } from 'entities/Platform';
import { PlatformSchema } from '../types/PlatformSchema';
import { getPlatformById } from '../services/getPlatformById';

const initialState: PlatformSchema = {
    isLoading: false,
};

export const PlatformSlice = createSlice({
    name: 'Platform',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlatformById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getPlatformById.fulfilled, (state, action: PayloadAction<Platform>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getPlatformById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: PlatformActions } = PlatformSlice;
export const { reducer: PlatformReducer } = PlatformSlice;