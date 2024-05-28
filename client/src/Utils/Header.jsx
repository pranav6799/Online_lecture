import { Link, useNavigate} from "react-router-dom"
import { useAuth } from "../Context/Auth"
const Header = ()=>{
  const navigate = useNavigate()
  const [auth] = useAuth()

const Logout = ()=>{
  navigate('/login')
  localStorage.removeItem('auth')
}

  return (
    <>
    <header className="p-3 text-bg-dark">
  <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <div className="text-end">
        <button type="button" className="btn btn-outline-light me-2" onClick={Logout}>Logout</button>
      </div>
      <div className="dashboard-container ms-auto">
      {auth.user && <h1 className="mb-0">Welcome {auth.user.name}</h1>}
      </div>

    </div>
  </div>
</header>
</>
  )
}

export default Header
