import './App.scss'
import NavBar from './components/navbar/NavBar'
import Registaration from './components/Registaration/Registaration'
import Contex from './context/contextApp'
import useAuth from './hooks/useAuth'
import MainPage from './pages/MainPage/MainPage'
import RoutesItem from './routers/RoutesItem'
import { useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const { token } = useAuth()
  // const viewBlock = useCallback(
  //   () => (!!token ? <MainPage /> : <Registaration />),
  //   [token]
  // )
  const url = document.location.pathname
  const controlPath = () => {
    if (url == '/') {
      return !!token ? <RoutesItem /> : <Registaration />
    }
  }

  return (
    <Contex.Provider value={useAuth()}>
      <div className="App">
        <ToastContainer />
        <NavBar />
        {controlPath()}
      </div>
    </Contex.Provider>
  )
}

export default App
