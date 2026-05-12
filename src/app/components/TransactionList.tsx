'use client';

interface TransactionListProps {
  transactions: any[];
  deleteTransaction: (formData: FormData) => Promise<void>;
}

export default function TransactionList({ transactions, deleteTransaction }: TransactionListProps) {
  return (
    <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Riwayat Transaksi</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-purple-200">Belum ada transaksi</p>
          <p className="text-white/40 text-sm mt-1">Tambahkan transaksi pertama Anda!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/15 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex-1">
                <p className="font-semibold text-white">{transaction.description}</p>
                <p className="text-sm text-white/40">
                  {new Date(transaction.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              
              <div className="text-right mr-4">
                <p className={`font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'} Rp {Number(transaction.amount).toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-white/40">
                  {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                </p>
              </div>
              
              <form action={deleteTransaction}>
                <input type="hidden" name="id" value={transaction.id} />
                <button
                  type="submit"
                  className="text-red-400 hover:text-red-300 transition p-2 opacity-70 hover:opacity-100"
                  title="Hapus"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
      
      {/* Summary Footer */}
      {transactions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-white/40">Total Transaksi</span>
            <span className="text-white">{transactions.length} transaksi</span>
          </div>
        </div>
      )}
    </div>
  );
}