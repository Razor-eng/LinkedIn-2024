/* eslint-disable react/prop-types */
import { useState } from "react"
import Input from "../Input/Input"
import { GoogleApi, LoginApi } from "../../api/AuthApi";

const HomeBody = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const login = () => {
        LoginApi(email, password);
    }

    const googleLogin = () => {
        GoogleApi();
    }

    return (
        <div className="pt-3 pl-2 flex">
            <div className="flex flex-col gap-5 w-[700px] pr-[42px] mr-5">
                <h1 className="text-3xl md:text-6xl font-[100] text-[#B24020]">Welcome to your professional community</h1>
                <div className='flex flex-col gap-1 w-full mt-5'>
                    <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Email">Email or Phone number</label>
                    <Input type={'email'} placeholder={'Enter your Email'} value={email} setValue={setEmail} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-semibold text-zinc-600 ml-1' htmlFor="Password">Password</label>
                    <div className='flex items-center'>
                        <Input type={show ? 'text' : 'password'} placeholder={'Enter your Password'} value={password} setValue={setPassword} />
                        <h2 className='font-medium relative right-14 text-[#0077B5] hover:underline cursor-pointer' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</h2>
                    </div>
                    <h2 className="text-[#0A66C2] font-medium hover:text-[#004182] w-fit cursor-pointer hover:underline mt-2 ml-1">Forgot password?</h2>
                </div>
                <div className='w-[85vw] md:w-96 mt-2 hover:opacity-90'>
                    <button
                        className="w-full p-3 cursor-pointer bg-[#0A66C2] text-white rounded-full font-medium"
                        onClick={login}
                    >
                        Sign in
                    </button>
                </div>
                <div className='flex w-[85vw] md:w-96 justify-center items-center gap-3 relative'>
                    <p className='border-b border-gray-400 w-[43%]'></p>
                    <p>or</p>
                    <p className='border-b border-gray-400 w-[43%]'></p>
                </div>
                <div className="hidden sm:block">
                    <p className='text-xs text-gray-500 max-w-96 pl-2'>By clicking Agree & Join, you agree to the LinkedIn
                        <span className='text-[#0077B5] font-semibold cursor-pointer'> User Agreement</span>,
                        <span className='text-[#0077B5] font-semibold cursor-pointer'> Privacy Policy</span>, and
                        <span className='text-[#0077B5] font-semibold cursor-pointer'> Cookie Policy.</span>
                    </p>
                </div>
                <div className='sm:w-60 sm:ml-16 w-full'>
                    <button
                        className="w-fit cursor-pointer bg-[#4285F4] hover:opacity-90 text-white flex items-center gap-5 font-medium border p-2 rounded-lg ml-16 sm:ml-0"
                        onClick={googleLogin}
                    >
                        <div className='bg-white h-8 flex items-center justify-center w-8'>
                            <img src="/images/google.png" alt="" className='w-6 h-6' />
                        </div>
                        <p className='font-medium hidden sm:block'>
                            Continue with Google
                        </p>
                        <p className='font-medium sm:hidden'>
                            Google
                        </p>
                    </button>
                </div>
            </div>
            <div className="mt-20 hidden md:block">
                <img src="/images/homeBg.png" alt="Bg" className="w-full h-[562px]" />
            </div>
        </div>
    )
}

export default HomeBody