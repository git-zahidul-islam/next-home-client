import { useParams } from 'react-router-dom';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


// TODO : Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


const PaymentPage = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: paymentProperty = {}, isPending } = useQuery({
        queryKey: ['paymentProperty'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/acceptOffer/${id}`);
            return res.data;
        }
    })

    if(isPending){
        return <p>Loading...</p>
    }


    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
            <h2 className="text-2xl  text-center font-bold mb-6">Payment Page</h2>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm id={id} amount = {paymentProperty.offeredAmount}/>
            </Elements>
        </div>
    );
};

export default PaymentPage;
