import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AiOutlineWarning } from "react-icons/ai"
import { IoFlame } from "react-icons/io5"
import { protocols } from "../../api/protocols"
import { useStateProvider } from "../../context/StateProvider"
import { app_colors } from '../../assets/colors/colors'
import { IconBtn, Spiner } from '../../components'

const SignIn = () => {
  const { setToken, setUser } = useStateProvider()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const navigate = useNavigate()
  
  const signIn = async (formElemet) => {
    formElemet.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.post(`${protocols.http}/signin`, form)
      setToken(res.data.token)
      setUser(res.data.profile)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.profile))
      setIsLoading(false)
      navigate('/')
      return toast.success(`Welcome, ${res.data.profile.username}!`)
    } catch (error) {
      setIsLoading(false)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage("An expected error occured, please try again!")
      }
      return toast.error("Couldn't sign in.")
    }
  }

  if (isLoading) return <Spiner h={'90vh'} />

  return (
    <div className='auth'>
      <span className="brand">
        <IoFlame size={22} color='#FFF' />
        Social
      </span>
      <div className="header">
        <h2>Welcome Again!</h2>
        <p>Please enter your account details correctly.</p>
      </div>
      {errorMessage && <div className="error">
        <AiOutlineWarning size={25} color='#dc002c' />
        <p>{errorMessage}</p>
      </div>}
      <form onSubmit={e => signIn(e)} className="form">
        <div className="form-field">
          <input
            type="email"
            placeholder='Email'
            style={{ width: '100%' }}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="form-field">
          <input
            type={passwordIsVisible ? "text" : "password"}
            placeholder='Password'
            style={{ width: '95%' }}
            onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
          />
          <IconBtn
            name={passwordIsVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={app_colors.grey}
            action={() => passwordIsVisible ? setPasswordIsVisible(false) : setPasswordIsVisible(true)}
          />
        </div>
        <button type="submit">Sign In</button>
        <p>Don't have an account? <Link to={'/sign-up'}>Sign Up</Link></p>
      </form>
    </div>
  )
}

export default SignIn