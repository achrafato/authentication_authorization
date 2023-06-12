import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ContextProvider} from './context/Context'
import {Routes,BrowserRouter,Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>

      <BrowserRouter>
        <App/>
      </BrowserRouter>

    </ContextProvider>
)
