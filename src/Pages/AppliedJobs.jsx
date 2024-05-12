import { useState } from "react";
import { Helmet } from "react-helmet";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AppliedJobs = () => {
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("");
    const axiosSecure = useAxiosSecure();


  const {data: jobs, isLoading} =  useQuery({
    queryFn: ()=> getData(),
    queryKey : ['jobs']
   })

    const getData = async () => {
            const { data } = await axiosSecure(`/apply/${user?.email}`);
            return data ;   
    };

    const filteredJobs = selectedCategory
        ? jobs.filter((job) => job.jobCategory === selectedCategory)
        : jobs;


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    if(isLoading) return <p>Loading ...</p>
   

    return (
        <div>
            <Helmet>
                <title>Applied Jobs</title>
            </Helmet>
            <div className="container mx-auto my-20 lg:min-h-[80vh]">
                <h2 className="text-3xl text-center my-12">My Applied jobs</h2>
                <div className="flex justify-center mb-4">
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="border p-1">
                        <option value="">All Categories</option>
                        <option value="remote">Remote</option>
                        <option value="on_site">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="part_time">Part-time</option>
                    </select>
                </div>
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
                            {filteredJobs?.map(job => (
                                <tr key={job._id}>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.jobCategory}</td>
                                    <td>{job.salaryRange}</td>
                                    <td>{job.hirerName}</td>
                                    <td>{job.hirerEmail || job.hireremail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppliedJobs;
