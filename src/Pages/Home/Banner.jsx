import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/BannerImage/slide1.jpg';
import banner2 from '../../assets/BannerImage/slide2.jpg';
import banner3 from '../../assets/BannerImage/slide3.jpg';
import banner4 from '../../assets/BannerImage/slide4.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} dynamicHeight={true}>
            <div className="relative">
                <img src={banner1} alt="Banner 1" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h2 className="text-xl md:text-4xl font-bold mb-4">Find Your Dream Home</h2>
                    <p className="mb-4">Explore the best properties in your area.</p>
                    <Link to="/allProperties">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            View Properties
                        </button>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <img src={banner2} alt="Banner 2" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h2 className="text-xl md:text-4xl font-bold mb-4">Luxury Apartments</h2>
                    <p className="mb-4">Find the perfect luxury apartment for you.</p>
                    <Link to="/allProperties">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            View Properties
                        </button>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <img src={banner3} alt="Banner 3" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h2 className="text-xl md:text-4xl font-bold mb-4">Affordable Housing</h2>
                    <p className="mb-4">Discover affordable housing options.</p>
                    <Link to="/allProperties">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            View Properties
                        </button>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <img src={banner4} alt="Banner 4" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h2 className="text-xl md:text-4xl font-bold mb-4">Commercial Spaces</h2>
                    <p className="mb-4">Find the best commercial spaces for your business.</p>
                    <Link to="/allProperties">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            View Properties
                        </button>
                    </Link>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
