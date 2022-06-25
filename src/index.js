import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './firebase.config'
import './seller.css'
import 'react-toastify/dist/ReactToastify.css';
const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
