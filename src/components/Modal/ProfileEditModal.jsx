/* eslint-disable react/prop-types */
import { Modal } from "antd"
import { useState } from "react";
import { updateCurrentUser } from "../../api/FirestoreApi";
import EditInput from "../Input/EditInput";

const ProfileEditModal = ({ open, setOpen, user }) => {
    const [name, setName] = useState('');
    const [headline, setHeadline] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [college, setCollege] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [skills, setSkills] = useState('');

    const resetData = () => {
        setName('');
        setHeadline('');
        setLocation('');
        setCompany('');
        setCollege('');
        setWebsite('');
        setAbout('');
        setSkills('');
    }

    const updateProfile = () => {
        let updatedUser = {
            displayName: name || user?.displayName,
            headline: headline || user?.headline || '',
            location: location || user?.location || '',
            company: company || user?.company || '',
            college: college || user?.college || '',
            website: website || user?.website || '',
            about: about || user?.about || '',
            skills: skills || user?.skills || ''
        }
        updateCurrentUser(user.id, updatedUser);
        resetData();
        setOpen();
    }
    return (
        <Modal
            title='Edit Profile'
            centered
            open={open}
            onOk={setOpen}
            onCancel={setOpen}
            footer={[]}
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">Name</label>
                    <EditInput
                        placeholder={user?.displayName || 'Name'}
                        value={name || user?.displayName}
                        setValue={setName}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">Headline</label>
                    <EditInput
                        placeholder={user?.headline || 'Headline'}
                        value={headline || user?.headline}
                        setValue={setHeadline}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">Location</label>
                    <EditInput
                        placeholder={user?.location || 'Location'}
                        value={location || user?.location}
                        setValue={setLocation}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">Company</label>
                    <EditInput
                        placeholder={user?.company || 'Company'}
                        value={company || user?.company}
                        setValue={setCompany}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">College</label>
                    <EditInput
                        placeholder={user?.college || 'College'}
                        value={college}
                        setValue={setCollege || user?.college}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">Website</label>
                    <EditInput
                        placeholder={user?.website || 'Website'}
                        value={website || user?.website}
                        setValue={setWebsite}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">About</label>
                    <EditInput
                        placeholder={user?.about || 'About Me'}
                        value={about || user?.about}
                        setValue={setAbout}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="ml-1 font-semibold text-zinc-500">Skills</label>
                    <EditInput
                        placeholder={user?.skills || 'Skills'}
                        value={skills || user?.skills}
                        setValue={setSkills}
                    />
                </div>
            </div>
            <div className="flex justify-center" onClick={updateProfile}>
                <button className="bg-[#0073b1] text-white hover:opacity-90 w-[300px] h-[50px] rounded-full outline-none border-none font-[600] text-[18px] mt-[20px]">Save</button>
            </div>
        </Modal>
    )
}

export default ProfileEditModal