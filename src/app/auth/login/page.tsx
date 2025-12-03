"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingInput, PasswordInput, GoogleIcon } from "@/components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1e3a5f]/10 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2d4a6f]/10 rounded-full opacity-50 blur-3xl" />
      </div>

      <motion.div className="relative w-full max-w-sm z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-100 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-1">Logo</h1>
            <p className="text-sm text-slate-500">Welcome back to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <FloatingInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <PasswordInput id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="h-4 w-4 text-[#1e3a5f] border-slate-300 rounded" />
                <label htmlFor="remember" className="text-slate-600">Remember me</label>
              </div>
              <Link href="/auth/forgot-password" className="text-[#1e3a5f] hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold bg-[#1e3a5f] hover:bg-[#152c4a] transition-all shadow-md text-sm">
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-slate-400">or</span></div>
          </div>

          {/* Google */}
          <button type="button" className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700">
            <GoogleIcon /> Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-5 text-center text-sm text-slate-600">
            Don&apos;t have an account? <Link href="/auth/register" className="text-[#1e3a5f] font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
