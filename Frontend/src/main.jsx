import React, { createContext } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext({isAuthorized: false})
 
const AppWrapper = () =>{
  const [isAuthorized, SetIstAuthorized] = useState(false);
  const [user, setUser] = useState({});

   return(
    <Context.Provider value  = {{isAuthorized, SetIstAuthorized, user, setUser}} >
      <App/>
    </Context.Provider>

   )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
