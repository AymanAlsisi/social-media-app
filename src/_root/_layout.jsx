import { useState } from "react"
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom"
import "./CSS/Main.css"
import { LeftSidebar, RightSidebar, Topbar, Navbar } from "./shared"
import { CustomBottomSheet } from "../components"
import { useStateProvider } from "../context/StateProvider"
import { IoWarningOutline } from "react-icons/io5"
import toast from "react-hot-toast"

const RootLayout = () => {
  const { token, isLoading, user, setToken, setUser } = useStateProvider()
  const navigate = useNavigate()
  const signOut = () => {
    new Promise(resolve => {
      setToken(null)
      setUser(null)
      localStorage.clear()
      resolve()
    })
      .then(() => {
        navigate('/sign-in')
        toast.success("Logged out.")
      })
  }
  const { pathname } = useLocation()
  const [isBsOpen, setIsBsOpen] = useState(false)

  return (
    <>
      {
        isLoading ?
          null :
          !token ?
            <Navigate to={'sign-in'} />
            :
            <div className="root-layout">
              {pathname === '/' && (
                <Topbar
                  img={user.img_url}
                  openLogOutBS={() => setIsBsOpen(true)}
                />
              )}
              <Navbar user_id={user.id} />
              <LeftSidebar
                user={user}
                openLogOutBS={() => setIsBsOpen(true)}
              />
              <div className="root-outlet">
                <Outlet />
              </div>
              <RightSidebar />
            </div>
      }
      <CustomBottomSheet open={isBsOpen}>
        <div className="log-out">
          <IoWarningOutline size={50} color="orange" />
          <h3>Are you sure?</h3>
          <p>You'll be logged out.</p>
          <div className="buttons">
            <button type="button" onClick={signOut}>Yes</button>
            <button type="button" onClick={() => setIsBsOpen(false)}>No</button>
          </div>
        </div>
      </CustomBottomSheet>
    </>
  )
}

export default RootLayout