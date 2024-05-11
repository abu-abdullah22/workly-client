/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabSection = () => {
    const [jobs, setJobs] = useState([]) ;
    useEffect(()=> {
        const getData = async ()=> {
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/jobs`); 
            setJobs(data) ;
        }
        getData() ;
    }, [])
    return (
        <Tabs className={'my-20'}>
            <h1 className='text-center text-3xl font-bold my-8'>Jobs by category</h1>
            <div className='container mx-auto'>
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>All Jobs</Tab>
                        <Tab>On-Site Job</Tab>
                        <Tab>Remote Job</Tab>
                        <Tab>Hybrid</Tab>
                        <Tab>Part-Time</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-14 md:grid-cols-2 xl:grid-cols-3'>
                        {jobs.map(job =>
                            <JobCard key={job._id} job={job}></JobCard>
                        )}
                    </div>
                </TabPanel>


                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-14 md:grid-cols-2 xl:grid-cols-3'>
                        {jobs.filter(j => j.job_category
                            === 'on_site').map(job =>
                                <JobCard key={job._id} job={job}></JobCard>
                            )}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-14 md:grid-cols-2 xl:grid-cols-3'>
                        {jobs.filter(j => j.job_category
                            === 'remote').map(job =>
                                <JobCard key={job._id} job={job}></JobCard>
                            )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-14 md:grid-cols-2 xl:grid-cols-3'>
                        {jobs.filter(j => j.job_category
                            === 'hybrid').map(job =>
                                <JobCard key={job._id} job={job}></JobCard>
                            )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-14 md:grid-cols-2 xl:grid-cols-3'>
                        {jobs.filter(j => j.job_category
                            === 'part_time').map(job =>
                                <JobCard key={job._id} job={job}></JobCard>
                            )}
                    </div>
                </TabPanel>
            </div>
        </Tabs>
    );
};

export default TabSection;