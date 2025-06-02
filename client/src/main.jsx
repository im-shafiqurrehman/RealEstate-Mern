import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'

// App ko tab tak delay karta hai jab tak persisted state Redux store me load nahi ho jati.
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  // Redux Provider me store pass kar rahe hain, taki poore app me state available ho
  <Provider store={store}>
     {/* PersistGate se app ko wrap kar rahe hain, taki persisted state load hone tak app wait kare */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
