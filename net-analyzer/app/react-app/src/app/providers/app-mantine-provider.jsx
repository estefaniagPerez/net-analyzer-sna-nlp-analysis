import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

function AppMantineProvider({ children }) {
  return (
    <>
    <ColorSchemeScript  forceColorScheme="light" />
    <MantineProvider forceColorScheme="light">
      {children}
    </MantineProvider>
    </>
  );
}

export function DarkMantineProvider({ children }) {
  return (
    <>
    <ColorSchemeScript forceColorScheme="dark" />
    <MantineProvider forceColorScheme="dark" theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
    </>
  );
}

export default AppMantineProvider;
