"use client";

import { useEffect, useState } from "react";

const DEFAULT_CONTENT = {
  title: "Privacy Policy",
  content: `1. Introduction
Welcome to AllModern. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

2. Information We Collect
We may collect several types of information from and about users of our website, including:
- Personal identifiers such as name, email address, postal address, phone number
- Payment information (processed securely, never stored directly)
- Usage data such as IP address, browser type, pages visited, and time spent
- Cookies and similar tracking technologies

3. How We Use Your Information
We use the information we collect to:
- Process and fulfill your orders
- Send you transactional and promotional emails
- Improve our website and services
- Comply with legal obligations

4. Sharing Your Information
We do not sell your personal information. We may share it with trusted service providers who assist us in operating our website, conducting our business, or serving you.

5. Your Rights
You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact our support team.

6. Contact Us
If you have questions about this Privacy Policy, contact us at privacy@allmodern.com.`,
};

export default function PrivacyPolicyPage() {
  const [data, setData] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    const saved = localStorage.getItem("allmodern_privacy_policy");
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-[800px] px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-950 mb-8">{data.title}</h1>
        <div className="prose max-w-none text-slate-700 text-[15px] leading-7 whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </main>
  );
}
