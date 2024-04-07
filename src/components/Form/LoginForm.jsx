/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
import { useState } from 'react';
import Input from '../Input/Input';
import { GoogleApi, LoginApi } from '../../api/AuthApi';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const login = () => {
        if (email && password) {
            let emailValidate = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (emailValidate) {
                if (password.length < 5) {
                    toast.error('Enter a valid Password!');
                } else {
                    LoginApi(email, password);
                }
            } else {
                toast.error('Enter a valid Email id!');
            }
        } else {
            toast.error('Invalid Email or Password');
        }
    }

    const googleLogin = () => {
        GoogleApi();
    }

    return (
        <>
            <title>Login | LinkedIn</title>
            <div className='w-screen h-screen flex justify-center bg-[#F3F2F0]'>
                <div className='flex flex-col mt-8 items-center'>
                    <div className='mt-4 h-fit flex flex-col items-center gap-6'>
                        <Logo size={'text-xl'} />
                        <div className='flex flex-col items-center gap-2'>
                            <h2 className='font-semibold text-2xl'>Welcome Back</h2>
                            <p className='text-gray-500'>{"Don't"} miss your next opportunity. Sign in to stay updated on your professional world.</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-5 border p-10 bg-white mt-5'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Email">Email or Phone number</label>
                            <Input type={'email'} placeholder={'Enter your Email'} value={email} setValue={setEmail} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Password">Password</label>
                            <div className='flex relative'>
                                <Input type={show ? 'text' : 'password'} placeholder={'Enter your Password'} value={password} setValue={setPassword} />
                                <h2 className='font-medium absolute right-3 top-3 text-[#0077B5] hover:underline cursor-pointer' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</h2>
                            </div>
                        </div>
                        <div className='w-full'>
                            <button
                                className="w-full p-3 cursor-pointer bg-[#0A66C2] hover:opacity-90 text-white font-medium rounded-full"
                                onClick={login}
                            >
                                Login to Linkedin
                            </button>
                        </div>
                        <div className='flex w-full justify-center items-center gap-3'>
                            <p className='border-b border-gray-400 w-[40%]'></p>
                            <p className='text-lg'>or</p>
                            <p className='border-b border-gray-400 w-[40%]'></p>
                        </div>
                        <div className='w-60'>
                            <button
                                className="w-full cursor-pointer bg-[#4285F4] hover:opacity-90 text-white flex items-center gap-5 font-medium border p-2 rounded-lg"
                                onClick={googleLogin}
                            >
                                <div className='bg-white h-8 flex items-center justify-center w-8'>
                                    <img src="/images/google.png" alt="" className='w-6 h-6' />
                                </div>
                                <p className='font-medium'>
                                    Continue with Google
                                </p>
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <h2 className=' font-medium'>New to LinkedIn?
                                <Link to={'/signup'}>
                                    <span className='text-[#0A66C2] cursor-pointer hover:underline'> Join Now</span>
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm