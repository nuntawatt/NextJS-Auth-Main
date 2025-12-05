"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingInput, PasswordInput, GoogleIcon } from "@/components/ui";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) return setError("Passwords do not match");
    setLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Signup failed");
        setSuccess(true);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(String(msg));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1e3a5f]/10 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2d4a6f]/10 rounded-full opacity-50 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-sm z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-100 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Create Account</h1>
            <p className="text-sm text-slate-500">Get started with your new account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <FloatingInput id="name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <FloatingInput id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <PasswordInput id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <PasswordInput id="confirmPassword" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            {error && <p className="text-xs text-red-600">{error}</p>}
            {success && <p className="text-xs text-green-700">Account created — you can sign in.</p>}
            <button disabled={loading} type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold bg-[#1e3a5f] hover:bg-[#152c4a] transition-all shadow-md text-sm mt-6 disabled:opacity-60">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-slate-400">or</span></div>
          </div>

          {/* Google */}
          <button
            type="button"
            disabled={googleLoading}
            onClick={async () => {
              setGoogleLoading(true);
              try {
                await signIn('google');
              } finally {
                setGoogleLoading(false);
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700 mt-5 disabled:opacity-60"
          >
            <GoogleIcon /> {googleLoading ? 'Opening...' : 'Continue with Google'}
          </button>

          {/* Footer */}
          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account? <Link href="/auth/login" className="text-[#1e3a5f] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
