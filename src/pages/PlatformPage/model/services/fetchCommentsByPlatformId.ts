import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Comment } from 'entities/Comment';

export const fetchCommentsByPlatformId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'Platform Page / fetchCommentsByPlatformId',
    async (id, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    platformId: id,
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
