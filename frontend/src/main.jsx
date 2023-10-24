import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalContextProvider from './contexts/GlobalContexts.jsx'
import ThemeProvider from './theme'
import ThemeColorPresets from "./theme/ColorPresets";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GlobalContextProvider>
      <ThemeProvider>
        <ThemeColorPresets>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </ThemeColorPresets>
      </ThemeProvider>
    </GlobalContextProvider>
  // </React.StrictMode>,
)
