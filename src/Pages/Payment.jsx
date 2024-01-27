import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../Components/Payments/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";

const stripePromise = loadStripe(
  "pk_test_51IfozGLPGv78GAwMFi3WifPi5n2jjDqFofgLy46PGcHo7EtUq8lKoxzzBZngDhg8j96grVl4NgXHNKrD5jgOHV4T00nvaSkq9s"
);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure(`/get-contest/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const { name } = contest;
  return (
    <div className="section">
      <div className="text-white p-7 sm:px-12 sm:py-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary mb-10 sm:mb-20">
        <h2 className="text-center text-2xl sm:text-4xl font-bold">
          Payment For {name}
        </h2>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm contest={contest} />
      </Elements>
    </div>
  );
};

export default Payment;
