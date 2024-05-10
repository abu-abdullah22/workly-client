import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navLink = (
        <>
            <li className="font-medium mr-2"><NavLink to={'/'}>Home</NavLink></li>
            <li className="font-medium mr-2"><NavLink>All Jobs</NavLink></li>
            {user && <li className="font-medium mr-2"><NavLink>Applied Jobs</NavLink></li>}
            {user && <li className="font-medium mr-2"><NavLink>Add A Job</NavLink></li>}
            {user && <li className="font-medium mr-2"><NavLink>My Jobs</NavLink></li>}
            <li className="font-medium mr-2"><NavLink>Blogs</NavLink></li>
        </>
    )

    return (
        <div className="navbar bg-base-100 lg:px-10 ">
            <div className="navbar-start">
                <div className="dropdown">
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
                !user && <div className=" hidden md:block tooltip tooltip-bottom" data-tip={user?.displayName || 'user'}>
                    <img src={user?.photoURL || '/user.jpg'} className="w-[50px] h-[50px] rounded-full" alt="" />
                </div>
            }
            </div>
        </div>
    );
};

export default Navbar;