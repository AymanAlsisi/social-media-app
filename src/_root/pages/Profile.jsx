import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import "../CSS/Profile.css"
import { ProfileDetails, PostCard, SharePost, NoPosts } from "../shared"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { CustomBottomSheet, Spiner } from "../../components"

const Profile = () => {
  const { token, user } = useStateProvider()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { user_id } = useParams()

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }
  const fetchProfileData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${protocols.http}/profile/${user_id}`, config)
      setData({
        profile: { ...res.data.profile, posts: res.data.posts.length },
        posts: res.data.posts
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const [isSharing, setIsSharing] = useState(false)
  const [shareData, setShareData] = useState(null)

  useEffect(() => {
    fetchProfileData()
  }, [user_id])

  if (isLoading) return <Spiner h={'80vh'} />
  if (!data) return null

  return (
    <>
      <div className="profile">
        <ProfileDetails
          data={data.profile}
          my_id={user.id}
          config={config}
        />
        <div className="posts">
          {
            data.posts.map((post, i) => {
              return (
                <PostCard
                  key={i}
                  data={{
                    ...post,
                    user: {
                      ...data.profile
                    }
                  }}
                  my_id={user.id}
                  openModal={() => setIsSharing(true)}
                  setShareData={setShareData}
                />
              )
            })
          }
          {
            data.posts.length === 0 && <NoPosts h={'40vh'} />
          }
        </div>
      </div>
      <CustomBottomSheet open={isSharing}>
        <SharePost close={() => setIsSharing(false)} data={shareData} />
      </CustomBottomSheet>
    </>
  )
}

export default Profile