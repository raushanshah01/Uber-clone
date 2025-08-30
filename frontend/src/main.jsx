import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './pages/context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Rapin gthe data  */}
    <UserContext>
      <BrowserRouter>
         <App />
    </BrowserRouter>
    </UserContext>
  </StrictMode>,
)
 