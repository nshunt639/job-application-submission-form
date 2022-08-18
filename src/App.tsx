import React from 'react'
import { App as StyledApp, Heading } from './App.styles'
import SubmissionForm from './pages/submission-form/SubmissionForm'
import Congratulation from './pages/congratulation/Congratulation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <StyledApp>
                <Heading>Job Application</Heading>
                <hr />
                <Routes>
                    <Route path="/" element={<SubmissionForm />} />
                    <Route path="/success" element={<Congratulation />} />
                </Routes>
            </StyledApp>
        </BrowserRouter>
    )
}

export default App
