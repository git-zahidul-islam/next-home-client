import { Link } from 'react-router-dom';
import errorImage from '../../assets/erropage.gif';
import { Helmet } from 'react-helmet';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center">
            <Helmet>
                <title>NextHome | Error Page</title>
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <img src={errorImage} alt="Error" className="w-full object-cover" />
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
                <p className="text-gray-600 mb-6">Something went wrong. The page you are looking for does not exist or an unexpected error has occurred.</p>
                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
