import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
const Alljobs = () => {

    const { user } = useAuth() ;
    const [jobs, setJobs] = useState([]);
    const axiosSecure = useAxiosSecure(); 


    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        try {
            const { data } = await axiosSecure(`${import.meta.env.VITE_API_URL}/jobs`);
            setJobs(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log(jobs);


    return (
        <div>
            <Helmet>
                <title>
                    All Jobs
                </title>
            </Helmet>
          <div className="container mx-auto my-20 min-h-[80vh]">
          <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Posting Date</th>
                            <th>Application Deadline</th>
                            <th>Salary Range </th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job._id}>
                                <td>{job.job_title}</td>
                                <td>{job.job_posting_date}</td>
                                <td>{job.application_deadline}</td>
                                <td>{job.salary_range}</td>
                                <td><Link to={`/job/${job._id}`}><button className="btn bg-[#74B366] text-white">Details</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    );
};

export default Alljobs;