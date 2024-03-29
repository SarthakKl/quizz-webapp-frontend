import React from 'react'
import {useNavigate } from 'react-router-dom'
import { performLogin } from '../utils/api_call'
import {useState} from 'react'

function Login({setLoginState}) {
    const [errorCountered, showError] = useState('')
    const [verificationState, setVerificationState] = useState(false)
    const navigate = useNavigate()
    async function handleLogin(e){
        e.preventDefault()
        const email = e.target[0].value
        const pass = e.target[1].value
        try {
            const data = await performLogin(email, pass)
            if(data.error){
                return showError(data.error)
            }
            if(data.message.includes('not verified')){
                return setVerificationState(true)
            }
            // console.log(data.user)
            setLoginState(true)
            navigate('/quiz', {replace:true})
        } 
        catch (error) {
            console.log(error)
            return showError(error.message)
        }
    }
  return (
    <div className='absolute top-0 right-0 left-0 bottom-0 '>
        <div className='bg-white w-80 m-auto mt-36 px-3 py-8  drop-shadow-xl shadow-2xl rounded-lg loginFormFont'>
            {
                verificationState &&
                <div className='text-center '>Please verify your email address<br/>You can close this window</div>
            }
            {
            !verificationState &&
                <div>
                    <div className='text-center mb-2 login_title'>Login</div>
                    <form 
                        className='flex flex-col rounded'
                        onSubmit={handleLogin}>
                            <input 
                                placeholder='Email' 
                                required
                                type='email'
                                className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                            />
                            <input 
                                placeholder = 'Password'
                                required
                                type='password'
                                className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                            />
                            <button 
                                className='px-2 py-1 mx-5 my-2 rounded text-white auth_btns'
                            >
                                Login
                            </button>
                    </form>
                    <div 
                        className = {`${errorCountered} === ''?inline-block:hidden text-center px-2 py-1 mx-5  text-red-600`}
                    >
                            {errorCountered}
                    </div>
                    <div className='flex justify-center'>
                        <span className='select-none'>Don't have an account?</span>  
                        <span className='underline select-none cursor-pointer' onClick={()=>navigate('/Signup', {replace:true})}>Sign Up</span>   
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Login