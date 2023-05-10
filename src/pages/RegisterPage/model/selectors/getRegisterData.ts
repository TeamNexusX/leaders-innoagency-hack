import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterError = (state: StateSchema) => state.registerPage?.error;
export const getRegisterIsLoading = (state: StateSchema) => state.registerPage?.isLoading;