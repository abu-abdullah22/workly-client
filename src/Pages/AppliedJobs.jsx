import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const AppliedJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        getData();
    }, [user]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = jobs.filter(job => job.jobCategory === selectedCategory);
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(jobs);
        }
    }, [selectedCategory, jobs]);

    const getData = async () => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/apply/${user?.email}`);
            setJobs(data);
            setFilteredJobs(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div>
            <Helmet>
                <title>Applied Jobs</title>
            </Helmet>
            <div className="h-[80vh] container mx-auto">
                <h2 className="text-3xl text-center my-12">My added jobs</h2>
                <div className="flex justify-center mb-4">
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="border p-1">
                        <option value="">All Categories</option>
                        <option value="remote">Remote</option>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="part-time">Part-time</option>
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
                            {filteredJobs.map(job => (
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
