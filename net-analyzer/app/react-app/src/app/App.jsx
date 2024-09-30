import AppProvider from './providers/app-provider';
import { AppRouter } from './router';
import './App.css'
import React from 'react';


function App() {
  return (   
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
