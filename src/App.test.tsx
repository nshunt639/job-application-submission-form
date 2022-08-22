import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import GlobalStyle from 'index.styles'
import App from 'App'

describe('App', () => {
    test('renders App component', () => {
        render(
            <Provider store={store}>
                <GlobalStyle />
                <App />
            </Provider>
        )

        expect(
            screen.getByRole('heading', { name: 'Job Application' })
        ).toBeInTheDocument()
    })
})
