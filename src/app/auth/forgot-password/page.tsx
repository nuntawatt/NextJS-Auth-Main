"use client";
import { useState } from "react";
import Link from "next/link";
import { FloatingInput } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!email) return setStatus({ type: "error", message: "Please enter your email." });

    try {
    } catch (err) {
    }
    setLoading(true);
    try {
      setStatus({ type: "success", message: "The email has been sent." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="w-full max-w-[490px] bg-white rounded-2xl shadow-md p-10 mx-4">
        <h2 className="text-4xl md:text-4xl font-semibold text-slate-900 text-center leading-tight">Forgot password</h2>
        <p className="text-sm text-slate-500 text-center mt-2">Enter your email to receive reset instructions.</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="mx-auto w-full max-w-[290px]">
            <FloatingInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button type="submit" disabled={loading}
            className="mx-auto block w-full max-w-[290px] py-2.5 rounded-lg text-white font-semibold bg-[#1e3a5f] hover:bg-[#152c4a] transition-all shadow-md text-sm mt-5">
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {status && (
          <div className="mx-auto w-full max-w-[290px] mt-10">
            <div className={`mt-4 text-sm p-3 rounded ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {status.message}
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-sm">
          <Link href="/auth/login" className="text-[#1e3a5f] hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}