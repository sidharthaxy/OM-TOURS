import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="274881182323-hvuvc3l249g37vl293nuj3tgdevr6vd6.apps.googleusercontent.com">
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);