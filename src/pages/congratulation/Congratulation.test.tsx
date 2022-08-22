import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import GlobalStyle from 'index.styles'
import App from 'App'
import fieldList from 'fieldlist.json'
import { FieldAttributes } from 'config/types'

const flatFieldList = (
    fieldList as (FieldAttributes | FieldAttributes[])[]
).reduce(
    (
        flatFieldList: FieldAttributes[],
        field: FieldAttributes | FieldAttributes[]
    ) => {
        if (Array.isArray(field)) {
            flatFieldList = flatFieldList.concat(field)
        } else {
            flatFieldList.push(field)
        }

        return flatFieldList
    },
    []
)

const testValues: Map<string, any> = new Map<string, any>()
;[
    ['First Name', 'Tahar'],
    ['Last Name', 'Meftah'],
    ['Email', 'tahar.meftah.639@gmail.com'],
    ['Address 1', '3333 Susan Dr. Bldg O'],
    ['City', 'San Bruno'],
    ['State', 'CA'],
    ['Zip', '94011'],
    ['Phone', '111-222-3333'],
    ['Job Title', 'Engineer - lead'],
    ['Reason', 'I have the right skillset for this position.'],
].forEach(([id, value]) => {
    testValues.set(id, value)
})

describe('Congratulation', () => {
    test(`displays the submitted form data`, async () => {
        render(
            <Provider store={store}>
                <GlobalStyle />
                <App />
            </Provider>
        )

        flatFieldList.forEach(({ type, title }) => {
            const role = type === 'select' ? 'combobox' : 'textbox'

            fireEvent.change(screen.getByRole(role, { name: title }), {
                target: { value: testValues.get(title) },
            })
        })

        fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))

        expect(
            await screen.findByRole('heading', { name: 'Congratulations!!!' })
        ).toBeInTheDocument()

        for (const field of flatFieldList) {
            expect(screen.getByText(field.title)).toBeInTheDocument()
            expect(screen.getByText(testValues.get(field.title))).toBeInTheDocument()
        }
    })
})
