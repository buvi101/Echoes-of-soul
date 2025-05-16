import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import MyPoems from './Pages/MyPoems.jsx'
// import LoginSignup from './Pages/LoginSignup.jsx'
// import PoemForm from './Pages/PoemForm.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },

  {
    path:'home',
    element:<Home/>
  },

  {
    path:'about',
    element:<About/>
  },

  {
    path:'contact',
    element:<Contact/>
  },

  {
    path:'mypoems',
    element:<MyPoems/>
  }
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-frqvoxeyj883hmwb.us.auth0.com"
    clientId="6UTMrWHwzIK1EwtbsMEaSyhe9DrMJ5Le"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <RouterProvider router={router}/>
    </Auth0Provider>
  </React.StrictMode>
)