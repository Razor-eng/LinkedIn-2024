/* eslint-disable react/prop-types */
import { useState } from "react"
import ProfileCard from "../Card/ProfileCard"
import ProfilePost from "../Post/ProfilePost";
import ProfileEditModal from "../Modal/ProfileEditModal";

const ProfileBody = ({ user, currentUser }) => {
    const [edit, setEdit] = useState(false);
    const onEdit = () => {
        setEdit(!edit);
    }

    return (
        <div className="flex flex-col items-center min-w-[70vw]">
            <ProfileEditModal open={edit} setOpen={onEdit} user={user} />
            <ProfileCard user={user} onEdit={onEdit} currentUser={currentUser} />
            <ProfilePost user={user} currentUser={currentUser} />
        </div>
    )
}

export default ProfileBody