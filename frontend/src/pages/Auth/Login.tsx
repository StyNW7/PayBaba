'use client';

import { useEffect, useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import AuthVisual from '@/components/auth/auth-visual';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Right Side - Form (Slides from Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center overflow-y-auto bg-white animate-in fade-in slide-in-from-right duration-500">
        <div className="w-full max-w-md py-8">
          <LoginForm />
        </div>
      </div>

      {/* Left Side - Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 lg:order-first">
        <AuthVisual />
      </div>
    </div>
  );
}
