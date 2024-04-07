/* eslint-disable react/prop-types */
const ProfileAvatar = ({ src, open, setOpen }) => {
    return (
        <div className="shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-40 h-40 rounded-full p-1 border-2 border-gray-300" onClick={() => setOpen(!open)}>
            <img
                src={src ? src : "/images/user.png"}
                className='rounded-full w-full h-full'
            />
        </div>
    )
}

export default ProfileAvatar