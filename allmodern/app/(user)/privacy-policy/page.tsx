import { getContentPage } from "@/lib/actions/content";

const DEFAULT_CONTENT = {
  title: "Privacy Policy",
  content: `1. Introduction\nWelcome to AllModern. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\n2. Information We Collect\nWe may collect several types of information from and about users of our website, including:\n- Personal identifiers such as name, email address, postal address, phone number\n- Payment information (processed securely, never stored directly)\n- Usage data such as IP address, browser type, pages visited, and time spent\n- Cookies and similar tracking technologies\n\n3. How We Use Your Information\nWe use the information we collect to:\n- Process and fulfill your orders\n- Send you transactional and promotional emails\n- Improve our website and services\n- Comply with legal obligations\n\n4. Sharing Your Information\nWe do not sell your personal information. We may share it with trusted service providers who assist us in operating our website, conducting our business, or serving you.\n\n5. Your Rights\nYou have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact our support team.\n\n6. Contact Us\nIf you have questions about this Privacy Policy, contact us at privacy@allmodern.com.`,
};

export default async function PrivacyPolicyPage() {
  const dbData = await getContentPage("privacy");
  const data = dbData || DEFAULT_CONTENT;

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
