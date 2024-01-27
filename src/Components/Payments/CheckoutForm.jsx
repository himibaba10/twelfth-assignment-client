import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ contest }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { _id, price, name, email, deadline } = contest;

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: parseFloat(price) })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: paymentIntentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous@anonymous.com",
          },
        },
      });

    if (paymentIntentError) {
      console.log(paymentIntentError);
      setError(paymentIntentError.message);
    } else {
      setError("");
      console.log("[payment intent]", paymentIntent);
      axiosSecure
        .post("/register", {
          contestId: _id,
          name: user?.displayName,
          email: user?.email,
          contest: name,
          contestOwner: email,
          deadline,
          participated: false,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Registation Successful!",
              text: "You registered successfully",
              icon: "success",
            });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`Error registering with ${err.message}`);
        });
    }
  };

  return (
    <div className="mb-20">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-gradient-to-tr from-primary to-secondary px-10 text-white text-lg mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

CheckoutForm.propTypes = {
  contest: PropTypes.object,
};

export default CheckoutForm;
