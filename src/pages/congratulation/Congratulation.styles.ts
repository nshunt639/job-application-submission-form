import styled, { css } from 'styled-components'

export const DataCollection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const DataItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media (min-width: 801px) {
        flex-direction: row;
    }
`
export const DataItemValueWrapper = styled.div`
    width: 100%;
    @media (min-width: 801px) {
        width: 0;
        flex-grow: 1;
    }
`
export const DataItemValue = styled.div`
    display: block;
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid gray;
    min-height: 31px;
    font-size: 13.33px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > label {
        font-weight: bold;
    }

    ${(props: { rows?: number; multilined?: boolean }) =>
        props.multilined &&
        css`
            > span {
                display: block;
                max-width: 100%;
                min-height: ${props.rows! * 17 + 14}px;
                max-height: ${props.rows! * 2 * 17 + 14}px;
                overflow: auto;
                margin-top: 4px;
                white-space: pre-wrap;
                line-break: anywhere;
            }
        `}
`

export const DataCollectionFooter = styled.div`
    text-align: center;
`
