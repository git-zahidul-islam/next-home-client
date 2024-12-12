import React from 'react';

const FAQ = () => {
    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions (FAQs)</h1>
            <p className="text-center mb-8">Welcome to our FAQ section. Here, you'll find answers to some of the most common questions about our real estate platform. Whether you're a buyer, seller, or agent, this section is designed to provide you with quick and helpful information to ensure a smooth and satisfying experience.</p>
            <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        How do I create an account?
                    </div>
                    <div className="collapse-content">
                        <p>To create an account, click on the "Sign Up" button at the top right corner of the homepage. Fill in the required information, verify your email, and you'll be ready to start exploring properties.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How can I list my property on the platform?
                    </div>
                    <div className="collapse-content">
                        <p>Once you have an agent account, go to the "Add Property" section in your dashboard. Fill in the property details, upload images, and submit your listing for verification. Our team will review and publish it on the site.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        What should I do if I forget my password?
                    </div>
                    <div className="collapse-content">
                        <p>If you forget your password, click on the "Forgot Password" link on the login page. Enter your registered email address, and we'll send you a link to reset your password.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How does the property verification process work?
                    </div>
                    <div className="collapse-content">
                        <p>After you submit a property for listing, our team will review the details and images. If everything meets our standards, the property will be marked as verified and made visible to potential buyers.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        Can I update my property listing after it's been published?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, you can update your property listing at any time. Go to the "My Added Properties" section in your dashboard, select the property you want to update, make the necessary changes, and save them.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How do I make an offer on a property?
                    </div>
                    <div className="collapse-content">
                        <p>To make an offer, click on the "Make an Offer" button on the property details page. Fill in the offer form with your details and the offered amount within the specified price range. Submit the form to send your offer to the agent.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How can I contact an agent directly?
                    </div>
                    <div className="collapse-content">
                        <p>You can contact an agent directly through the property details page. Click on the "Contact Agent" button, and you'll be able to send a message or schedule a viewing appointment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
