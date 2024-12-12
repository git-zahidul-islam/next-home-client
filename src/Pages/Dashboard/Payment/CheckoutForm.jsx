import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import useAuth from './../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ id, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [clientSecret, setClientSecret] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    console.log(id);


    const { data: paymentProperty = {}, isPending } = useQuery({
        queryKey: ['paymentProperty'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/acceptOffer/${id}`);
            // setAmount(res.data.offeredAmount);
            return res.data;
        }
    })

    console.log(amount);


    useEffect(() => {
        axiosPublic.post("/create_payment_intent", { price: amount })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic, amount]);

    if(isPending) {
        return <h1>Loading...</h1>
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            swal({
                title: 'Something went wrong',
                icon: 'error'
            })
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            swal({
                title: 'Something went wrong',
                icon: 'error'
            })
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            swal({
                title: 'Oops',
                text: `${error.message}`,
                icon: 'error'
            });
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm error ->", confirmError);
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransectionId(paymentIntent.id)
                const payment = {
                    buyerEmail : user.email,
                    buyerName: user.displayName,
                    date: new Date().toISOString(),
                    transectionId,
                    soldPrice: amount,
                    propertyTitle: paymentProperty.propertyTitle,
                    propertyLocation: paymentProperty.propertyLocation,
                    propertyImageUrl: paymentProperty.propertyImageUrl,
                    agentName: paymentProperty.agentName,
                    agentEmail: paymentProperty.agentEmail,
                };

                const response = await axiosPublic.put(`/addTransactionId/${id}`, {transactionId: transectionId, status : 'bought'});
                const res = await axiosPublic.post("/payment", payment);
                if (res.data.insertedId && response.data.modifiedCount) {
                    swal({
                        position: "center",
                        icon: "success",
                        title: "Payment Successful!!!",
                        text: "Wow! You bought this!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/propertyBought');
                }
                console.log(res.data);
            }
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Property Title</label>
                    <input
                        type="text"
                        value={paymentProperty.propertyTitle}
                        readOnly
                        className="w-full mt-2 p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Property Location</label>
                    <input
                        type="text"
                        value={paymentProperty.propertyLocation}
                        readOnly
                        className="w-full mt-2 p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Agent Name</label>
                    <input
                        type="text"
                        value={paymentProperty.agentName}
                        readOnly
                        className="w-full mt-2 p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Offered Amount</label>
                    <input
                        type="number"
                        value={paymentProperty.offeredAmount}
                        readOnly
                        className="w-full mt-2 p-2 border rounded"
                    />
                </div>


                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="w-full mt-2 p-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full mt-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                    disabled={!stripe || !clientSecret}
                >
                    Pay ${paymentProperty.offeredAmount}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;