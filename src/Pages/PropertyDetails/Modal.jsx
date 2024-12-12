import { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        if (review) {
            onSubmit({ review: review }); // Replace 'Current User' with actual user name
            setReview('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
                <h3 className="text-xl font-bold mb-4">Add a Review</h3>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    rows="10"
                    cols="100"
                    placeholder="Write your review here..."
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
