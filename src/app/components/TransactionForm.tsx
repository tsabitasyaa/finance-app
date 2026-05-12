'use client';

import { useRef, useState } from 'react';

interface TransactionFormProps {
  addTransaction: (formData: FormData) => Promise<void>;
}

export default function TransactionForm({ addTransaction }: TransactionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await addTransaction(formData);
    formRef.current?.reset();
    setIsSubmitting(false);
  };
  
  return (
    <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Tambah Transaksi</h2>
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Deskripsi
          </label>
          <input
            type="text"
            name="description"
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/40 transition-all"
            placeholder="Contoh: Gaji, Makan Siang, Belanja"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Jumlah (Rp)
            </label>
            <input
              type="number"
              name="amount"
              required
              min="0"
              step="1000"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/40 transition-all"
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Tipe
            </label>
            <select
              name="type"
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all"
            >
              <option value="income" className="bg-slate-800">💰 Pemasukan</option>
              <option value="expense" className="bg-slate-800">💸 Pengeluaran</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Memproses...' : '+ Tambah Transaksi'}
        </button>
      </form>
    </div>
  );
}