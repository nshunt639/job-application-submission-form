import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface SubmissionFormState {
    data: Record<string, any>
}

const initialState: SubmissionFormState = {
    data: {},
}

export const submissionFormSlice = createSlice({
    name: 'submissionForm',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<any>) => {
            state.data = action.payload
        },
    },
})

export const { update: updateData } = submissionFormSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => state.submissionForm.data

export default submissionFormSlice.reducer
