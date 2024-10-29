import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx'

const provider = createBrowserRouter([
  {
    path: '/', element: <App/>
  },
  {
    path: '/dashboard',element:<Dashboard/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={provider} />
  </StrictMode>,
)
