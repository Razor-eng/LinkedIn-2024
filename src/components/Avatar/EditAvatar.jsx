import { Space, Progress } from 'antd'

/* eslint-disable react/prop-types */
const EditAvatar = ({ src, handleChange, imageLoading, isUser, progress }) => {
    return (
        <div className="relative overflow-hidden shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-48 h-48 rounded-full p-1 border-2 border-gray-300  hover:scale-105 hover:opacity-90">
            {imageLoading ?
                <Space className='w-full h-full rounded-full'>
                    <Progress type='circle' percent={progress} className='text-center flex justify-center items-center' size={180} />
                </Space>
                :
                <img
                    src={src ? src : "/images/user.png"}
                    className='rounded-full w-full h-full'
                />
            }
            {isUser &&
                <input
                    className="absolute w-full h-full cursor-pointer top-0 left-0 opacity-0" type="file" accept="image/*"
                    onChange={e => handleChange(e)}
                />
            }
        </div>
    )
}

export default EditAvatar