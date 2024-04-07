import { useState } from "react"
import EditInput from "../Input/EditInput"
import { IoMdArrowRoundBack } from "react-icons/io";
import { updateCurrentUser } from "../../api/FirestoreApi";

/* eslint-disable react/prop-types */
const ProfileEditCard = ({ user, onEdit }) => {
    const [name, setName] = useState('');
    const [headline, setHeadline] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [college, setCollege] = useState('');

    const updateProfile = () => {
        let updatedUser = {
            displayName: name || user.displayName,
            headline: headline || user.headline,
            location: location || user.location,
            company: company || user.company,
            college: college || user.college
        }
        updateCurrentUser(user.id, updatedUser);
        onEdit();
    }

    return (
        <div className="min-w-[70vw] min-h-[50vh] bg-white shadow-sm m-[30px] rounded-sm p-[20px] relative">
            <div className="absolute left-[10px] cursor-pointer bg-gray-100 hover:bg-gray-200 text-zinc-800  rounded-md transition-all duration-150 ease-in-out" onClick={onEdit}>
                <button className="px-5 py-2 flex justify-center items-center gap-2">
                    <IoMdArrowRoundBack fontSize={20} />
                </button>
            </div>
            <div className="flex flex-col gap-6 mt-12">
                <div className="flex flex-col gap-1">
                    <label className="ml-1 text-lg text-zinc-500">Name</label>
                    <EditInput
                        placeholder={user.displayName || 'Name'}
                        value={name}
                        setValue={setName}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 text-lg text-zinc-500">Headline</label>
                    <EditInput
                        placeholder={user.headline || 'Headline'}
                        value={headline}
                        setValue={setHeadline}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 text-lg text-zinc-500">Location</label>
                    <EditInput
                        placeholder={user.location || 'Location'}
                        value={location}
                        setValue={setLocation}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 text-lg text-zinc-500">Company</label>
                    <EditInput
                        placeholder={user.company || 'Company'}
                        value={company}
                        setValue={setCompany}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 text-lg text-zinc-500">College</label>
                    <EditInput
                        placeholder={user.college || 'College'}
                        value={college}
                        setValue={setCollege}
                    />
                </div>
            </div>
            <div className="flex justify-center" onClick={updateProfile}>
                <button className="bg-[#0073b1] text-white hover:opacity-90 w-[300px] h-[50px] rounded-full outline-none border-none font-[600] text-[18px] mt-[20px]">Save</button>
            </div>
        </div>
    )
}

export default ProfileEditCard