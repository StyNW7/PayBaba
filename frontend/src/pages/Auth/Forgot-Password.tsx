'use client';

import { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (): boolean => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <a
          href="/auth/login"
          className="inline-flex items-center gap-2 text-[#2DAEAA] hover:text-[#229B92] font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </a>

        {!submitted ? (
          <>
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600 mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 font-sans text-gray-900 placeholder-gray-400 focus:outline-none ${
                    error
                      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#F15A22] focus:ring-2 focus:ring-[#F15A22]/20'
                  }`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F15A22] hover:bg-[#D64919] disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h1>
              <p className="text-gray-600 mb-8">
                We've sent a password reset link to <span className="font-semibold">{email}</span>. 
                Please check your inbox and follow the instructions.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="w-full border-2 border-[#F15A22] text-[#F15A22] hover:bg-orange-50 font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Try Another Email
                </button>
                <a
                  href="/auth/login"
                  className="block bg-[#F15A22] hover:bg-[#D64919] text-white font-semibold py-3 rounded-lg transition-all duration-300 text-center"
                >
                  Back to Login
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
