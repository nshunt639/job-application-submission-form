import styled from 'styled-components'

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media (min-width: 801px) {
        flex-direction: row;
    }
`
export const InputWrapper = styled.div`
    flex: 1 1 0;
`
export const Input = styled.input`
    display: block;
    padding: 6px;
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid gray;
`

export const ErrorMessage = styled.div`
    color: red;
`

export const FormActions = styled.div`
    text-align: center;
`
