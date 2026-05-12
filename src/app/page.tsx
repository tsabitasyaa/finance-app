import Link from 'next/link';
import { getSession } from '@/app/lib/auth';

export default async function Home() {
  const user = await getSession();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background Blobs - menggunakan Tailwind animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite_2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite_4s]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* Hero Section - Centered */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            FinTrack
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Kelola Keuangan Pribadi dengan Mudah, Cepat, dan Cerdas
          </p>
        </div>
        
        {/* Main Content: 2 Columns Layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* LEFT - Preview Dashboard */}
          <div className="group">
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20">
              <div className="bg-white/10 px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white/60 text-sm ml-2 font-mono">FinTrack Dashboard</span>
              </div>
              
              <div className="p-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl p-5 mb-6 border border-purple-500/30 backdrop-blur-sm">
                  <p className="text-purple-200 text-sm mb-1">Total Saldo</p>
                  <p className="text-4xl font-bold text-white">Rp 2.500.000</p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="text-green-400">↑ +12.5%</span>
                    <span className="text-white/40">dari bulan lalu</span>
                  </div>
                </div>
                
                {/* Stats Ringkas */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-green-400 text-sm">Pemasukan</p>
                    <p className="text-white font-semibold">Rp 5.000.000</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-red-400 text-sm">Pengeluaran</p>
                    <p className="text-white font-semibold">Rp 2.500.000</p>
                  </div>
                </div>
                
                {/* Daftar Transaksi */}
                <div className="space-y-2 max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {[
                    { icon: '💼', name: 'Gaji Bulanan', amount: '+Rp 5.000.000', type: 'income' },
                    { icon: '🛒', name: 'Supermarket', amount: '-Rp 500.000', type: 'expense' },
                    { icon: '🍕', name: 'Makan & Cafe', amount: '-Rp 350.000', type: 'expense' },
                    { icon: '🚗', name: 'Transportasi', amount: '-Rp 200.000', type: 'expense' },
                    { icon: '📱', name: 'Digital Service', amount: '-Rp 150.000', type: 'expense' },
                    { icon: '🎬', name: 'Hiburan', amount: '-Rp 100.000', type: 'expense' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-white/80 text-sm">{item.name}</span>
                      </div>
                      <span className={`font-semibold text-sm ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Add Button Simulasi */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold opacity-70 cursor-default transition-all">
                    + Tambah Transaksi Baru
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-3">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-white/60 text-xs">
                <span>✨</span> Live Preview
              </div>
            </div>
          </div>
          
          {/* RIGHT - Features Cards */}
          <div className="space-y-4">
            <div className="mb-2">
              <h2 className="text-2xl font-semibold text-white mb-2">Fitur Unggulan</h2>
              <p className="text-purple-200 text-sm">Semua yang Anda butuhkan untuk mengelola keuangan</p>
            </div>
            
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r bg-black/30 hover:from-white/10 hover:to-white/10 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 hover:translate-x-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
                  📝
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Catat Transaksi</h3>
                  <p className="text-purple-200 text-sm">Catat pemasukan dan pengeluaran dengan mudah</p>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r bg-black/30 hover:from-white/10 hover:to-white/10 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 hover:translate-x-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
                  📊
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Analisis Visual</h3>
                  <p className="text-purple-200 text-sm">Lihat grafik statistik secara real-time</p>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r bg-black/30 hover:from-white/10 hover:to-white/10 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 hover:translate-x-2">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 to-green-600/0 group-hover:from-green-600/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg">
                  💰
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Multi Akun</h3>
                  <p className="text-purple-200 text-sm">Kelola beberapa akun dalam satu aplikasi</p>
                </div>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r bg-black/30 hover:from-white/10 hover:to-white/10 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 hover:translate-x-2">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/0 to-orange-600/0 group-hover:from-orange-600/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl shadow-lg">
                  📅
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Riwayat Lengkap</h3>
                  <p className="text-purple-200 text-sm">Akses semua riwayat transaksi kapan saja</p>
                </div>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r bg-black/30 hover:from-white/10 hover:to-white/10 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 hover:translate-x-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-2xl shadow-lg">
                  🔒
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Keamanan Terjamin</h3>
                  <p className="text-purple-200 text-sm">Data dienkripsi dengan sistem autentikasi modern</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/20 p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
              Siap Mengatur Keuangan Lebih Baik?
            </h2>
            <p className="text-purple-200 mb-6 relative z-10">
              Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan mengelola keuangan dengan FinTrack
            </p>
            
            {!user && (
              <Link
                href="/register"
                className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <span>🚀</span>
                Mulai Sekarang
                <span>→</span>
              </Link>
            )}
            
            {user && (
              <Link
                href="/dashboard"
                className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <span>📊</span>
                Buka Dashboard
                <span>→</span>
              </Link>
            )}
            
          </div>
        </div>
        
      </div>
    </div>
  );
}