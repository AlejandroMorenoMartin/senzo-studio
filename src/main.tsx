import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/config';
import './styles/index.css';
import App from './App';

const storedLang = localStorage.getItem('i18n_lang');
if (storedLang) document.documentElement.lang = storedLang;

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
