import Stripe from "stripe";

// ビルド時はStripeの初期化をスキップ
export const stripe = process.env.STRIPE_API_KEY
  ? new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    })
  : null;
