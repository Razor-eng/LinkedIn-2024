/* eslint-disable react/prop-types */
import { useMemo, useState } from "react"
import PostModal from "../Modal/Modal";
import { PostMessage, deleteMessage, getPosts, updateMessage } from "../../api/FirestoreApi";
import PostCard from "../Card/PostCard";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import getUid from "../../helpers/getUid";
import Avatar from "../Avatar/Avatar";
import { uploadImage } from "../../api/ImageUpload";

const Post = ({ user, currentUser }) => {
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
        setPostImage(post?.imageURL);
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
            email: user?.email,
            timeStamp: getCurrentTimeStamp('LLL'),
            photoURL: user?.photoURL,
            displayName: user?.displayName,
            postID: getUid(),
            userID: user?.id,
            imageURL: postImage
        };
        await PostMessage(postData);
        await setModal(false);
        await setMessage('');
        setEdit(false);
        setPostImage('');
    }

    useMemo(() => {
        getPosts(setPosts)
    }, [])

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="w-full md:w-[80%] h-[140px] bg-white mt-16 border border-zinc-200 rounded-md flex flex-col justify-center items-center pb-8 relative">
                <div className="flex flex-col items-center gap-3 justify-center absolute bottom-6">
                    <img
                        src={currentUser?.photoURL || '/images/user.png'}
                        alt=""
                        className="w-[100px] h-[100px] object-cover rounded-full mt-[30px] border border-[#b7b7b7] p-1"
                    />
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-semibold">{currentUser?.displayName}</p>
                        <p className="text-zinc-500 text-sm font-medium">{currentUser?.headline}</p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[80%] h-[120px] bg-white mt-6 border border-zinc-200 rounded-md flex justify-center items-center">
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
            <div className="w-full md:w-[80%]">
                {posts.map((post, id) => (
                    <PostCard key={id} post={post} user={user} currentUser={currentUser} getEditData={getEditData} deletePost={deletePost} />
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

export default Post