import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const JobCard = ({ job }) => {
    const { name, job_title, job_posting_date, application_deadline, salary_range, job_applicants_number, job_category } = job;
    return (
        <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center font-bold">
                    {job_title}
                </div>
                <Link className="btn bg-[#74B366] text-white">View Details</Link>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center text-xs font-medium">
                        <span>Start: {job_posting_date} End: {application_deadline}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <a rel="noopener noreferrer" href="#" className="block">
                        <h3 className="text-xl font-semibold dark:text-violet-600">Salary: {salary_range}</h3>
                    </a>
                    <p className="leading-snug font-bold dark:text-gray-600">[{job_category}]</p>
                    <p>Applicants : <span className="text-blue-600">{job_applicants_number}</span></p>
                </div>
            </div>
        </div>
    );
};

export default JobCard;