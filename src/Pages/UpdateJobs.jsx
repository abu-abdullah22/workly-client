/* eslint-disable no-unused-vars */
import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAuth from "../Hook/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
import axios from "axios";


const UpdateJobs = () => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date());
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);
    const axiosSecure = useAxiosSecure();
    // const location = useLocation() ;
    // const { jobData } = location.state;
  
    const { data: jobData, isLoading, isError } = useQuery({
        queryKey: ["job", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/job/${id}`);
            return data;
        }
    });



    // const { name, job_title, job_posting_date, application_deadline, salary_range, job_applicants_number, job_category, description, image, email, _id} = jobData || {};


    const { mutateAsync } = useMutation({
        mutationFn: async (addData) => {
            await axiosSecure.put(`/job/${id}`, addData);
        },
        onSuccess: () => {
            navigate('/my-jobs');
            toast.success('Updated succcessfully!')
        }
    })

   

    const handleUpdate = async e => {
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


        try {
            await mutateAsync(addData);
        } catch (error) {
            console.error(error);
            toast.error('Error updating job. Please try again later.');
            return;
        }

    }

    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching job details.</div>;
    





    return (
        <div className="xl:max-w-3xl p-4 shadow-md rounded-md dark:bg-gray-50 dark:text-gray-800 mx-auto my-12">
            <Helmet><title>Workly | Update</title></Helmet>
            <form onSubmit={handleUpdate} className="w-full space-y-5">
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
                    <input type="text" placeholder="job title" name="title" className="input input-bordered" defaultValue={jobData.job_title} required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Banner (PhotoURL)</span>
                    </label>
                    <input type="text" placeholder="job banner" name="banner" className="input input-bordered" defaultValue={jobData.image} required />
                </div>
                <div className="form-control">
                    <select className="border p-1"
                        name="jobCategory" defaultValue={jobData.job_category} required
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
                    <input type="text" placeholder="description" name="description" defaultValue={jobData.description} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Salary Range</span>
                    </label>
                    <input type="text" placeholder="salary range" name="salary" className="input input-bordered" defaultValue={jobData.salary_range} required />
                </div>
                <div className="flex justify-between">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">job Posting Date</span>
                        </label>
                        <DatePicker className="border p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Application Deadline</span>
                        </label>
                        <DatePicker className="border p-2 rounded-md" selected={deadline} onChange={(date) => setDeadline(date)} />

                    </div>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-blue-500">Update</button>
                </div>

            </form>


        </div>
    );
};

export default UpdateJobs;