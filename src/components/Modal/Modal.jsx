/* eslint-disable react/prop-types */
import { Button, Modal } from "antd"
import { AiOutlinePicture } from "react-icons/ai"
import PostAvatar from "../Avatar/PostAvatar"
import { Space, Progress } from 'antd'

const PostModal = ({ open, setOpen, message, setMessage, postMessage, user, edit, updatePost, getPostImage, postImage, imageLoading, progress }) => {
    return (
        <Modal
            title={`${edit ? 'Edit the' : 'Create a'} Post`}
            centered
            open={open}
            onOk={() => {
                setOpen(false);
                setMessage('');
            }}
            onCancel={() => {
                setOpen(false);
                setMessage('');
            }}
            footer={[
                <Button
                    key={"submit"}
                    type="primary"
                    disabled={!message}
                    onClick={edit ? updatePost : postMessage}
                >
                    {edit ? 'Update' : 'Post'}
                </Button>
            ]}
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-3 border-b pb-2">
                        <PostAvatar src={user?.photoURL} />
                        <h2 className="font-normal text-[18px] text-zinc-700">{user?.displayName}</h2>
                    </div>
                    <textarea
                        type="text"
                        placeholder="What do you want to talk about?"
                        className="bg-white outline-none text-black font-[400] w-full p-1 resize-none mt-2"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    {imageLoading ? (
                        <Space className='w-full h-full flex justify-center rounded-full'>
                            <Progress type='circle' percent={progress} className='text-center flex justify-center items-center' size={180} />
                        </Space>
                    ) : (
                        postImage &&
                        <div className="flex w-full justify-center">
                            <img src={postImage} alt="" className="w-96 h-96 object-cover rounded-2xl" />
                        </div>
                    )}
                </div>
                {!edit &&
                    <label>
                        <AiOutlinePicture size={25} className="text-[#3eb8fa] hover:text-[#0073b1] transition-all duration-150 ease-in-out cursor-pointer" />
                        <input
                            type="file"
                            hidden
                            onChange={e => getPostImage(e)}
                        />
                    </label>
                }
            </div>
        </Modal>
    )
}

export default PostModal