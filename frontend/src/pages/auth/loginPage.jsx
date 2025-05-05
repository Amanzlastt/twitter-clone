import { FaUser } from 'react-icons/fa'; // Make sure to import necessary icons
import { MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import XSvg from '../../components/svg/XSvg'; // Adjust the import path for XSvg

function LoginForm({ handleChange, handleUser }) {
    return (
        <div className='flex max-w-screen-xl '>
            <div className='flex-1 hidden lg:flex items-center' >
                <XSvg className='lg:w-2/3 fill-black' />
            </div>
            <div className='flex mt-10'>
                <form onSubmit={(e) => { e.preventDefault(); handleUser(); }}>
                    <XSvg className='w-24 lg:hidden' />
                    <label className="input mx-10 my-1.5 rounded-2xl">
                        <FaUser />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Username"
                            name='username'
                            onChange={handleChange}
                        />
                    </label>
                    <label className="input mx-10 my-1.5 rounded-2xl">
                        <MdPassword />
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            name='password'
                            onChange={handleChange}
                        />
                    </label>
                    <div className='m-auto'>
                        <button
                            type="submit"
                            className="btn btn-wide bg-blue-500 text-2xl text-white rounded-3xl mx-10 my-3"
                        >
                            Login
                        </button>
                        <p className='mx-10 my-1.5 rounded-2xl'>Don’t have an account?</p>
                        <Link to='/signup'>
                            <button
                                type="button"
                                className="btn btn-wide btn-outline bg-black-500 text-2xl text-black mx-10 my-3 rounded-3xl"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;