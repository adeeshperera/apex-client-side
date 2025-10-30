'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { register } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleFieldChange = (field: string, value: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
    
    if (field === 'fullName') setFullName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
    else if (field === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validation
    const newFieldErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newFieldErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newFieldErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newFieldErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newFieldErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newFieldErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newFieldErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setLoading(false);
      return;
    }

    try {
      await register({ name: fullName, email, password });
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/martin-katler-7RzPuV3-xyI-unsplash.jpg"
          alt="Luxury sport car background"
          fill
          className="object-cover opacity-20 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A]/80 to-[#FF6B00]/10" />
      </div>

      {/* Register Card Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-[#2D2D2D] rounded-2xl p-8 shadow-2xl border border-white/5">
          
          {/* Header - Logo and Branding */}
          <div className="flex items-center justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-white font-semibold">Apex Auto Mods</span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">Create Account</h1>
          <p className="text-center text-gray-400 mb-8 text-sm">Join our community of car enthusiasts</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in backdrop-blur-sm">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                  fieldErrors.fullName 
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20'
                }`}
                placeholder="John Doe"
              />
              {fieldErrors.fullName && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                  fieldErrors.email 
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20'
                }`}
                placeholder="your@email.com"
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                  fieldErrors.password 
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20'
                }`}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">At least 8 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                  fieldErrors.confirmPassword 
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20'
                }`}
                placeholder="••••••••"
              />
              {fieldErrors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-5 h-5 accent-[#FF6B00] bg-[#1A1A1A] border border-white/20 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-gray-400 text-sm leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link href="#" className="text-[#FF6B00] hover:text-[#FF8C00] transition-colors font-medium">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link href="#" className="text-[#FF6B00] hover:text-[#FF8C00] transition-colors font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white rounded-lg hover:from-[#E55A2B] hover:to-[#E57A35] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/50"
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-[#FF6B00] hover:text-[#FF8C00] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}