import './globals.scss';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components';
import { StoreProvider } from './core/stores/StoreContext';
import ThemeProvider from './shared/themes/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>,
)
