/* eslint-disable react/prop-types */
const PostAvatar = ({ src }) => {
    return (
        <div className="w-12 h-12 rounded-full">
            <img
                src={src ? src : "/images/user.png"}
                className='rounded-full w-full h-full'
            />
        </div>
    )
}

export default PostAvatar