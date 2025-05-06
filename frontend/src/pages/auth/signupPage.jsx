// import SignUpInput from "../../components/signUpInput";
import XSvg from "../../components/svg/XSvg";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {useState} from 'react';
import {Link} from 'react-router-dom'


function SignUpPage(){
    const [userData, setUser] = useState(
        {
            "fullName":'',
            "username":'',
            "email":'',
            "password":''
        }
    )
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUser({
            ...userData,
            [name]: value
        })
    }
    const handleUser =(e)=>{
        e.preventDefault();
        console.log(userData)
    }
    return <>
    <div className='flex flex-row flex-wrap justify-center items-start max-w-screen-xl mx-auto ml-50'>
        <div className='flex-1 hidden lg:flex items-center' >
            <XSvg className='lg:w-1/3 fill-black' />
        </div>
        <div className='flex-row m-10 mt-16 bg-gray-400 rounded-3xl p-10 box-border' >
            <form>
                <XSvg className='w-24 lg:hidden fill-white'/>
                <label className="input mx-10 my-1.5 rounded-2xl"> 
                    <MdOutlineMail/>
                    <input type="email" className="grow " placeholder="Email" name='email' onChange={handleChange} />
                </label>
                <label className="input  mx-10 my-1.5 rounded-2xl ">
                    <FaUser/>
                    <input type="text" className="grow " placeholder="Username" name='username' onChange={handleChange} />
                </label>
                <label className="input  mx-10 my-1.5 rounded-2xl">
                    <MdDriveFileRenameOutline/>
                    <input type="text" className="grow " placeholder="Full Name" name='fullName' onChange={handleChange} />
                </label>
                <label className="input  mx-10 my-1.5 rounded-2xl ">
                    <MdPassword/>
                    <input type="text" className="grow " placeholder="Password" name='password' onChange={handleChange} />
                </label>
                <div className='m-auto' >
                    <button className="btn btn-wide bg-blue-500 text-2xl text-white  rounded-3xl mx-10 my-3"
                    onClick={handleUser}
                    >Sign Up</button>
                    <p className=' mx-10 my-1.5 rounded-2xl' >Already have an acount?</p>
                    <Link to='/login'>
                        <button className="btn btn-wide btn-autline  text-2xl text-black mx-10 my-3 rounded-3xl ">Sign In</button>
                    </Link>
                </div>
            </form>
        </div>
    </div>
    </>
}
export default SignUpPage;