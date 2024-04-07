/* eslint-disable react/prop-types */
import { Modal } from "antd"
import EditAvatar from "../Avatar/EditAvatar"

const ProfilePictureModal = ({ open, setOpen, user, handleChange, imageLoading, image, currentUser, uploadProfileImage, progress }) => {
    return (
        <Modal
            title={user?.displayName}
            centered
            open={open}
            onOk={() => setOpen(!open)}
            onCancel={() => setOpen(!open)}
            footer={[]}
        >
            <div className="flex justify-center">
                <EditAvatar src={image || user?.photoURL} handleChange={handleChange} imageLoading={imageLoading} isUser={user?.email === currentUser?.email} progress={progress} />
            </div>
            {user?.email === currentUser?.email &&
                <div className="flex justify-center" >
                    <button
                        className="bg-[#0073b1] text-white hover:opacity-90 w-[300px] h-[50px] rounded-full outline-none border-none font-[600] text-[18px] mt-[20px]"
                        onClick={uploadProfileImage}
                    >
                        Save
                    </button>
                </div>
            }
        </Modal>
    )
}


export default ProfilePictureModal