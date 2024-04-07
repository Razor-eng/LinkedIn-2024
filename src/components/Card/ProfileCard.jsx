/* eslint-disable react/prop-types */
import { HiOutlinePencil } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { uploadImage } from '../../api/ImageUpload';
import { updateCurrentUserPicture } from '../../api/FirestoreApi';
import ProfilePictureModal from '../Modal/ProfilePictureModal';
import ProfileAvatar from '../Avatar/ProfileAvatar';

const ProfileCard = ({ user, onEdit, currentUser }) => {
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    function handleChange(e) {
        setImageLoading(true);
        uploadImage(e.target.files[0], setImage, setImageLoading, setProgress);
    }

    const uploadProfileImage = () => {
        updateCurrentUserPicture(user.id, image);
        setImage('');
    }

    return (
        <>
            <ProfilePictureModal open={open} setOpen={setOpen} user={user} handleChange={handleChange} imageLoading={imageLoading} image={image} currentUser={currentUser} uploadProfileImage={uploadProfileImage} progress={progress} />
            <div className="w-full md:w-[50vw] text-slate-800 bg-white shadow-sm m-[30px] mb-0 rounded-sm p-[20px] relative pb-[30px] z-0">
                <div className="flex justify-between px-6">
                    <div className='flex flex-col gap-1 w-full'>
                        <div className='w-full'>
                            <div className="relative">
                                <ProfileAvatar src={user?.photoURL} open={open} setOpen={setOpen} />
                                {currentUser?.email === user?.email &&
                                    <div className="cursor-pointer absolute md:hidden top-40 right-0" onClick={onEdit}>
                                        <button className="p-3 rounded-full hover:bg-zinc-200 text-zinc-500"><HiOutlinePencil size={20} /></button>
                                    </div>
                                }
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                                <div className='h-fit'>
                                    <h3 className="text-[rgba(0,0,0,.9)] font-[600] text-[24px]">{user?.displayName}</h3>
                                    <p className="text-[rgba(0,0,0,.9)] font-[400] mt-1 text-[14px] w-[300px] leading-[20px]">{user?.headline}</p>
                                </div>
                                <div className="w-72 mt-3 text-[rgba(0,0,0,.7)] h-fit text-[14px] font-[500] md:text-end">
                                    {currentUser?.email === user?.email &&
                                        <div className="cursor-pointer w-full text-end hidden md:block" onClick={onEdit}>
                                            <button className="p-3 rounded-full hover:bg-zinc-200 text-zinc-500"><HiOutlinePencil size={18} /></button>
                                        </div>
                                    }
                                    <div className='md:p-3 pb-3 md:pb-0 mr-2'>
                                        <p className="leading-4">{user?.college}</p>
                                        <p className="mt-2">{user?.company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <p className="">{user?.location}</p>
                            <Link to={user?.website} target='_blank' className='text-[#004c75] underline hover:text-[#3b8cdc]'>{user?.website}</Link>
                            <p className="">{user?.about}</p>
                            {user?.skills &&
                                <p className="font-[500] text-sm"><span className='font-[700]'>Skills :</span> {user?.skills}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard