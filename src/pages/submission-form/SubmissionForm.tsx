import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import fieldList from 'fieldlist.json'

import {
    Form,
    FormActions,
    Field as StyledField,
    InputWrapper,
    Input as StyledInput,
    ErrorMessage as StyledErrorMessage,
} from './SubmissionForm.styles'
import { ErrorMessage } from '@hookform/error-message'
import { FieldAttributes } from 'config/types'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectData, updateData } from 'app/reducers/submissionFormSlice'

interface InputProps {
    attrs: FieldAttributes
    register: any
    errors: any
}
function Input({
    attrs: {
        id: name,
        type,
        placeholder,
        options,
        required,
        pattern,
        ...others
    },
    register,
    errors,
}: InputProps) {
    if (pattern && pattern['value']) {
        pattern = { value: new RegExp(pattern.value), message: pattern.message }
    }
    const elementName = ['select', 'textarea'].includes(type) ? type : 'input'
    return (
        <InputWrapper>
            <StyledInput
                as={elementName as never}
                name={name}
                placeholder={placeholder}
                {...others}
                {...register(name, { required, pattern })}
            >
                {options &&
                    [
                        ['', placeholder],
                        ...options.map((option) => [option, option]),
                    ].map(([value, title]) => (
                        <option key={`option-${value}`} value={value}>
                            {title}
                        </option>
                    ))}
            </StyledInput>
            <ErrorMessage
                name={name}
                errors={errors}
                render={({ message }) => (
                    <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
            ></ErrorMessage>
        </InputWrapper>
    )
}

interface FieldProps {
    attrs: FieldAttributes | FieldAttributes[]
    register: any
    errors: any
}

function Field({ attrs, register, errors }: FieldProps) {
    return (
        <StyledField>
            {Array.isArray(attrs) ? (
                attrs.map((attrs, i) => (
                    <Input
                        key={`input-${i}`}
                        attrs={attrs}
                        register={register}
                        errors={errors}
                    />
                ))
            ) : (
                <Input attrs={attrs} register={register} errors={errors} />
            )}
        </StyledField>
    )
}

function SubmissionForm() {
    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectData)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: formData })

    const navigate = useNavigate()

    const handleFormSubmit = handleSubmit(function (data) {
        dispatch(updateData(data))
        navigate('/success')
    })

    return (
        <div>
            <h2>Submission Form</h2>
            <p>Please fill the following form and submit it.</p>
            <Form onSubmit={handleFormSubmit}>
                {(fieldList as (FieldAttributes | FieldAttributes[])[]).map(
                    (attrs, i) => (
                        <Field
                            key={`field-${i}`}
                            attrs={attrs}
                            register={register}
                            errors={errors}
                        />
                    )
                )}
                <FormActions>
                    <button>Submit</button>
                </FormActions>
            </Form>
        </div>
    )
}

export default SubmissionForm
