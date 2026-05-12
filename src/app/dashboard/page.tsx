import { getTransactions } from '@/app/actions/transactionActions';
import { getSession } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import BalanceCard from '@/app/components/BalanceCard';
import TransactionForm from '@/app/components/TransactionForm';
import TransactionList from '@/app/components/TransactionList';

export default async function DashboardPage() {
  const user = await getSession();
  
  if (!user) {
    redirect('/login');
  }
  
  const { transactions, balance } = await getTransactions();
  
  // Hitung total pemasukan dan pengeluaran
  const totalIncome = transactions
    .filter((t: any) => t.type === 'income')
    .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
  
  const totalExpense = transactions
    .filter((t: any) => t.type === 'expense')
    .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br bg-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite]"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite_2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite_4s]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Halo, {user.username}!
          </h1>
          <p className="text-purple-200 mt-1">Kelola keuanganmu dengan mudah di sini</p>
        </div>
        
        {/* Balance Card - Full Width */}
        <div className="mb-6">
          <BalanceCard balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
        
        {/* 2 Columns Layout: Left = Transaction List, Right = Transaction Form */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT SIDE - Riwayat Transaksi */}
          <div className="order-2 lg:order-1">
            <TransactionList 
              transactions={transactions} 
              deleteTransaction={async (formData: FormData) => {
                'use server';
                const { deleteTransaction } = await import('@/app/actions/transactionActions');
                await deleteTransaction(formData);
              }} 
            />
          </div>
          
          {/* RIGHT SIDE - Form Tambah Transaksi */}
          <div className="order-1 lg:order-2">
            <TransactionForm addTransaction={async (formData: FormData) => {
              'use server';
              const { addTransaction } = await import('@/app/actions/transactionActions');
              await addTransaction(formData);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}