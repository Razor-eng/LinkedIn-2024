/* eslint-disable no-useless-escape */
import { useState } from 'react';
import Input from '../Input/Input';
import { RegisterApi } from '../../api/AuthApi';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);

    const signup = () => {
        if (email && password && name) {
            let emailValidate = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (emailValidate) {
                if (password.length < 5) {
                    toast.error('Enter a valid Password!');
                } else {
                    let user = {
                        email: email,
                        displayName: name,
                        photoURL: null
                    };
                    RegisterApi(user, password);
                }
            } else {
                toast.error('Enter a valid Email!');
            }
        } else {
            toast.error('Fields cannot be empty!');
        }
    }

    return (
        <>
            <title>Sign Up | LinkedIn</title>
            <div className='w-screen h-screen flex justify-center bg-[#F3F2F0]'>
                <div className='flex flex-col mt-4 items-center'>
                    <div className='mt-4 h-fit w-[100vw] flex flex-col gap-6'>
                        <div className='ml-48'>
                            <Logo size={'text-3xl'} />
                        </div>
                        <div className='flex flex-col items-center'>
                            <h2 className='text-3xl'>Make the most of your professional life</h2>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-5 border p-10 bg-white mt-5'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Name">Full Name</label>
                            <Input type={'text'} placeholder={'Enter your Full Name'} value={name} setValue={setName} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Email">Email or Phone number</label>
                            <Input type={'email'} placeholder={'Enter your Email'} value={email} setValue={setEmail} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Password">Password (6+ characters)</label>
                            <div className='flex relative'>
                                <Input type={show ? 'text' : 'password'} placeholder={'Enter your Password'} value={password} setValue={setPassword} />
                                <h2 className='font-medium absolute right-3 top-3 text-[#0077B5] hover:underline cursor-pointer' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</h2>
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 max-w-96 pl-5'>By clicking Agree & Join, you agree to the LinkedIn
                                <span className='text-[#0077B5] font-semibold cursor-pointer'> User Agreement</span>,
                                <span className='text-[#0077B5] font-semibold cursor-pointer'> Privacy Policy</span>, and
                                <span className='text-[#0077B5] font-semibold cursor-pointer'> Cookie Policy.</span>
                            </p>
                        </div>
                        <div className='w-full'>
                            <button
                                className="w-full p-3 cursor-pointer bg-[#0A66C2] text-white rounded-full font-medium"
                                onClick={signup}
                            >
                                Agree & Join
                            </button>
                        </div>
                        <div className='flex w-full justify-center items-center gap-3'>
                            <p className='border-b border-gray-400 w-[40%]'></p>
                            <p className='text-lg'>or</p>
                            <p className='border-b border-gray-400 w-[40%]'></p>
                        </div>
                        <div className="flex flex-col">
                            <h2 className=' font-medium'>Already on LinkedIn?
                                <Link to={'/login'}>
                                    <span className='text-[#0A66C2] cursor-pointer hover:underline'> Sign in</span>
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupForm