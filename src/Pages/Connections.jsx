import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardNavbar from "../components/Navbar/DashboardNavbar";
import Spinner from "../components/Spinner/Spinner";
import MobileDashboardNavbar from "../components/Navbar/MobileDashboardNavbar";
import { getCurrentUser } from "../api/FirestoreApi";
import ConnectionsBody from "../components/Body/ConnectionsBody";

const Connections = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth)
    const [curentUser, setCurentUser] = useState([]);

    useMemo(() => {
        if (user) {
            getCurrentUser(user.email, setCurentUser)
        }
    }, [user])

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/');
            }
        }
    }, [loading, navigate, user])

    return (
        <>
            <title>Connections | LinkedIn</title>
            {
                loading || !user ?
                    <Spinner />
                    :
                    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden overflow-y-hidden">
                        <div className="w-full bg-white">
                            <MobileDashboardNavbar user={curentUser} />
                            <DashboardNavbar user={curentUser} />
                        </div>
                        <div className="flex-1 bg-[#F4F2EE]">
                            <ConnectionsBody currentUser={curentUser} />
                        </div>
                    </div>
            }
        </>
    )
}

export default Connections