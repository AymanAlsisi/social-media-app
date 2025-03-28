import "./style.css"

const IconBtn = ({ name, color, size, action, style }) => {
    return (
        <button type="button" onClick={action} className='icon-btn' style={{ color: color, fontSize: size, ...style }}>
            <ion-icon name={name} />
        </button >
    )
}

export default IconBtn