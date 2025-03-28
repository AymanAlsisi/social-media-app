import { useNavigate } from "react-router"
import { IoImagesOutline } from "react-icons/io5"

const NoPosts = ({ page, h }) => {
    const navigate = useNavigate()
    return (
        <div className="no-posts" style={{ height: h }}>
            <IoImagesOutline size={80} />
            <h3>No posts yet</h3>
            {
                page === 'home' && <div className="no-posts-home">
                    <p>No posts to show since you are not following any user, or the users you are following haven't made posts yet.</p>
                    <button onClick={() => navigate('/search')}>Find users</button>
                </div>
            }
        </div >
    )
}

export default NoPosts