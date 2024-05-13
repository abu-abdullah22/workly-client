import {Helmet} from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Blogs = () => {

    const { data, isLoading, isError } = useQuery({
      queryKey: 'data',
      queryFn: async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        return response.data;
      }
    });
    

      if (isLoading) {
        return <p>Loading...</p>;
      }
      
      if (isError) {
        return <p>Error fetching data</p>;
      }
      
      
    return (
        <div className="min-h-[80vh]">
            <Helmet title="Blogs" />
           
           <h1>{data.length}</h1>
        </div>
    );
};

export default Blogs;