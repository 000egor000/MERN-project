import React, { useContext } from 'react'
import './NavBar.scss'
import contextApp from '../../context/contextApp'
import { toast } from 'react-toastify'
const NavBar = () => {
  const { logout, token, email } = useContext(contextApp)

  const handleLogout = () => {
    logout()
    toast.success('Выполнено!')
    window.location.reload()
  }

  let styleNavMobile = {
    visibility: !!token ? 'visible' : 'hidden',
  }
  return (
    <nav>
      <div className="navbar">
        <a href="/" className="brand-logo">
          Logo
        </a>
        <span>{email}</span>

        <span style={styleNavMobile} onClick={handleLogout}>
          Выход
        </span>
      </div>
    </nav>
  )
}

export default NavBar
