"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

type AccountStep = "email" | "password" | "phone" | "code";

export default function AccountPage() {
  const router = useRouter();
  const [step, setStep] = useState<AccountStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  const completeLogin = () => {
    localStorage.setItem("allmodern-auth", "true");
    localStorage.setItem("allmodern-auth-email", email.trim());
    router.push("/");
  };

  const handleContinueFromEmail = () => {
    if (!email.trim()) {
      return;
    }
    setStep("password");
  };

  const handleCreateAccount = () => {
    if (!password.trim()) {
      return;
    }
    setStep("phone");
  };

  const handleSendCode = () => {
    if (!phone.trim()) {
      return;
    }
    setStep("code");
  };

  const floatingInput = (
    label: string,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    focused: boolean,
    setFocused: (v: boolean) => void,
    extra?: React.ReactNode
  ) => {
    const isActive = focused || value.length > 0;
    return (
      <div className="relative w-full">
        <label
          className={`pointer-events-none absolute left-3 transition-all duration-200 ${
            isActive
              ? "-top-2.5 bg-white px-1 text-[12px] text-[#1a1a1a]"
              : "top-1/2 -translate-y-1/2 text-[15px] text-[#6b6b6b]"
          }`}
        >
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label={label}
          className={`h-[52px] w-full rounded-[3px] border-2 bg-white px-3 pt-1 text-[15px] text-[#111] outline-none transition-colors ${
            focused ? "border-[#1a237e]" : "border-[#767676]"
          }`}
        />
        {extra}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#111111]">
      {/* Header */}
      <header className="w-full">
        <div className="mx-auto flex w-full max-w-[820px] items-end justify-between px-6 pb-3 pt-8">
          <Link href="/" className="text-[28px] font-medium tracking-[0.18em] text-[#111111] sm:text-[34px]">
            ALLMODERN
          </Link>
          <p className="flex items-center gap-1.5 pb-1 text-[13px] text-[#222222]">
            <span>Secure Login</span>
            <Lock className="h-3.5 w-3.5" />
          </p>
        </div>
        <div className="mx-auto w-full max-w-[820px] px-6">
          <div className="h-px w-full bg-[#999999]" />
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto mt-12 w-full max-w-[500px] flex-1 px-6 text-center sm:mt-16">
        {step === "email" ? (
          <>
            <h1 className="text-[22px] font-bold leading-[1.35] text-[#111111] sm:text-[24px]">
              Enter your email address to sign in
              <br />
              or to create an account
            </h1>

            <div className="mt-8 space-y-4">
              {floatingInput(
                "Email Address",
                "email",
                email,
                (e) => setEmail(e.target.value),
                emailFocused,
                setEmailFocused
              )}
              <Link href="/dashboard"><button
                type="button"
                onClick={handleContinueFromEmail}
                className="h-[48px] w-full bg-[#1f1d24] text-[15px] font-medium text-white transition hover:bg-[#111]"
              >
                Continue
              </button></Link>
            </div>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#c0c0c0]" />
              <span className="text-[14px] text-[#555555]">Or</span>
              <span className="h-px flex-1 bg-[#c0c0c0]" />
            </div>

            <button
              type="button"
              className="flex h-[48px] w-full items-center justify-center gap-2 border border-[#767676] bg-white text-[15px] text-[#111111] transition hover:bg-[#f9f9f9]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-1.15.69-2.44 1.03-3.89 1.03-1.36 0-2.6-.36-3.72-1.07-1.13-.72-2.02-1.68-2.68-2.89-.7-1.29-1.06-2.71-1.06-4.24 0-1.77.45-3.37 1.35-4.79.9-1.43 2.12-2.42 3.66-2.98.63-.23 1.24-.37 1.83-.42.59-.05 1.38.02 2.37.2v3.09c-.74-.56-1.55-.84-2.43-.84-.98 0-1.81.37-2.49 1.1-.68.74-1.02 1.68-1.02 2.83 0 1.18.35 2.14 1.04 2.87.7.73 1.55 1.1 2.56 1.1.91 0 1.74-.31 2.49-.92v3.14c-.34.13-.68.24-1.01.33zm-5.56-16.96h5.97v2.63h-5.97V3.32z" />
              </svg>
              <span>Continue with Apple</span>
            </button>

            <p className="mt-5 text-[13px] leading-[1.5] text-[#333333]">
              By continuing, you agree to our{" "}
              <a href="#" className="underline underline-offset-2">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                terms of use
              </a>
              .
            </p>
          </>
        ) : null}

        {step === "password" ? (
          <>
            <h1 className="text-[22px] font-bold leading-[1.35] text-[#111111] sm:text-[24px]">
              Create a Password
            </h1>
            <p className="mt-2 text-[14px] text-[#333333]">{email}</p>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="mt-1 text-[14px] underline underline-offset-2 hover:text-black"
            >
              Use a Different Email
            </button>

            <div className="relative mt-6">
              {floatingInput(
                "Minimum 8 characters",
                showPassword ? "text" : "password",
                password,
                (e) => setPassword(e.target.value),
                passwordFocused,
                setPasswordFocused,
                <button
                  type="button"
                  onClick={() => setShowPassword((c) => !c)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-medium underline underline-offset-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleCreateAccount}
              className="mt-4 h-[48px] w-full bg-[#1f1d24] text-[15px] font-medium text-white transition hover:bg-[#111]"
            >
              Create Account
            </button>

            <p className="mt-5 text-[13px] leading-[1.5] text-[#333333]">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline underline-offset-2">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                terms of use
              </a>
              .
            </p>
            <p className="mt-4 text-[14px]">
              Have an account?{" "}
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={() => setStep("email")}
              >
                Sign In
              </button>
            </p>
          </>
        ) : null}

        {step === "phone" ? (
          <>
            <h1 className="text-[22px] font-bold leading-[1.35] text-[#111111] sm:text-[24px]">
              Add a Mobile Phone Number
            </h1>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#333333]">
              Easily recover and secure your account. We&apos;ll text you a code to verify it&apos;s you.
            </p>

            <div className="mt-6">
              {floatingInput(
                "Mobile Number",
                "tel",
                phone,
                (e) => setPhone(e.target.value),
                phoneFocused,
                setPhoneFocused
              )}
            </div>

            <button
              type="button"
              onClick={handleSendCode}
              className="mt-4 h-[48px] w-full bg-[#1f1d24] text-[15px] font-medium text-white transition hover:bg-[#111]"
            >
              Send Code
            </button>

            <p className="mt-5 text-left text-[12px] leading-[1.6] text-[#333333]">
              By entering your phone number, you agree to receive text messages with authentication codes. Message
              frequency varies. Message and data rates may apply. Text HELP for help &amp; STOP to cancel.{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                SMS Terms
              </a>
              .
            </p>

            <button
              type="button"
              onClick={completeLogin}
              className="mt-4 text-[14px] underline underline-offset-2"
            >
              No Thanks
            </button>
          </>
        ) : null}

        {step === "code" ? (
          <>
            <h1 className="text-[22px] font-bold leading-[1.35] text-[#111111] sm:text-[24px]">
              Confirm Verification Code
            </h1>
            <p className="mt-3 text-[14px] text-[#333333]">Enter the code we just texted you.</p>

            <div className="mt-6">
              {floatingInput(
                "Verification Code",
                "text",
                code,
                (e) => setCode(e.target.value),
                codeFocused,
                setCodeFocused
              )}
            </div>

            <button
              type="button"
              onClick={completeLogin}
              className="mt-4 h-[48px] w-full bg-[#8f9098] text-[15px] font-medium text-white transition hover:bg-[#777]"
            >
              Sign In
            </button>

            <button
              type="button"
              className="mt-4 text-[13px] underline underline-offset-2"
              onClick={() => setStep("phone")}
            >
              Didn&apos;t get a code? Resend Code
            </button>

            <button
              type="button"
              className="mt-3 block w-full text-center text-[14px] underline underline-offset-2"
              onClick={completeLogin}
            >
              Maybe Later
            </button>
          </>
        ) : null}
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full pb-6 pt-12">
        <div className="mx-auto w-full max-w-[820px] px-6">
          <p className="mb-3 text-[13px] font-semibold text-[#1a6b44]">
            Your Opt Out Preference Signal is Honored
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#222222]">
            <a href="#" className="underline underline-offset-2">
              Terms of Use
            </a>
            <a href="#" className="underline underline-offset-2">
              Privacy Policy
            </a>
            <a href="#" className="underline underline-offset-2">
              Your Privacy Rights &amp; Choices
            </a>
          </div>
          <p className="mt-3 text-[12px] text-[#555555]">
            © 2026 by Wayfair LLC, 4 Copley Place, 7th Floor, Boston, MA 02116
          </p>
        </div>
      </footer>
    </main>
  );
}
