import { useEffect, useState } from 'react';
import useAuth from './../../../hooks/useAuth';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import swal from 'sweetalert';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
    const [userRole, setUserRole] = useState(null);
    const [propertyTitle, setPropertyTitle] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertyImage, setPropertyImage] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const verificationStatus = "pending";


    useEffect(() => {
        axiosPublic.get(`/users/${user.email}`)
            .then(res => {
                console.log(res);
                setUserRole(res.data.role);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [])

    if(!userRole){
        return <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-red-500">Loading...</h1>
        </div>
    }

    if(userRole === 'fraud') {
        return <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-red-500">You are not allowed to access this page!</h1>
        </div>
    }

    const handleImageChange = (event) => {
        setPropertyImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(parseInt(minPrice) > parseInt(maxPrice)){
            swal({
                icon: "error",
                title: "Opps...",
                text: "Maximum price must be grater than or equal to minimum price",
            });
            return;
        }

        const imageFile = { image: propertyImage }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        // console.log(res.data.data.display_url);

        if (res.data.success) {
            const propertyInfo = {
                propertyTitle,
                propertyLocation,
                propertyImageUrl: res.data?.data?.display_url,
                agentName: user.displayName,
                agentEmail: user.email,
                minPrice,
                maxPrice,
                agentImageUrl: user.photoURL,
                verificationStatus
            };

            console.log(propertyInfo);

            axiosSecure.post('/properties', propertyInfo)
                .then(res => {
                    console.log(res);
                    swal({
                        icon: "success",
                        title: "Property Added Successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setPropertyTitle('');
                    setPropertyLocation('');
                    setPropertyImage('');
                    setMinPrice('');
                    setMaxPrice('');
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add Property</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700">Property Title</label>
                        <input
                            type="text"
                            id="propertyTitle"
                            value={propertyTitle}
                            onChange={(e) => setPropertyTitle(e.target.value)}
                            className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="propertyLocation" className="block text-sm font-medium text-gray-700">Property Location</label>
                        <input
                            type="text"
                            id="propertyLocation"
                            value={propertyLocation}
                            onChange={(e) => setPropertyLocation(e.target.value)}
                            className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="propertyImage" className="block text-sm font-medium text-gray-700">Property Image</label>
                        <input
                            type="file"
                            id="propertyImage"
                            onChange={handleImageChange}
                            className="mt-1 w-full text-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Agent Name</label>
                        <input
                            type="text"
                            id="agentName"
                            value={user.displayName}
                            readOnly
                            className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-md w-full bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="agentEmail" className="block text-sm font-medium text-gray-700">Agent Email</label>
                        <input
                            type="email"
                            id="agentEmail"
                            value={user.email}
                            readOnly
                            className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-md w-full bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range ($)</label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price</label>
                            <input
                                type="number"
                                id="minPrice"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price</label>
                            <input
                                type="number"
                                id="maxPrice"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
                                min="0"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
