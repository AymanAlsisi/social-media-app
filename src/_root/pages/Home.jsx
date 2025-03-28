import { useEffect, useState } from 'react'
import axios from 'axios'
import { PostCard, LoadingPost, SharePost, NoPosts } from '../shared'
import "../CSS/Home.css"
import { useStateProvider } from '../../context/StateProvider'
import { protocols } from '../../api/protocols'
import { CustomBottomSheet } from '../../components'

const Home = () => {
  const { token, user } = useStateProvider()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${protocols.http}/home`, config)
      setPosts(res.data.posts)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const [isSharing, setIsSharing] = useState(false)
  const [shareData, setShareData] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className="home">
        {
          !isLoading ? (
            posts.map((item, i) => {
              return (
                <PostCard
                  key={i}
                  data={item}
                  my_id={user.id}
                  config={config}
                  openModal={() => setIsSharing(true)}
                  setShareData={setShareData}
                />
              )
            })
          )
            :
            (
              ['', '', '', '', '', ''].map((card, i) => {
                return (
                  <LoadingPost key={i} />
                )
              })
            )
        }
        {
          posts.length === 0 && <NoPosts page={'home'} h={'50vh'} />
        }
      </div>
      <CustomBottomSheet open={isSharing}>
        <SharePost close={() => setIsSharing(false)} data={shareData} />
      </CustomBottomSheet>
    </>
  )
}

export default Home