import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Components/Spinner'
// import Spinner from '../Components/Spinner'


const UserRoute = () => {
  const [ok,setOk] = useState(false)
  const [auth]= useAuth()
useEffect(()=>{
  
  if(auth?.token && auth.user.role != 1){
    setOk(true)
  }

},[auth?.token])

return ok ? <Outlet/> :<Spinner path='/login'/>
}

export default UserRoute
