/* eslint-disable no-unused-vars */
import { useContext } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

const JobDetails = () => {
    const { user } = useContext(AuthContext);
    const { id: jobId } = useParams();

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: job, isLoading, isError } = useQuery({
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/job/${jobId}`);
            return data;
        },
        queryKey: ["job", jobId],
    });


    const { name, job_title, job_posting_date, application_deadline, salary_range, job_applicants_number, job_category, description, image, email, _id} = job || {};


 const {mutateAsync} =   useMutation({
        mutationFn: async (applyData)=> {
            const { data } = await axiosSecure.post(`/applied`, applyData);
        },
        onSuccess : ()=> {
            navigate('/')
            toast.success('Applied Successfully!')
        } ,
        onError:(error)=>{
            if(error.response && error.response.status === 400){
                navigate('/appliedJobs')
                toast.error('You have already applied')

            }
        }
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const applierName = form.name.value;
        const applierEmail = form.email.value;
        const resume = form.resume.value;
        const hirerName = name;
        const hirerEmail = email;
        const jobTitle = job_title;
        const jobCategory = job_category;
        const salaryRange = salary_range;

        const applyData = { applierName, applierEmail, resume, hirerName, jobTitle, jobCategory, hirerEmail, salaryRange, jobId : _id};



        try {
            const today = new Date()
            const deadlineDate = new Date(application_deadline);
            if (today > deadlineDate) {
                navigate('/')
                toast.error('Can not Apply! Deadline passed!')
            } else if (hirerEmail === applierEmail) {
                navigate('/')
                toast.error('Can not apply in your own job!')
            }
            else {
                await mutateAsync(applyData)
            }
        } catch (err) {
            console.log(err);
        }


    }


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching job details.</div>;




    return (
        <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800 container mx-auto my-20 min-h-[calc(100vh-582px)]">
            <Helmet><title>Workly | Job Details</title></Helmet>
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center font-bold">
                    {name}
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={image} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                    <div className="flex items-center text-xs font-medium">
                        <span>Start: {job_posting_date} End: {application_deadline}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="font-bold text-xl">Position : {job_title}</h2>
                    <h3 className="font-bold text-lg">Salary: {salary_range}</h3>

                    <p className="leading-snug font-bold dark:text-gray-600">[{job_category}]</p>

                    <p>{description}</p>
                    <div className="flex justify-between">
                        <p>Applicants : <span className="text-blue-600">{job_applicants_number}</span></p>


                        < button className="btn bg-[#74b366] text-white" onClick={() => document.getElementById('my_modal_5').showModal()}>Apply</button >
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box w-full sm:w-[700px] max-w-[90%] mx-auto">
                                <h3 className="font-bold text-lg">Apply</h3>
                                <p className="py-4">Press Submit to confirm apply!</p>
                                <div className="modal-action flex flex-col">
                                    <form onSubmit={handleSubmit} method="dialog" className="w-full">
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
                                                <span className="label-text">Resume Link</span>
                                            </label>
                                            <input type="text" placeholder="resume" name="resume" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control mt-6">
                                            <button type="submit" className="btn bg-blue-500 text-white">Submit</button>
                                        </div>
                                        <button type="button" className="btn btn-error mt-5 w-full text-white" onClick={() => document.getElementById('my_modal_5').close()}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;