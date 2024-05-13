const Subs = () => {
    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900 border-2 container mx-auto my-20 rounded-md border-[#74B366]">
            <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
                <div className="flex flex-col space-y-4 text-center lg:text-left">
                    <h1 className="text-5xl font-bold leading-none">Stay with Workly</h1>
                    <p className="w-">Do not miss out on the opportunity to elevate your career and take the next step towards your professional goals.</p>
                </div>
                <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
                    <div className="flex flex-row">
                        <input type="text" placeholder="@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" />
                        <button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-600 dark:text-gray-50 btn bg-[#74B366] text-white">Subscribe</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subs;