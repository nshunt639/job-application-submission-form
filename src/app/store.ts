import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { submissionFormReducer } from './reducers'

export const store = configureStore({
    reducer: {
        submissionForm: submissionFormReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
