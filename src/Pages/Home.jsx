import { useLoaderData } from 'react-router-dom';
import Carou from '../Components/Carou'
import TabSection from '../Components/TabSection';
const Home = () => {
    const jobs = useLoaderData() ;
    console.log(jobs);
    return (
        <div>
         <Carou />
         <TabSection jobs={jobs}/>
        </div>
    );
};

export default Home;