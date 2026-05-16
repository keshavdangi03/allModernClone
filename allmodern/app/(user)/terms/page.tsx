"use client";

import { useEffect, useState } from "react";

const DEFAULT_CONTENT = {
  title: "Terms and Conditions of Use",
  subtitle: "Welcome to AllModern. By accessing or using our website, you agree to be bound by these Terms and Conditions.",
  content: `1. Introduction
Welcome to AllModern ("we", "our", or "us"). These Terms and Conditions govern your use of our website, mobile application, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and Conditions.

2. Account Registration
To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials.

3. Products and Purchases
All purchases are subject to product availability. We reserve the right to limit quantities purchased per person, per household, or per order. Prices are subject to change without notice.

4. Return Policy
We offer a 30-day return policy for most items. Items must be in their original condition and packaging. Some exclusions apply. Please visit our Help Center for full details.

5. Intellectual Property
All content on this website, including text, graphics, logos, and images, is the property of AllModern or its content suppliers and is protected by intellectual property laws.

6. Limitation of Liability
AllModern shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.

7. Governing Law
These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts.

8. Contact Us
If you have questions about these Terms, please contact us at legal@allmodern.com.`,
};

export default function TermsPage() {
  const [data, setData] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    const saved = localStorage.getItem("allmodern_terms_conditions");
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-[800px] px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-950 mb-3">{data.title}</h1>
        {data.subtitle && (
          <p className="text-slate-500 text-[15px] mb-8 leading-6">{data.subtitle}</p>
        )}
        <div className="prose max-w-none text-slate-700 text-[15px] leading-7 whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </main>
  );
}
