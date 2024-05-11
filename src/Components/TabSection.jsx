import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabSection = () => {
    return (
        <Tabs>
            <h1 className='text-center text-3xl font-bold my-8'>Job by category</h1>
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
                    <h2>All</h2>
                </TabPanel>
                <TabPanel>
                    <h2>onsite</h2>
                </TabPanel>
                <TabPanel>
                    <h2>remote</h2>
                </TabPanel>
                <TabPanel>
                    <h2>hybrid</h2>
                </TabPanel>
                <TabPanel>
                    <h2>part time</h2>
                </TabPanel>
            </div>
        </Tabs>
    );
};

export default TabSection;