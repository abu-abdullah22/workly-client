import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
const Alljobs = () => {


    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
  
 

    const { data: jobs, isLoading } = useQuery({
        queryFn: () => getData(search),
        queryKey: ['jobs'],
    })
   
    const getData = async (search) => {
        const { data } = await axiosSecure(`/jobs?search=${search}`);
        return data;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
    };

    if (isLoading) return <p>Loading ...</p>




    return (
        <div>
            <Helmet>
                <title>
                  Workly | All Jobs
                </title>
            </Helmet>
            <div className="container mx-auto my-20 min-h-[80vh]">
                <form onSubmit={handleSearch}>
                    <input className="border p-2 rounded-md mr-1" type="text" name="search" placeholder="Enter Job Title" aria-label="Enter job title" />
                    <button type="submit" className="btn bg-[#74B366] text-white">Search</button>
                </form>
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
                            {jobs.filter((job) => job?.job_title?.toLowerCase()?.includes(search?.toLowerCase()))?.map(job => (
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