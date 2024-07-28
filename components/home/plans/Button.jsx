"use client";

import { loadStripe } from "@stripe/stripe-js";

export default function Button() {
  const items = [{ title: "test", price: 58, quantity: 1 }];
  const handleCartCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        }
      );
      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className="rounded-full text-white mx-auto md:mx-0 bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
      onClick={handleCartCheckout}
    >
      Buy plan
    </button>
  );
}
