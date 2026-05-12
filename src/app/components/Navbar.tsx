'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/authActions';

interface NavbarProps {
  user?: { username: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  
  return (
    <nav className="bg-slate-900/100 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            💰 FinTrack
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    pathname === '/dashboard'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </Link>
                <span className="text-white/60 text-sm">👤 {user.username}</span>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    pathname === '/login'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    pathname === '/register'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}