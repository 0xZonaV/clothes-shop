import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import {BUTTON_TYPES_CLASSES} from "../button/button.component";
import {FormContainer, PaymentButton, PaymentFormContainer} from "./payment-form.style";
import {useSelector} from "react-redux";
import {selectCartTotal} from "../../store/cart/cart-selector";
import {selectCurrentUser} from "../../store/user/user-selector";
import {useState} from "react";



const PaymentForm = () => {

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isPaymentProccessing, setIsPaymentProccessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements ) {
            return;
        }

        setIsPaymentProccessing(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content_Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then((res) => res.json());

        const {paymentIntent: {client_secret}} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        })

        setIsPaymentProccessing(false);

        if(paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
             if(paymentResult.paymentIntent.status === 'succeeded') {
                 alert('Payment Successful');
             }
        }
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <PaymentButton buttonType={BUTTON_TYPES_CLASSES.inverted} isLoading={isPaymentProccessing}>Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
        )
}

export default PaymentForm;
