
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutgoingMail, MdPassword } from 'react-icons/md';
import XSvg from './svg/XSvg';

const LoginForm =()=>{

    const [userData, setUser] = useState({
        "username": '',
        "password": ''
    })
    
    const handleChange = (e)=>{
        setUser({...userData,  [e.target.name]: e.target.value})
    }

    const handleUser=(e)=>{
        e.preventDefault();
        console.log(userData);
    }

    return(
        <div className = 'flex mt-10'>
            <form>
                <XSvg className='w-24 lg:hidden'/>
                <label className="input  mx-10 my-1.5 rounded-2xl ">
                    {/* <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        </g>
                    </svg> */}
                    <FaUser/>
                    <input type="text" className="grow " placeholder="Username" name='username' onChange={handleChange} />
                </label>
                <label className="input  mx-10 my-1.5 rounded-2xl ">
                    {/* <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 122.88"
                    width="15px"  // Set your desired width
                    height="18px" // Set your desired height
                    >
                    <path className="cls-1" d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0ZM41.2,53.72h1V50.46a20.24,20.24,0,0,1,5.6-14,18.64,18.64,0,0,1,27.18,0,20.24,20.24,0,0,1,5.6,14v3.26h1.05a3.14,3.14,0,0,1,3.14,3.13V87.8a3.15,3.15,0,0,1-3.14,3.14H41.2a3.14,3.14,0,0,1-3.13-3.14V56.85a3.13,3.13,0,0,1,3.13-3.13Zm7,0H74.7V50.46a14.29,14.29,0,0,0-3.93-9.9,12.75,12.75,0,0,0-18.66,0,14.25,14.25,0,0,0-3.93,9.9v3.26ZM59,73.73,55.7,82.27H67.18l-3-8.65a6,6,0,1,0-5.2.11Z"/></svg> */}
                    <MdPassword/>
                    <input type="text" className="grow " placeholder="Password" name='password' onChange={handleChange} />
                </label>
                <div className='m-auto' >
                    <button className="btn btn-wide bg-blue-500 text-2xl text-white  rounded-3xl mx-10 my-3"
                    onClick={handleUser}
                    >Login</button>
                    <p className=' mx-10 my-1.5 rounded-2xl' >Don-t have an account?</p>
                    <Link to='/signup'>
                        <button className="btn btn-wide btn-autline bg-black-500 text-2xl text-black mx-10 my-3 rounded-3xl ">Sign Up</button>
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default LoginForm;