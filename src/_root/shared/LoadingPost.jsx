const LoadingPost = () => {
    return (
        <div className='post-card-loading'>
            <div className="top">
                <div className="user">
                    <div className="user-img"></div>
                    <div className="text">
                        <div className='username'></div>
                        <div className='time'></div>
                    </div>
                </div>
                <div className="caption"></div>
            </div>
            <div className='post-img'></div>
        </div>
    )
}

export default LoadingPost