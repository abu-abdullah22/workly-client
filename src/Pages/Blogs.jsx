import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

const Blogs = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: 'data',
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
            return response.data;
        }
    });

    const [selectedBlog, setSelectedBlog] = useState(null);

    const openModal = (blog) => {
        setSelectedBlog(blog);
        document.querySelector(".modal-content").scrollTop = 0;
    };

    const closeModal = () => {
        setSelectedBlog(null);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching data</p>;
    }

    return (
        <div className="min-h-screen">
            <Helmet title="Workly | Blogs" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs ({data.length})</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map(blog => (
                        <div key={blog._id} className={`bg-white shadow-md rounded-lg ${blog.description.length > 200 ? 'lg:w-96' : 'w-80'}`}>
                            <img src={blog.image} alt={blog.title} className="object-cover h-48 w-full" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                                <p className="text-gray-600 mb-4">
                                    {blog.description.length > 200 ? `${blog.description.substring(0, 200)}...` : blog.description}
                                    {blog.description.length > 200 && (
                                        <button
                                            className="bg-[#74b366] text-white btn ml-2 border-none"
                                            onClick={() => openModal(blog)}
                                        >
                                            Read more
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 modal-content rounded-lg w-full max-w-3xl"
                        >
                            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
                            <p className="text-gray-800">{selectedBlog.description}</p>
                            <button className="btn text-white border-none bg-[#74b366] mt-4" onClick={closeModal}>Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Blogs;

