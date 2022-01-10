import stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config/constants";

export const Stripe =  new stripe.Stripe(STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-08-27"
});
