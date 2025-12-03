"use client";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "./Icons";

interface PasswordInputProps { id: string; label: string; value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export function PasswordInput({ id, label, value, onChange, required = false,}: PasswordInputProps) 
{
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isActive = isFocused || value.length > 0;

    return (
        <div className="relative">
            <input id= {id} type= {showPassword ? "text" : "password"} value={value}
                onChange= {onChange}
                onFocus= {() => setIsFocused(true)}
                onBlur= {() => setIsFocused(false)}
                required= {required}
                placeholder= " "
                className={`w-full px-3 py-3 pr-10 bg-white border rounded-lg text-slate-900 text-sm transition-all duration-200 focus:outline-none ${isFocused
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
            <button type= "button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    );
}
