/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import PostModal from "../Modal/Modal";
import { PostMessage, deleteMessage, getUserPosts, updateMessage } from "../../api/FirestoreApi";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import getUid from "../../helpers/getUid";
import ProfilePostCard from "../Card/ProfilePostCard";
import { uploadImage } from "../../api/ImageUpload";
import Avatar from "../Avatar/Avatar";

const ProfilePost = ({ user, currentUser }) => {
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [postToUpdate, setPostToUpdate] = useState({});
    const [postImage, setPostImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const getPostImage = (e) => {
        setImageLoading(true);
        uploadImage(e.target.files[0], setPostImage, setImageLoading, setProgress);
    }
    const getEditData = (post) => {
        setMessage(post?.message);
        setModal(true);
        setEdit(true);
        setPostToUpdate(post);
        setPostImage(post?.imageURL)
    }

    const updatePost = () => {
        let postData = {
            message: message
        }
        updateMessage(postToUpdate.id, postData);
        setEdit(false);
        setMessage('');
        setModal(false);
    }

    const deletePost = (post) => {
        deleteMessage(post.id);
    }

    const postMessage = async () => {
        let postData = {
            message: message,
            email: user.email,
            timeStamp: getCurrentTimeStamp('LLL'),
            photoURL: user.photoURL,
            displayName: user.displayName,
            postID: getUid(),
            imageURL: postImage
        };

        await PostMessage(postData);
        await setModal(false);
        await setMessage('');
        setEdit(false);
        setPostImage('');
    }

    useEffect(() => {
        if (user) {
            getUserPosts(setPosts, user.email)
        }
    }, [user])

    return (
        <div className="flex items-center flex-col w-full md:w-[50%]">
            {currentUser?.email === user?.email &&
                <div className="w-full h-[120px] bg-white mt-6 border border-zinc-200 rounded-md flex justify-center items-center">
                    <div className="w-full flex items-center gap-4 ml-3">
                        <Avatar src={currentUser?.photoURL} />
                        <button
                            className="w-[80%] h-[50px] text-left text-zinc-500 text-sm hover:bg-[#dcdbdb] outline-none border border-[#b7b7b7] rounded-full cursor-pointer p-[15px] flex items-center font-sans font-[600]"
                            onClick={() => {
                                setModal(true);
                                setEdit(false);
                            }}
                        >
                            Start a Post
                        </button>
                    </div>
                </div>
            }
            <div className="w-full">
                {posts.map((post, id) => (
                    <ProfilePostCard key={id} post={post} user={user} currentUser={currentUser} getEditData={getEditData} deletePost={deletePost} />
                ))}
            </div>
            <PostModal
                user={currentUser}
                open={modal}
                setOpen={setModal}
                message={message}
                setMessage={setMessage}
                postMessage={postMessage}
                edit={edit}
                updatePost={updatePost}
                getPostImage={getPostImage}
                postImage={postImage}
                imageLoading={imageLoading}
                progress={progress}
            />
        </div>

    )
}

export default ProfilePost