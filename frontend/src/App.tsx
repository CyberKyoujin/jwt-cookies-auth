import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Register from './screens/Register'
import Login from './screens/Login'
import Profile from './screens/Profile'
import getCookie from './utils/getCookies'
import useAuthStore from './zustand/useAuthStore'


function App() {
  const [count, setCount] = useState(0)

  const { authTokens, user, isAuthenticated, refreshToken } = useAuthStore.getState();

  useEffect(() => {
     const refreshInterval = setInterval( async() => {
     try {
      await refreshToken();
     } catch (error) {
      console.log('Error refreshing token: ', error);
     }
     }, 290000) 
     return () => clearInterval(refreshInterval);
  }, [])

  console.log(authTokens, user, isAuthenticated)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
