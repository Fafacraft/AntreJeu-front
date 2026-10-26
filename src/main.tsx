import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initializeSentry } from './Sentry';

initializeSentry();

try {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  console.error('Root element not found:', error);
  throw error;
}
