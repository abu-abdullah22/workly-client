import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";



const Myjobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState();
    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs/${user?.email}`);
        setJobs(data);
    }

    console.log(jobs);

    const handleDelete = async id => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this job!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/job/${id}`);
                toast.success('Deleted Successfully!');
                getData();
            }

        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="h-[80vh] container mx-auto">
            <Helmet><title>My Jobs</title></Helmet>
            <h2 className="text-3xl text-center my-12">My added jobs</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Salary range</th>
                            <th>Job Posting Date</th>
                            <th>Application Deadline</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            jobs?.map(job =>
                                <tr key={job._id}>
                                    <th>{job.job_title}</th>
                                    <td>{job.job_category}</td>
                                    <td>{job.salary_range}</td>
                                    <td>{job.job_posting_date}</td>
                                    <td>{job.application_deadline}</td>
                                    <td><Link to={`/update/${job._id}`}><button className="btn">Edit</button></Link></td>
                                    <td><button onClick={() => handleDelete(job._id)} className="btn">X</button></td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Myjobs;