import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js' // 같은 루트에 있으므로 ./App.js

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
