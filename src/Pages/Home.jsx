import HomeBody from "../components/Body/HomeBody"
import HomeNavbar from "../components/Navbar/HomeNavbar"
import Spinner from "../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";

const Home = () => {
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [navigate, user])

    return (
        <>
            <title>LinkedIn: Log In or Sign Up</title>
            {loading || user ?
                <Spinner />
                :
                <div className="h-screen w-screen flex flex-col pl-4 md:pl-44 overflow-x-hidden overflow-y-scroll bg-white">
                    <div className="md:pr-44 pt-2 md:py-4">
                        <HomeNavbar />
                    </div>
                    <div className="flex-1 pt-2 md:pt-10">
                        <HomeBody />
                    </div>
                </div>
            }
        </>
    )
}

export default Home