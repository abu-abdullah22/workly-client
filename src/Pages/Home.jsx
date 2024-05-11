
import { Helmet } from 'react-helmet';
import Carou from '../Components/Carou'
import TabSection from '../Components/TabSection';
const Home = () => {
    return (
        <div>
            <Helmet><title>Home</title></Helmet>
         <Carou />
         <TabSection/>
        </div>
    );
};

export default Home;