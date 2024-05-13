import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Carou from '../Components/Carou'
import TabSection from '../Components/TabSection';
const Home = () => {
    return (
      <div>
         <Helmet><title>Home</title></Helmet>

          <motion.div  initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }}>
            {/* <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 180, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                
            /> */}
           
           <Carou />

        </motion.div>
        <motion.div >
        <TabSection />
        </motion.div>
      </div>
    );
};

export default Home;