
const Slide = ({image}) => {
    return (
        <div className="hero h-[70vh] bg-contain bg-no-repeat" style={{backgroundImage: `url(${image})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Unlock Your Career Potential</h1>
            <p className="mb-5">Workly is your go-to platform for discovering exciting job opportunities, connecting with top employers, and advancing your career. Whether you’re a seasoned professional or just starting out, Workly has the tools and resources to help you thrive.</p>
          </div>
        </div>
      </div>
    );
};

export default Slide;