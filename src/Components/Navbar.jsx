import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut} = useContext(AuthContext);
    const navigate = useNavigate() ;

   
    const handleLogOut = async () => {
        try{
            await logOut();
            navigate('/') ;
            toast.success('Log Out successful!')
        } catch (err) {
            console.log(err);
        }
    }
    const navLink = (
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/all-jobs'} className='mr-2'>All Jobs</NavLink></li>
            {user && <>
                <li><NavLink to={'/appliedJobs'} className='mr-2'>Applied Jobs</NavLink></li>
                <li><NavLink to={'/add-a-job'} className='mr-2'>Add A Job</NavLink></li>
                <li><NavLink to={'/my-jobs'} className='mr-2'>My Jobs</NavLink></li>

            </>}
            <li><NavLink to={'/blogs'}>Blogs</NavLink></li>
        </>
    )

    return (
        <div className="navbar bg-base-100 lg:px-10 pt-4 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown z-50">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-3xl"> <img src={'/logo.png'} className="w-[50px] h-[40px]" alt="" />
                    Workly</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navLink
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && <div className=" hidden md:block tooltip tooltip-bottom" data-tip={user?.displayName || 'user'}>
                        <img referrerPolicy="no-referrer" src={user?.photoURL || '/user.jpg'} className="w-[50px] h-[50px] rounded-full" alt="" />
                    </div>


                }

                {
                    user && <div>
                        <button onClick={handleLogOut} className="ml-2 btn bg-[#f5baa3] text-white">Log Out</button>
                    </div>
                }

                {
                    !user && <div>
                        <Link to={'/login'}><button className="btn bg-[#e08686] text-white">Login</button></Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;