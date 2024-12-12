import { useEffect, useState } from 'react';
import useAuth from './../../../hooks/useAuth';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProperty = () => {
    const [propertyTitle, setPropertyTitle] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertyImage, setPropertyImage] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {id} = useParams();

    console.log(id);

    useEffect(() => {
        // Fetch the property details from the server
        axiosPublic.get(`/getProperties/${id}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                setPropertyTitle(data.propertyTitle);
                setPropertyLocation(data.propertyLocation);
                setPropertyImage(data.propertyImageUrl);
                setMinPrice(data.minPrice);
                setMaxPrice(data.maxPrice);
            })
            .catch(error => console.error(error));
    }, [id]);

    console.log(propertyTitle);

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
            };

            console.log(propertyInfo);

            axiosSecure.put(`/properties/${id}`, propertyInfo)
                .then(res => {
                    console.log(res);
                    swal({
                        icon: "success",
                        title: "Property updated Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myAddedProperties');
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Update Property</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700">Property Title</label>
                        <input
                            type="text"
                            id="propertyTitle"
                            value={propertyTitle}
                            defaultValue={propertyTitle}
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
                            defaultValue={propertyLocation}
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
                            Update Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProperty;
