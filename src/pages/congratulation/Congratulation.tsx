import React from 'react'
import fieldList from 'fieldlist.json'
import {
    DataCollection,
    DataCollectionFooter,
    DataItem as StyledDataItem,
    DataItemValueWrapper,
    DataItemValue as StyledDataItemValue,
} from './Congratulation.styles'
import { FieldAttributes } from 'config/types'
import { useAppSelector } from 'app/hooks'
import { selectData } from 'app/reducers/submissionFormSlice'
import { useNavigate } from 'react-router-dom'

interface DataItemValueProps {
    title: string
    value: any
    rows?: number
}
function DataItemValue({ title, value, rows }: DataItemValueProps) {
    const multilined = rows != null && rows > 1
    return (
        <DataItemValueWrapper>
            <StyledDataItemValue rows={rows} multilined={multilined}>
                <strong>{title}</strong>
                {!multilined && ': '}
                <span>{value}</span>
            </StyledDataItemValue>
        </DataItemValueWrapper>
    )
}

interface DataItemProps {
    attrs: FieldAttributes | FieldAttributes[]
    data: Record<string, any>
}
function DataItem({ attrs, data }: DataItemProps) {
    return (
        <StyledDataItem>
            {Array.isArray(attrs) ? (
                attrs.map((attrs, i) => (
                    <DataItemValue
                        key={`value-${i}`}
                        title={attrs.title}
                        value={data[attrs.id]}
                        rows={attrs.rows}
                    />
                ))
            ) : (
                <DataItemValue
                    title={attrs.title}
                    value={data[attrs.id]}
                    rows={attrs.rows}
                />
            )}
        </StyledDataItem>
    )
}

function Congratulation() {
    const formData = useAppSelector(selectData)

    const navigate = useNavigate()

    function handleBack() {
        navigate('/')
    }

    return (
        <div>
            <h2>Congratulations!!!</h2>
            <p>You have successfully submitted the form.</p>
            <DataCollection>
                {(fieldList as (FieldAttributes | FieldAttributes[])[]).map(
                    (attrs, i) => (
                        <DataItem
                            key={`field-${i}`}
                            attrs={attrs}
                            data={formData}
                        />
                    )
                )}
                <DataCollectionFooter>
                    <button onClick={handleBack}>Back</button>
                </DataCollectionFooter>
            </DataCollection>
        </div>
    )
}

export default Congratulation
