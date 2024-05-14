import { useState } from "react";
import { Helmet } from "react-helmet";
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

    const [selectedBlog, setSelectedBlog] = useState(null);

    const openModal = (blog) => {
        setSelectedBlog(blog);
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
            <Helmet title="Blogs" />
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
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className={`bg-white p-8 rounded-lg ${selectedBlog.description.length > 500 ? 'max-w-3xl' : 'max-w-md'}`}>
                            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
                            <p className="text-gray-800">{selectedBlog.description}</p>
                            <button className="btn text-white border-none bg-[#74b366] mt-4" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
