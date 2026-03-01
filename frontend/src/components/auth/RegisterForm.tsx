/* eslint-disable no-useless-escape */
'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router';

interface FormErrors {
  [key: string]: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    fullName: '',
    city: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setErrors(prev => ({ ...prev, general: error }));
    }
  }, [error]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9\-\+\s\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    // Clear general error
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: '',
      }));
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        fullName: formData.fullName,
        city: formData.city,
        address: formData.address,
        phoneNumber: formData.phone,
      });

      setSubmitSuccess(true);
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch {
      // Error is already handled in auth context
    }
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
      <div className="pt-8 px-6 sm:px-8 pb-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#2DAEAA] hover:text-[#229B92] font-semibold mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home Page
        </a>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join PayBaba and unlock credit intelligence</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8">
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-start gap-3 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Registration successful!</p>
              <p className="text-sm text-green-700">Redirecting to login page...</p>
            </div>
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-900">Registration failed</p>
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Email */}
          <div className="sm:col-span-2">
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
              disabled={isLoading || submitSuccess}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="sm:col-span-2">
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
              Company Name <span className="text-[#F15A22]">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your Business Name"
              className={inputClasses('companyName')}
              disabled={isLoading || submitSuccess}
            />
            {errors.companyName && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.companyName}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name <span className="text-[#F15A22]">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClasses('fullName')}
              disabled={isLoading || submitSuccess}
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
              City <span className="text-[#F15A22]">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Jakarta"
              className={inputClasses('city')}
              disabled={isLoading || submitSuccess}
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.city}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
              Address <span className="text-[#F15A22]">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, building, etc."
              className={inputClasses('address')}
              disabled={isLoading || submitSuccess}
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.address}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number <span className="text-[#F15A22]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+62 812 3456 7890"
              className={inputClasses('phone')}
              disabled={isLoading || submitSuccess}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
              Password <span className="text-[#F15A22]">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className={inputClasses('password')}
                disabled={isLoading || submitSuccess}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isLoading || submitSuccess}
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
            <p className="mt-2 text-xs text-gray-500">
              Must include uppercase, lowercase, and numbers
            </p>
          </div>

          {/* Confirm Password */}
          <div className="sm:col-span-2">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm Password <span className="text-[#F15A22]">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={inputClasses('confirmPassword')}
                disabled={isLoading || submitSuccess}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isLoading || submitSuccess}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || submitSuccess}
          className="w-full bg-[#F15A22] hover:bg-[#D64919] disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all duration-300 mt-6 mb-4 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Account...
            </>
          ) : submitSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Account Created!
            </>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-[#2DAEAA] hover:text-[#229B92] font-semibold transition-colors">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}