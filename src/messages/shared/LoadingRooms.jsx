const LoadingRooms = () => {
    const array = ['', '', '', '', '', '']
    return (
        <div className="rooms-loading">
            {
                array.map((e, i) => {
                    return (
                        <div key={i} className="room-loading">
                            <div className="img"></div>
                            <div className="text">
                                <div className="username"></div>
                                <div className="message"></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LoadingRooms