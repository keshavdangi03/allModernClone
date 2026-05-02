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

  const inputClass =
    "h-[29px] w-full border border-[#8f8f8f] bg-white px-2 text-[10px] outline-none placeholder:text-[#8b8b8b] focus:border-[#3b82f6]";
  const buttonClass = "h-[29px] w-full bg-[#1f1d24] text-[10px] font-medium text-white transition hover:bg-[#17151b]";

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-[#111111]">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-6">
        <header className="pt-8">
          <div className="flex items-start justify-between border-b border-[#9f9f9f] pb-2">
            <Link href="/" className="text-[34px] font-bold tracking-[0.16em] text-[#111111]">
              ALLMODERN
            </Link>
            <p className="flex items-center gap-1 pt-1 text-[11px] text-[#222222]">
              <span>Secure Login</span>
              <Lock className="h-2.5 w-2.5" />
            </p>
          </div>
        </header>

        <section className="mx-auto mt-10 w-full max-w-[214px] text-center">
          {step === "email" ? (
            <>
              <h1 className="text-[14px] font-semibold leading-[1.35] text-[#111111]">
                Enter your email address to sign in
                <br />
                or to create an account
              </h1>

              <div className="mt-5 space-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-label="Email Address"
                  className={inputClass}
                />
                <button type="button" onClick={handleContinueFromEmail} className={buttonClass}>
                  Continue
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-px flex-1 bg-[#9d9d9d]" />
                <span className="text-[9px] text-[#555555]">Or</span>
                <span className="h-px flex-1 bg-[#9d9d9d]" />
              </div>

              <button
                type="button"
                className="mt-3 flex h-[29px] w-full items-center justify-center gap-1 border border-[#8f8f8f] bg-white text-[10px] text-[#111111]"
              >
                <span className="text-[11px] leading-none"></span>
                <span>Continue with Apple</span>
              </button>

              <p className="mt-3 text-[9px] leading-[1.4] text-[#222222]">
                By continuing, you agree to our{" "}
                <a href="#" className="underline">
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  terms of use
                </a>
                .
              </p>
            </>
          ) : null}

          {step === "password" ? (
            <>
              <h1 className="text-[14px] font-semibold leading-[1.35] text-[#111111]">Create a Password</h1>
              <p className="mt-1 text-[9px] text-[#222222]">{email}</p>
              <button type="button" onClick={() => setStep("email")} className="mt-1 text-[9px] underline">
                Use a Different Email
              </button>

              <div className="relative mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-label="Create Password"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button type="button" onClick={handleCreateAccount} className={`mt-3 ${buttonClass}`}>
                Create Account
              </button>

              <p className="mt-3 text-[9px] leading-[1.4] text-[#222222]">
                By creating an account, you agree to our{" "}
                <a href="#" className="underline">
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  terms of use
                </a>
                .
              </p>
              <p className="mt-3 text-[9px]">
                Have an account?{" "}
                <button type="button" className="underline" onClick={() => setStep("email")}>
                  Sign In
                </button>
              </p>
            </>
          ) : null}

          {step === "phone" ? (
            <>
              <h1 className="text-[14px] font-semibold leading-[1.35] text-[#111111]">Add a Mobile Phone Number</h1>
              <p className="mt-2 text-[9px] leading-[1.4] text-[#222222]">
                Easily recover and secure your account. We&apos;ll text you a code to verify it&apos;s you.
              </p>

              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-label="Mobile Number"
                className="mt-3 h-[29px] w-full border border-[#8f8f8f] bg-white px-2 text-[10px] outline-none placeholder:text-[#8b8b8b] focus:border-[#3b82f6]"
              />

              <button type="button" onClick={handleSendCode} className={`mt-3 ${buttonClass}`}>
                Send Code
              </button>

              <p className="mt-3 text-left text-[9px] leading-[1.5] text-[#222222]">
                By entering your phone number, you agree to receive text messages with authentication codes. Message
                frequency varies. Message and data rates may apply. Text HELP for help & STOP to cancel.{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  SMS Terms
                </a>
                .
              </p>

              <button type="button" onClick={completeLogin} className="mt-3 text-[10px] underline">
                No Thanks
              </button>
            </>
          ) : null}

          {step === "code" ? (
            <>
              <h1 className="text-[14px] font-semibold leading-[1.35] text-[#111111]">Confirm Verification Code</h1>
              <p className="mt-2 text-[10px] text-[#222222]">Enter the code we just texted you.</p>

              <input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                aria-label="Verification Code"
                className="mt-3 h-[29px] w-full border border-[#8f8f8f] bg-white px-2 text-[10px] outline-none placeholder:text-[#8b8b8b] focus:border-[#3b82f6]"
              />

              <button type="button" onClick={completeLogin} className="mt-3 h-[29px] w-full bg-[#8f9098] text-[10px] text-white">
                Sign In
              </button>

              <button type="button" className="mt-3 text-[9px] underline" onClick={() => setStep("phone")}>
                Didn&apos;t get a code? Resend Code
              </button>

              <button type="button" className="mt-3 block w-full text-center text-[10px] underline" onClick={completeLogin}>
                Maybe Later
              </button>
            </>
          ) : null}
        </section>

        <footer className="mt-auto pb-3 pt-8 text-[10px] text-[#222222]">
          <p className="mb-2">Your Opt Out Preference Signal is Honored</p>
          <div className="flex items-center gap-2">
            <a href="#" className="underline">
              Terms of Use
            </a>
            <a href="#" className="underline">
              Privacy Policy
            </a>
            <a href="#" className="underline">
              Your Privacy Rights & Choices
            </a>
          </div>
          <p className="mt-2">© 2026 by Wayfair LLC, 4 Copley Place, 7th Floor, Boston, MA 02118</p>
        </footer>
      </div>
    </main>
  );
}
