import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "../Context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </AuthProvider>,
)
