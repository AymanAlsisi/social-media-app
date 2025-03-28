import { routes } from '../../assets/routes/_routes'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user_id }) => {
  return (
    <div className='navbar'>
      {
        routes.map((route, i) => {
          return (
            <NavLink to={route.label === "Profile" ? `${route.path}/${user_id}` : route.path} key={i}>
              <ion-icon name={route.icon} />
              <span className="label">{route.label}</span>
            </NavLink>
          )
        })
      }
    </div>
  )
}

export default Navbar