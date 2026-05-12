'use client';

import { useState } from 'react';
import { login } from '@/app/actions/authActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-900 to-slate-900 flex items-center justify-center py-12 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite]"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite_2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite_4s]"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/80 text-sm">Selamat Datang Kembali</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Login
            </h1>
            <p className="text-purple-200 mt-2">Masuk ke akun Anda</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Username atau Email
              </label>
              <input
                type="text"
                name="identifier"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/40 transition-all"
                placeholder="username atau email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/40 transition-all"
                placeholder="Masukkan password"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : '🔐 Login'}
            </button>
          </form>
          
          <p className="text-center text-white/50 mt-6 text-sm">
            Belum punya akun?{' '}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 transition">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}