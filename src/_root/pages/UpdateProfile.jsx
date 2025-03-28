import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { IoClose } from "react-icons/io5"
import toast from "react-hot-toast"
import '../CSS/UpdateProfile.css'
import { CustomBottomSheet, Spiner } from "../../components"
import { protocols } from "../../api/protocols"
import { useStateProvider } from "../../context/StateProvider"
import { app_colors } from "../../assets/colors/colors"

const UpdateProfile = () => {
  const { token, user, setUser } = useStateProvider()

  const [isEditigImg, setIsEditigImg] = useState(false)

  const navigate = useNavigate()

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const [form, setForm] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const fetchProfileData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${protocols.http}/profile/${user.id}`, config)
      setForm({
        id: res.data.profile.id,
        img: res.data.profile.img_url,
        username: res.data.profile.username,
        bio: res.data.profile.bio
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const encodeImageFileAsURL = element => {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, img: reader.result }))
    }
    reader.readAsDataURL(file);
  }

  const editProfileDetails = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.put(`${protocols.http}/profile/${user.id}`, JSON.stringify({
        username: form.username,
        bio: form.bio,
        img: form.img
      }))
      setUser({
        id: user.id,
        img_url: res.data.img_url,
        username: res.data.username,
        state: true
      })
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        img_url: res.data.img_url,
        username: res.data.username,
        state: true
      }))
      setIsLoading(false)
      navigate(`/profile/${user.id}`)
      return toast("Profile updated successfully!", {
        style: {
          backgroundColor: app_colors.success,
          color: "#FFF",
          fontWeight: "700"
        }
      })
    } catch (error) {
      setIsLoading(false)
      return toast("Couldn't update profile.", {
        style: {
          backgroundColor: app_colors.danger,
          color: "#FFF",
          fontWeight: "700"
        }
      })
    } finally {
      setIsEditigImg(false)
    }
  }

  const removeProfileImage = async () => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`${protocols.http}/profile/${user.id}`)
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        img_url: res.data.img_url,
        username: res.data.username,
        state: true
      }))
      setForm(prev => ({
        ...prev,
        img: res.data.img_url
      }))
      setUser(prev => ({
        ...prev,
        img_url: res.data.img_url
      }))
      setIsLoading(false)
      return toast("Profile picture was deleted.", {
        style: {
          backgroundColor: app_colors.info,
          color: app_colors.secondary,
          fontWeight: "700"
        }
      })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      return toast("Couldn't delete profile picture.", {
        style: {
          backgroundColor: app_colors.danger,
          color: "#FFF",
          fontWeight: "700"
        }
      })
    } finally {
      setIsEditigImg(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <>
      {
        isLoading ? <Spiner h={'80vh'} />
          :
          !form ? null
            :
            (
              <div className="update-profile">
                <form className="form" onSubmit={(e) => editProfileDetails(e)}>
                  <div className="img-block">
                    <img src={form.img} alt="" className="user-img" />
                    <button onClick={() => setIsEditigImg(true)} type="button">Change Profile Picture</button>
                  </div>
                  <div className="input-block">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      value={form.username}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        username: e.target.value
                      }))}
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      placeholder="Bio"
                      value={form.bio}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        bio: e.target.value
                      }))}
                    ></textarea>
                  </div>
                  <button type="submit">Update</button>
                </form>
              </div>
            )
      }
      <CustomBottomSheet
        open={isEditigImg}
      >
        <div className="edit-img">
          <div className="top">
            <p
              style={{ paddingLeft: '16px' }}
            >Edit Profile</p>
            <IoClose
              size={30}
              color={'white'}
              onClick={() => setIsEditigImg(false)}
              style={{ paddingRight: '16px' }}
              cursor={'pointer'}
            />
          </div>
          <div className="buttons">
            <input
              type="file"
              style={{ display: 'none' }}
              id="img-input"
              onChange={(e) => encodeImageFileAsURL(e.target)}
            />
            <label
              style={{ color: 'var(--info)', cursor: 'pointer' }}
              htmlFor="img-input"
            >
              Choose Image file from this device
            </label>
            <button
              style={{ color: 'var(--danger)' }}
              type="button"
              onClick={removeProfileImage}
            >
              Remove Profile Picture</button>
          </div>
        </div>
      </CustomBottomSheet>
    </>
  )
}

export default UpdateProfile