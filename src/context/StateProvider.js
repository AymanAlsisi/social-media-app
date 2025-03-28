import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { protocols } from "../api/protocols"

const SocialContext = createContext(null)
export const useStateProvider = () => useContext(SocialContext)

export default function StateProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const config = {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }

    useEffect(() => {
        new Promise(resolve => {
            setToken(localStorage.getItem('token'))
            setUser(JSON.parse(localStorage.getItem('user')))
            if (localStorage.getItem('token')) {
                axios.get(`${protocols.http}/profile/${JSON.parse(localStorage.getItem('user')).id}`, config)
                    .then(res => setUser({
                        id: res.data.profile.id,
                        img_url: res.data.profile.img_url,
                        email: res.data.profile.email,
                        username: res.data.profile.username,
                    }))
            }
            resolve()
        })
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <SocialContext.Provider value={{
            token,
            user,
            isLoading,
            setToken,
            setUser,
            setIsLoading
        }}>
            {children}
        </SocialContext.Provider>
    )
}