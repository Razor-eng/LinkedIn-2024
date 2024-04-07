/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import LikeButton from "../Button/LikeButton";
import { commentPost, getComments, getConnections, getCurrentUser, likePost } from "../../api/FirestoreApi";
import CommentButton from "../Button/CommentButton";
import CommentInput from "../Input/CommentInput";
import ShareButton from "../Button/ShareButton";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import getUid from "../../helpers/getUid";
import Comments from "./Comments";
import { BsPencil, BsTrash } from 'react-icons/bs'

const PostCard = ({ post, user, currentUser, getEditData, deletePost }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [postUser, setPostUser] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (post && user) {
            setLike(post.likes?.includes(currentUser?.id) || false);
            setLikesCount(post?.likes?.length);
            getComments(post.id, setComments);
            getCurrentUser(post?.email, setPostUser);
        }
    }, [currentUser?.id, post, user])

    const onLike = () => {
        setLike(!like);
        likePost(currentUser.id, post.id);
    }

    const onComment = () => {
        let commentData = {
            email: currentUser.email,
            comment: comment,
            timeStamp: getCurrentTimeStamp('LLL'),
            commentID: getUid(),
            postId: post.id
        }
        commentPost(commentData);
        setComment('');
    }

    useEffect(() => {
        if (currentUser && post) {
            getConnections(currentUser?.id, post?.userID, setIsConnected);
        }
    }, [currentUser, post])

    return (
        (isConnected || post?.email === currentUser?.email) &&
        <div className="w-full min-h-44 bg-white mt-[30px] border border-zinc-200 rounded-md flex flex-col justify-between pb-4 group">
            <div onClick={() => setIsComment(false)}>
                <div className="flex p-2 border-b border-zinc-200 justify-between pr-5">
                    <div className="flex">
                        <img
                            src={postUser?.photoURL || '/images/user.png'}
                            alt=""
                            className="w-12 rounded-full border"
                        />
                        <div>
                            <p
                                className="text-[16px] font-[500] text-[rgba(0,0,0,.7)] ml-[10px] mt-[10px] hover:text-[#0A66C2] hover:underline cursor-pointer w-fit"
                                onClick={() =>
                                    navigate(`/${post?.displayName.split(' ').join('')}`, {
                                        state: { id: post?.id, email: post.email }
                                    })
                                }
                            >
                                {post?.displayName}
                            </p>
                            <p className="text-[12px] text-gray-400 font-[400] ml-[10px]">{post.timeStamp}</p>
                        </div>
                    </div>
                    {
                        post?.email === currentUser?.email &&
                        <div className="group-hover:flex hidden gap-2">
                            <button className="p-3 px-4 hover:bg-zinc-200 rounded-full text-gray-500 hover:text-black transition-all duration-300 ease-in-out" onClick={() => getEditData(post)}><BsPencil size={18} /></button>
                            <button className="p-3 px-4 hover:bg-zinc-200 rounded-full text-gray-500 hover:text-red-600  transition-all duration-300 ease-in-out" onClick={() => deletePost(post)}><BsTrash size={18} /></button>
                        </div>
                    }
                </div>
                <div>
                    <p className="text-left ml-[10px] mt-[8px] min-h-10 text-[14px] font-[400] text-[rgba(0,0,0,.9)]">{post.message}</p>
                    {post?.imageURL &&
                        <div className="flex justify-center px-20">
                            <img src={post?.imageURL} alt="" className="w-full h-auto md:h-96 rounded-2xl" />
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-col mt-5">
                {
                    likesCount > 0 &&
                    <p className="text-gray-400 font-medium text-xs ml-2">{likesCount} People like this Post</p>
                }
                <div className="flex border-t border-zinc-200 w-full mt-2">
                    <LikeButton like={like} onLike={onLike} />
                    <CommentButton comment={isComment} setComment={setIsComment} />
                    <ShareButton />
                </div>
                {isComment &&
                    <>
                        <CommentInput value={comment} setValue={setComment} onComment={onComment} />
                        <div className="mx-6 bg-zinc-100">
                            {(comments.length > 0) &&
                                comments.map((comment, id) => id < 3 && (
                                    <Comments comment={comment} key={id} />
                                ))}
                        </div>
                    </>
                }
                {
                    !isComment &&
                    (comments.length !== 0) &&
                    <p
                        className="text-slate-500 text-xs ml-6 font-medium mt-2 cursor-pointer hover:underline"
                        onClick={() => setIsComment(!isComment)}
                    >
                        View {comments.length > 3 ? 'all' : comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}
                    </p>
                }
            </div>
        </div>
    )
}

export default PostCard