import photo from '/9434619.jpg'
const Review = () => {
    return (
        <section className="dark:bg-gray-200 dark:text-gray-800">
            <div className="container px-6 py-12 mx-auto">
                <div className="grid items-center gap-4 xl:grid-cols-5">
                    <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                        <h2 className="text-4xl font-bold">User Reviews</h2>
                        <p className="dark:text-gray-600">Read what our users have to say about their experience with us.</p>
                    </div>
                    <div className="p-6 xl:col-span-3">
                        <div className="grid gap-4 md:grid-cols-2">
                          
                            <div className="p-6 rounded shadow-md bg-blue-200 ">
                                <p>I found my dream job through this platform. Highly recommended!</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <img src={photo} alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                    <div>
                                        <p className="text-lg font-semibold">John Williams</p>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="p-6 rounded shadow-md bg-green-200 ">
                                <p>Great website with lots of job opportunities. Easy to use and navigate.</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <img src={photo} alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                    <div>
                                        <p className="text-lg font-semibold">Smith</p>
                                        <p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;
