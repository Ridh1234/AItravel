import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import Viewtrip from './view-trip/[tripId]'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'create-trip',
      element:<CreateTrip/>
    },
    {
         
      path:'/view-trip/:tripId',
      element:<Viewtrip/> 
          
    }
    
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
   </StrictMode>,
)
