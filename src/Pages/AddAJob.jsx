/* eslint-disable no-unused-vars */
import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";


const AddAJob = () => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date());
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const { mutateAsync } = useMutation({
        mutationFn: async (addData) => {
            const {data} = await axiosSecure.post(`/jobs`, addData) ;
        },
        onSuccess : ()=> {
            navigate('/my-jobs');
            toast.success('Added successfully!')
        }
    })

    const handleAddJob = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const job_title = form.title.value;
        const description = form.description.value;
        const job_posting_date = startDate.toLocaleDateString();
        const application_deadline = deadline.toLocaleDateString();
        const job_category = form.jobCategory.value;
        const salary_range = form.salary.value;
        const image = form.banner.value;

        const addData = { name, job_title, description, job_posting_date, application_deadline, salary_range, job_category, image, email };

        mutateAsync(addData);

    }
    return (
        <div>
            <Helmet>
                <title>Add A JOb</title>
            </Helmet>
            <div className="text-center space-y-5 my-8">
                <h3 className="text-3xl">  Add A Job Opportunity</h3>
                <p>Welcome to the job posting portal! Here, you can add new job opportunities for potential candidates</p>
            </div>
            <div className="xl:max-w-3xl p-4 shadow-md rounded-md dark:bg-gray-50 dark:text-gray-800 mx-auto my-12">
                <form onSubmit={handleAddJob} className="w-full space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name="name" defaultValue={user?.displayName} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" defaultValue={user?.email} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Title</span>
                        </label>
                        <input type="text" placeholder="job title" name="title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Banner (PhotoURL)</span>
                        </label>
                        <input type="text" placeholder="job banner" name="banner" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <select
                            name="jobCategory" required
                        >
                            <option value="">Select category</option>
                            <option value="On Site">On Site</option>
                            <option value="Remote">Remote</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description [within 150 letters]</span>
                        </label>
                        <input type="text" placeholder="description" name="description" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input type="text" placeholder="salary range" name="salary" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Applicants :</span>
                        </label>
                        <input type="number" placeholder="applicants" name="applicants" defaultValue={0} className="input input-bordered" readOnly />
                    </div>

                    <div className="flex justify-between">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">job Posting Date</span>
                            </label>
                            <DatePicker className="border p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} readOnly />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Application Deadline</span>
                            </label>
                            <DatePicker className="border p-2 rounded-md" selected={deadline} onChange={(date) => setDeadline(date)} />

                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>

                </form>


            </div>
        </div>
    );
};

export default AddAJob;