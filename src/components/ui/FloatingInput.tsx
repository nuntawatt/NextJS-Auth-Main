"use client";
import { useState } from "react";

interface FloatingInputProps {
    id: string; label: string; type?: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export function FloatingInput({ id, label, type = "text", value, onChange, required = false, }: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;

    return (
        <div className="relative">
            <input id={id} type={type} value={value} onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                placeholder=" "
                className={`w-full px-3 py-2 bg-white border rounded-md text-slate-900 text-sm transition-all duration-200 focus:outline-none ${isFocused
                    ? "border-[#1e3a5f] ring-2 ring-[#1e3a5f]/10"
                    : "border-slate-200 hover:border-slate-300"
                    }`}
            />
            <label htmlFor={id}
                className={`absolute left-2 px-1 bg-white transition-all duration-200 pointer-events-none ${isActive
                    ? "-top-2.5 text-xs font-medium text-[#1e3a5f]"
                    : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
                    }`}
            >   {label}
            </label>
        </div>
    );
}
