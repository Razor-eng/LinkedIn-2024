import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Spinner from "../components/Spinner/Spinner";
import ProfileBody from "../components/Body/ProfileBody";
import DashboardNavbar from "../components/Navbar/DashboardNavbar";
import MobileDashboardNavbar from "../components/Navbar/MobileDashboardNavbar";
import { getCurrentUser } from "../api/FirestoreApi";

const UserProfile = () => {
    const [user, loading] = useAuthState(auth)
    const location = useLocation();
    const [userEmail, setUserEmail] = useState('');
    const [curentUser, setCurentUser] = useState([]);
    const [newUser, setNewUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getCurrentUser(user.email, setCurentUser);
            getCurrentUser(userEmail, setNewUser);
        }
    }, [user, userEmail])

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/');
            }
            setUserEmail(location.state.email);
        }
    }, [loading, location.state.email, navigate, user])

    return (
        <>
            <title>{newUser?.displayName} | LinkedIn</title>
            {loading || !user ?
                <Spinner />
                :
                <div className="min-h-screen w-screen flex flex-col overflow-x-hidden">
                    <div className="w-full bg-white">
                        <MobileDashboardNavbar user={curentUser} />
                        <DashboardNavbar user={curentUser} />
                    </div>
                    <div className="flex-1 bg-[#F4F2EE]">
                        <ProfileBody user={newUser} currentUser={curentUser} />
                    </div>
                </div>
            }
        </>
    )
}

export default UserProfile