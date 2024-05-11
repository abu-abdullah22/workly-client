import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {

    const { createUser, signInWithGoogle, updateUserProfile, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;

        try {
            await createUser(email, password)
            await updateUserProfile(name, photo)
            setUser({ photoURL: photo, displayName: name });
            navigate('/')
            toast.success('Sign Up Successful!')
        } catch (err) {
            console.log(err);
            toast.error(err?.message)
        }

    }

    const handleGoogle = async () => {
        try {
            await signInWithGoogle();
            navigate('/');
            toast.success('Log in successful!')
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto bg-gray-100 min-h-[calc(100vh-500px)] my-20">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-1 text-sm">
                    <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="email" className="block dark:text-gray-600">email</label>
                    <input type="email" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />

                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="photo" className="block dark:text-gray-600">PhotoURL</label>
                    <input type="text" name="photo" id="photo" placeholder="photourl" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />

                </div>
                <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 btn ">Sign Up</button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                <p className="px-3 text-sm dark:text-gray-600 font-">Login with Google</p>
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={handleGoogle} aria-label="Log in with Google" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>

            </div>
            <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account
                <Link to={'/login'} rel="noopener noreferrer" href="#" className="underline dark:text-gray-800"> Log In</Link>
            </p>
        </div>
    );
};

export default Register;