import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
const AppliedJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState();
    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/apply/${user?.email}`);
        setJobs(data);
    }

    return (
        <div>
            <Helmet>
                <title>Applied JObs</title>
            </Helmet>
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
                                <th>Job Hirer</th>
                                <th>Job Hirer Email</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                jobs?.map(job =>
                                    <tr key={job._id}>
                                        <th>{job.jobTitle}</th>
                                        <td>{job.jobCategory}</td>
                                        <td>{job.salaryRange}</td>
                                        <td>{job.hirerName}</td>
                                        <td>{job.hirerEmail || job.hireremail}</td>
                                        
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default AppliedJobs;