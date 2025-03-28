import { useStateProvider } from "../context/StateProvider"
import { Outlet, Navigate } from "react-router-dom"
import "./Auth.css"

const AuthLayout = () => {
  const { token, isLoading } = useStateProvider()
  return (
    <>
      {
        isLoading ? null
          : token ? <Navigate to='/' />
            : <Outlet />
      }
    </>
  )
}

export default AuthLayout