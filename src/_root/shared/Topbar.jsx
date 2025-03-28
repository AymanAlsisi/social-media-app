import { IoFlame } from 'react-icons/io5'

const Topbar = ({ img, openLogOutBS }) => {
  return (
    <div className='topbar'>
      <div className="brand">
        <IoFlame color='#FFF' size={20} />
        <span>Social</span>
      </div>
      <div className="user">
        <img src={img} alt="" />
        <button onClick={openLogOutBS}><ion-icon name='log-out' /></button>
      </div>
    </div>
  )
}

export default Topbar