import { motion} from 'framer-motion';
import { Helmet } from 'react-helmet';
import Carou from '../Components/Carou'
import TabSection from '../Components/TabSection';
import Subs from '../Components/Subs';
import Review from '../Components/Review';
const Home = () => {
  
    return (
        <motion.div  style={{ overflowY: "scroll", height: '80vh' }} >
            <Helmet><title>Workly | Home</title></Helmet>

            <motion.div initial={{ scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}>

                <Carou />

            </motion.div>

            
                <TabSection />
                <Subs></Subs>
                <Review></Review>
            </motion.div>




    );
};

export default Home;