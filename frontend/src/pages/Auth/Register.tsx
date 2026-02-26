'use client';

import { useEffect, useState } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthVisual from '@/components/auth/auth-visual';

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center overflow-y-auto bg-white animate-in fade-in slide-in-from-left duration-500">
        <div className="w-full max-w-md py-8">
          <RegisterForm />
        </div>
      </div>

      {/* Right Side - Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2">
        <AuthVisual />
      </div>
    </div>
  );
}
