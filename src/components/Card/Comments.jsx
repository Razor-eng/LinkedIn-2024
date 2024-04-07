/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../../api/FirestoreApi';
import { useNavigate } from "react-router-dom"

const Comments = ({ comment }) => {
    const navigate = useNavigate();
    const [commentUser, setCommentUser] = useState([]);
    useEffect(() => {
        getCurrentUser(comment.email, setCommentUser);
    }, [comment.email])

    return (
        <>
            <div className="flex gap-2 p-2 border-b border-zinc-200 border-x pb-4">
                <div className="mt-2">
                    <img src={commentUser.photoURL || 'images/user.png'} alt="user" className="rounded-full w-8" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h2
                            className="font-medium hover:text-[#0A66C2] hover:underline cursor-pointer"
                            onClick={() =>
                                navigate(`/profile/${comment.displayName.split(' ').join('')}`, {
                                    state: { id: comment?.postId, email: comment.email }
                                })
                            }
                        >
                            {commentUser.displayName}
                        </h2>
                        <p className="text-xs font-medium text-zinc-400">{comment.timeStamp}</p>
                    </div>
                    <p className="text-zinc-600 text-sm font-medium">{comment.comment}</p>
                </div>
            </div>
        </>
    )
}

export default Comments