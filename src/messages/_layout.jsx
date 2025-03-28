import { Outlet, Navigate } from "react-router-dom"
import { useStateProvider } from "../context/StateProvider"
import "./CSS/Main.css"
import { LeftSideBar, Navbar } from "./shared"

const MessagesLayout = () => {
  const { token, user, isLoading } = useStateProvider()
  return (
    <>
      {
        isLoading ? null
          : !token ? <Navigate to='/sign-in' />
            : <div className="messages-layout">
              <LeftSideBar user={user} />
              <Navbar user_id={user.id} />
              <Outlet />
            </div>
      }
    </>
  )
}

export default MessagesLayout