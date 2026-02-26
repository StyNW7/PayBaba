'use client';

import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

interface FormErrors {
  [key: string]: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          email: '',
          password: '',
        });
        setSubmitSuccess(false);
      }, 2000);
    }, 1500);
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
    ${errors[fieldName]
      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#F15A22] focus:ring-2 focus:ring-[#F15A22]/20'
    }
    font-sans text-gray-900 placeholder-gray-400
    focus:outline-none
  `;

  return (

    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 sm:px-8 pb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#2DAEAA] hover:text-[#229B92] font-semibold mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home Page
        </a>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600">Sign in to your PayBaba account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 sm:px-8">
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-start gap-3 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Login successful!</p>
              <p className="text-sm text-green-700">Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address <span className="text-[#F15A22]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={inputClasses('email')}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                Password <span className="text-[#F15A22]">*</span>
              </label>
              <a
                href="/auth/forgot-password"
                className="text-xs text-[#2DAEAA] hover:text-[#229B92] transition-colors font-semibold"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={inputClasses('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-gray-300 accent-[#F15A22] cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
              Remember me
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || submitSuccess}
          className="w-full bg-[#F15A22] hover:bg-[#D64919] disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all duration-300 mt-8 mb-6 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing In...
            </>
          ) : submitSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Login Successful!
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Register a */}
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-[#2DAEAA] hover:text-[#229B92] font-semibold transition-colors">
            Sign Up
          </a>
        </p>

        {/* Footer Text */}
        <div className="mt-auto mb-6">
          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-[#F15A22] hover:underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-[#F15A22] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
