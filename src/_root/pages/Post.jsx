import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import "../CSS/Post.css"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { PostCard, SharePost } from "../shared"
import { CustomBottomSheet } from '../../components'

const Post = () => {
  const { token, user } = useStateProvider()
  const [post, setPost] = useState(null)
  const { post_id } = useParams()


  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const fetchPostData = async () => {
    try {
      const res = await axios.get(`${protocols.http}/post?post_id=${post_id}`, config)
      setPost(res.data.post)
    } catch (error) {
      console.log(error)
    }
  }

  const [isSharing, setIsSharing] = useState(false)
  const [shareData, setShareData] = useState(null)

  useEffect(() => {
    fetchPostData()
  }, [])

  if (!post) return null

  return (
    <>
      <div className="post">
        <PostCard data={post} my_id={user.id} setShareData={setShareData} openModal={() => setIsSharing(true)} />
      </div>
      <CustomBottomSheet open={isSharing}>
        <SharePost close={() => setIsSharing(false)} data={shareData} />
      </CustomBottomSheet>
    </>
  )
}

export default Post