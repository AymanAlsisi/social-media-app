import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AiOutlineWarning } from "react-icons/ai"
import { IoFlame } from "react-icons/io5"
import { protocols } from "../../api/protocols"
import { useStateProvider } from "../../context/StateProvider"
import { app_colors } from '../../assets/colors/colors'
import { IconBtn, Spiner } from "../../components"

const SignUp = () => {
  const { setToken, setUser } = useStateProvider()
  const [form, setForm] = useState({
    username: '',
    email: '',
    firstPass: '',
    secPass: '',
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [firstPasswordIsVisible, setFirstPasswordIsVisible] = useState(false)
  const [secPasswordIsVisible, setSecPasswordIsVisible] = useState(false)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data) => {
    try {
      const res = await axios.post(`${protocols.http}/signin`, data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.profile))
      setToken(res.data.token)
      setUser(res.data.profile)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return toast.error("Couldn't sign in.")
    }
  }

  const createNewAcc = async (formElemet) => {
    formElemet.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.post(`${protocols.http}/signup`, form)
      await login({ email: form.email, password: form.secPass })
      setIsLoading(false)
      navigate('/')
      return toast.success(`Welcome, ${form.username}!`)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage("An expected error occured, please try again!")
      }
      return toast.error("Couldn't sign up.")
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
        <h2>Sign-Up Form</h2>
        <p>Please enter your details correctly.</p>
      </div>
      {errorMessage && <div className="error">
        <AiOutlineWarning size={25} color='#dc002c' />
        <p>{errorMessage}</p>
      </div>}
      <form onSubmit={e => createNewAcc(e)} className="form">
        <div className="form-field">
          <input
            type="text"
            placeholder='Username'
            style={{ width: '100%' }}
            onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
          />
        </div>
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
            type={firstPasswordIsVisible ? "text" : "password"}
            placeholder='Create a Password'
            style={{ width: '95%' }}
            onChange={e => setForm(prev => ({ ...prev, firstPass: e.target.value }))}
          />
          <IconBtn
            name={firstPasswordIsVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={app_colors.grey}
            action={() => firstPasswordIsVisible ? setFirstPasswordIsVisible(false) : setFirstPasswordIsVisible(true)}
          />
        </div>
        <div className="form-field">
          <input
            type={secPasswordIsVisible ? "text" : "password"}
            placeholder='Confirm the Password'
            style={{ width: '95%' }}
            onChange={e => setForm(prev => ({ ...prev, secPass: e.target.value }))}
          />
          <IconBtn
            name={secPasswordIsVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={app_colors.grey}
            action={() => secPasswordIsVisible ? setSecPasswordIsVisible(false) : setSecPasswordIsVisible(true)}
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to={'/sign-in'}>Sign In</Link></p>
      </form>
    </div>
  )
}

export default SignUp