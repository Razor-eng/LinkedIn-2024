import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { setUser } from './FirestoreApi';

export const LoginApi = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password).then(() => {
            toast.success('Logged in Successfully');
        })
    } catch (error) {
        toast.error('Invalid Email or Password')
    }
}

export const RegisterApi = async (user, password) => {
    try {
        await createUserWithEmailAndPassword(auth, user.email, password).then(() => {
            setUser(user);
            toast.success('User created Successfully');
        })
    } catch (error) {
        toast.error('Email is already in use!')
    }
}

export const GoogleApi = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((res) => {
            let user = {
                email: res.user.email,
                displayName: res.user.displayName,
                photoURL: res.user.photoURL
            }
            setUser(user).then(() => {
                toast.success('Signed in successfully');
            });
        });
    } catch (error) {
        toast.error(error.message)
    }
}

export const Logout = async () => {
    try {
        await signOut(auth).then(() => {
            toast.success('Logged Out');
        });
    } catch (error) {
        toast.error(error.message)
    }
}