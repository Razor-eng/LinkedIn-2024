import SignupForm from "../components/Form/SignupForm"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import Spinner from "../components/Spinner/Spinner";

const Signup = () => {
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [navigate, user])

    return (
        <>
            {loading || user ?
                <Spinner />
                :
                <SignupForm />
            }
        </>
    )
}

export default Signup