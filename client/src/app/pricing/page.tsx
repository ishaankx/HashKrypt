"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    subtitle: "Get started with essential encryption features.",
    features: [
      "5 free credits / month",
      "2 credits per encrypt/decrypt (<100 MB)",
      "5 credits per encrypt/decrypt (>100 MB)",
      "Send via HashKrypt: 1 time / month",
      "Ads included",
    ],
    cta: "Start for Free",
    highlight: false,
  },
  {
    name: "Plus",
    price: "₹1,666 / month",
    subtitle: "More credits and ad-free experience.",
    features: [
      "20 starting credits + 4 credits / day",
      "Increased file size per encryption",
      "Send via HashKrypt: 2 times / day",
      "Ad-free",
      "Limited access to Password Manager",
    ],
    cta: "Get Plus",
    highlight: true,
  },
  {
    name: "Pro",
    price: "₹2,566 / month",
    subtitle: "Full power, enterprise ready.",
    features: [
      "50 starting credits + 6 credits / day",
      "Increased file size per encryption",
      "Send via HashKrypt: 5 times / day",
      "Ad-free",
      "Full access to Password Manager",
    ],
    cta: "Get Pro",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6">
      {/* Heading */}
      <section className="max-w-4xl mx-auto text-center mb-12 -mt-20 sm:mb-16 pt-24 sm:pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4"
        >
          Choose Your Plan
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Scale your encryption with flexible plans. Start for free and upgrade
          as your needs grow.
        </p>
      </section>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 max-w-6xl w-full">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`relative flex flex-col justify-between rounded-2xl border ${
              plan.highlight
                ? "border-[#39ff14] shadow-[0_0_20px_#39ff14]/40"
                : "border-gray-800"
            } bg-gray-900/40 p-6 sm:p-8 hover:scale-[1.02] transition-transform max-w-sm mx-auto w-full`}
          >
            {/* Title & Price */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {plan.name}
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#39ff14] mb-4">
                {plan.price}
              </p>
              <p className="text-gray-400 text-sm mb-6">{plan.subtitle}</p>

              {/* Features */}
              <ul className="space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-300 text-sm sm:text-base leading-snug"
                  >
                    <span className="text-[#39ff14]">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6 sm:mt-8">
              <Button
                variant="rect"
                size="lg"
                className={`w-full ${
                  plan.highlight
                    ? "bg-[#39ff14] text-black hover:bg-[#2ecc71]"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <p className="text-gray-500 text-xs text-center mt-10 sm:mt-12">
        Credits reset monthly. Sending and encryption costs are calculated per
        file. Terms and limits apply.
      </p>
    </main>
  );
}
