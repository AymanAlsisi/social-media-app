import { IoFlame } from "react-icons/io5"
import { NavLink, useNavigate } from "react-router-dom"
import { routes } from "../../assets/routes/_routes"
import { useStateProvider } from "../../context/StateProvider"

const LeftSidebar = ({ user }) => {
  const { setToken, setUser } = useStateProvider()
  const navigate = useNavigate()
  const signOut = () => {
    new Promise(resolve => {
      setToken(null)
      setUser(null)
      localStorage.clear()
      resolve()
    })
      .then(() => navigate('/sign-in'))
  }
  return (
    <div className='leftsidebar'>
      <div className="brand">
        <IoFlame size={20} color="#FFF" />
        Social
      </div>
      <div className="header">
        <img src={user.img_url} alt="" />
      </div>
      <div className="links">
        {
          routes.map((route, i) => {
            return (
              <NavLink to={route.label === "Profile" ? `${route.path}/${user.id}` : route.path} key={i}>
                <ion-icon name={route.icon} />
              </NavLink>
            )
          })
        }
      </div>
      <button onClick={signOut}><ion-icon name='log-out' /></button>
    </div>
  )
}

export default LeftSidebar