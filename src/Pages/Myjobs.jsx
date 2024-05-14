/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";



const Myjobs = () => {
    const { user } = useAuth() ;
    const axiosSecure = useAxiosSecure(); 

    const {data: jobs, isLoading, refetch} =  useQuery({
        queryFn: ()=> getData(),
        queryKey : ['jobs']
       })

    const getData = async () => {
        const { data } = await axiosSecure(`/jobs/${user?.email}`);
        return data ;
    }

 

    const { mutateAsync} = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/job/${id}`);
            return data;
        },
        onSuccess : async ()=> {
            await refetch();
            toast.success('Deleted Successfully!');
        }
    })

    if(isLoading) return <p>Loading ...</p>

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
               await mutateAsync(id);  
            }

        } catch (err) {
            console.log(err);
        }

    }
    if(isLoading) return <p>Loading ...</p>

    return (
        <div className="min-h-[80vh] container mx-auto my-20">
            <Helmet><title>Workly | My Jobs</title></Helmet>
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
                                    <td><Link to={`/update/${job._id}`}><button className="btn bg-blue-500 text-white">Edit</button></Link></td>
                                    <td><button onClick={() => handleDelete(job._id)} className="btn bg-blue-500 text-white">X</button></td>
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