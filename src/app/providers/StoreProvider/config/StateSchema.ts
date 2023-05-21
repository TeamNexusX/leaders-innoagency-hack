import { UserSchema } from 'entities/User';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { PlatformSchema } from 'entities/Platform';
import { GetPlatformsSchema } from 'features/getPlatforms';
import { LoginPageSchema } from 'pages/LoginPage';
import { RegisterPageSchema } from 'pages/RegisterPage';
import { CommentSchema } from 'entities/Comment';
import { GetMetroStationSchema } from 'features/getMetroStation';
import { BookPlatformSchema } from 'features/bookPlatform';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // asynchronous reducers
    loginPage?: LoginPageSchema;
    registerPage?: RegisterPageSchema;
    platform?: PlatformSchema;
    comment?: CommentSchema;
    getPlatforms?: GetPlatformsSchema;
    metroStation?: GetMetroStationSchema;
    bookPlatform?: BookPlatformSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface reducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: reducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}