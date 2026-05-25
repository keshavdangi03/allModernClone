import { getContentPage } from "@/lib/actions/content";

const DEFAULT_CONTENT = {
  title: "Terms and Conditions of Use",
  subtitle: "Welcome to AllModern. By accessing or using our website, you agree to be bound by these Terms and Conditions.",
  content: `1. Introduction\nWelcome to AllModern ("we", "our", or "us"). These Terms and Conditions govern your use of our website, mobile application, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and Conditions.\n\n2. Account Registration\nTo access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials.\n\n3. Products and Purchases\nAll purchases are subject to product availability. We reserve the right to limit quantities purchased per person, per household, or per order. Prices are subject to change without notice.\n\n4. Return Policy\nWe offer a 30-day return policy for most items. Items must be in their original condition and packaging. Some exclusions apply. Please visit our Help Center for full details.\n\n5. Intellectual Property\nAll content on this website, including text, graphics, logos, and images, is the property of AllModern or its content suppliers and is protected by intellectual property laws.\n\n6. Limitation of Liability\nAllModern shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.\n\n7. Governing Law\nThese Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts.\n\n8. Contact Us\nIf you have questions about these Terms, please contact us at legal@allmodern.com.`,
};

export default async function TermsPage() {
  const dbData = await getContentPage("terms");
  const data = dbData || DEFAULT_CONTENT;

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
