import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root"
import Alljobs from "../Pages/Alljobs";
import Home from "../Pages/Home";
import Blogs from "../Pages/Blogs";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AppliedJobs from "../Pages/AppliedJobs";
import AddAJob from "../Pages/AddAJob";
import Myjobs from "../Pages/Myjobs";
import JobDetails from "../Pages/JobDetails";
import Error from "../Pages/Error";
import UpdateJobs from "../Pages/UpdateJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/all-jobs',
        element: <Alljobs></Alljobs>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/appliedJobs',
        element: <AppliedJobs></AppliedJobs>
      },
      {
        path: '/add-a-job',
        element: <AddAJob></AddAJob>
      },
      {
        path: '/my-jobs',
        element: <Myjobs></Myjobs>
      },
      {
        path: '/job/:id',
        element: <JobDetails></JobDetails>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path: '/update/:id',
        element: <UpdateJobs></UpdateJobs>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)

      }
    ]
  },

]);
export default router;