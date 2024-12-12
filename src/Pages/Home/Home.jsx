import { Helmet } from "react-helmet";
import AdvertisementSection from "./AdvertisementSection";
import Banner from "./Banner";
import FAQ from "./FAQ";
import LatestReviews from "./LatestReviews";
import Stat from "./Stat";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NextHome | Home</title>
            </Helmet>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <LatestReviews></LatestReviews>
            <Stat></Stat>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;