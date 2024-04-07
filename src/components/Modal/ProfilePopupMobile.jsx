/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { Logout } from "../../api/AuthApi"
import Button from "../Button/Button";
import PopupAvatar from "../Avatar/PopupAvatar";

const ProfilePopupMobile = ({ user, open }) => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div className={`${open ? 'block' : 'hidden'} z-50 bg-white w-[200px] border border-[#a8a8a8] flex justify-center absolute mt-12 right-[-50px] px-4 pb-4 flex-col`}>
                <div className="flex justify-center">
                    <PopupAvatar src={user?.photoURL} />
                </div>
                <p className='text-[16px] text-[rgba(0,0,0,.9)] font-[600] text-left'>{user?.displayName}</p>
                <p className='text-[13px] text-[rgba(0,0,0,.6)] font-[400] mt-1 leading-4'>{user?.headline}</p>
                <ul className='flex flex-col gap-2 w-full mt-3'>
                    <Button
                        onClick={() =>
                            navigate(`/${user?.displayName.split(' ').join('')}`, {
                                state: { id: user?.id, email: user?.email }
                            })
                        }
                        title={'View Profile'}
                    />
                    <Button
                        onClick={Logout}
                        title={'Logout'}
                    />
                </ul>
            </div>
        </div>
    )
}

export default ProfilePopupMobile
