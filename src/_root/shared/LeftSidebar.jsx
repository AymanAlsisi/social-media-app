import { NavLink } from "react-router-dom"
import { IoFlame } from "react-icons/io5"
import { routes } from "../../assets/routes/_routes"

const LeftSidebar = ({ user, openLogOutBS }) => {
  return (
    <div className='leftsidebar'>
      <div className="brand">
        <IoFlame size={20} color="#FFF" />
        Social
      </div>
      <div className="header">
        <img src={user.img_url} alt="" />
        <span className="username">{user.username}</span>
      </div>
      <div className="links">
        {
          routes.map((route, i) => {
            return (
              <NavLink to={route.label === "Profile" ? `${route.path}/${user.id}` : route.path} key={i}>
                <ion-icon name={route.icon} />
                <span className="lebel">{route.label}</span>
              </NavLink>
            )
          })
        }
      </div>
      <button onClick={openLogOutBS}><ion-icon name='log-out' /></button>
    </div>
  )
}

export default LeftSidebar