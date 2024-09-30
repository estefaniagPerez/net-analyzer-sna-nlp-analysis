import React from 'react';
import AppMantineProvider from './app-mantine-provider.jsx'

const AppProvider = ({ children }) => {
  return (
    <AppMantineProvider>
      {children}
    </AppMantineProvider>
  );
}

export default AppProvider;