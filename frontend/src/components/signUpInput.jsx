import {useState, UseEffect} from 'react';
import {Link} from 'react-router-dom';

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import XSvg from './svg/XSvg';


function SignUpInput(){

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
    <div className='flex-col m-10 mt-16 bg-gray-400 rounded-3xl p-10 box-border' >
        <form>
        <XSvg className='w-24 lg:hidden fill-white'/>
        <label className="input mx-10 my-1.5 rounded-2xl">
        {/* <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
            >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg> */} 
        <MdOutlineMail/>
        <input type="email" className="grow " placeholder="Email" name='email' onChange={handleChange} />
        </label>
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
        <label className="input  mx-10 my-1.5 rounded-2xl">
            {/* <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="15px" height="18px" version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"
            viewBox="0 0 507 512.006"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
            <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <path fill="black" d="M473.388 6.154l27.459 27.459c8.204,8.204 8.204,21.74 0,29.944l-21.574 21.574 12.092 12.092c8.36,8.36 12.54,19.373 12.54,30.381 0,11.008 -4.181,22.022 -12.54,30.382l-116.752 116.751c-2.377,2.377 -6.233,2.377 -8.61,0 -0.392,-0.392 -0.719,-0.825 -0.982,-1.285l-12.344 -12.345c-2.377,-2.377 -2.377,-6.232 0,-8.609l6.335 -6.336c2.931,-2.931 6.789,-4.397 10.641,-4.397 3.851,0 7.708,1.466 10.64,4.397l2.838 2.838 99.625 -99.623c5.981,-5.982 8.972,-13.876 8.972,-21.773 0,-7.897 -2.991,-15.79 -8.972,-21.772l-4.754 -4.753 -0.025 0.038 -0.107 0.16 -0.109 0.159 -0.111 0.158 -0.113 0.157 -0.116 0.155 -0.118 0.155 -0.12 0.153 -0.122 0.152 -0.125 0.151 -0.127 0.15 -0.129 0.148 -0.131 0.147 -0.133 0.146 -0.136 0.145 -0.138 0.143 -0.139 0.141 -355.775 355.775c-0.63,0.63 -1.362,1.093 -2.146,1.388l-105.519 50.449c-2.34,1.395 -5.413,1.087 -7.427,-0.927l-3.364 -3.364 0.009 -0.008c-1.7,-1.703 -2.293,-4.33 -1.294,-6.68l46.784 -110.042c0.292,-0.848 0.776,-1.644 1.453,-2.32l0.153 -0.148 320.186 -320.186 0.022 -0.023 35.416 -35.415c3.009,-3.009 6.97,-4.515 10.925,-4.515 1.903,0 3.806,0.349 5.605,1.045l22.412 -22.412c8.205,-8.205 21.741,-8.205 29.945,0zm-4.304 7.133l24.63 24.63c5.866,5.866 5.865,15.471 0,21.336l-20.074 20.072 -45.874 -45.875 -0.092 -0.09 20.074 -20.073c5.867,-5.867 15.47,-5.865 21.336,0zm-38.521 124.251l-310.333 310.333 -60.063 -60.063 310.333 -310.332 60.063 60.062 0 0zm-316.054 316.055l-60.064 -60.063 -34.672 81.553c1.493,0.634 14.964,13.548 16.171,16.07l0 0.001 78.565 -37.561z"/>
            </g>
            </svg> */}
            <MdDriveFileRenameOutline/>
            <input type="text" className="grow " placeholder="Full Name" name='fullName' onChange={handleChange} />
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
            >Sign Up</button>
            <p className=' mx-10 my-1.5 rounded-2xl' >Already have an acount?</p>
            <Link to='/login'>
                <button className="btn btn-wide btn-autline  text-2xl text-black mx-10 my-3 rounded-3xl ">Sign In</button>
            </Link>
        </div>
        </form>
    </div>
    </>
}

export default SignUpInput ;

