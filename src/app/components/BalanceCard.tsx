interface BalanceCardProps {
  balance: number;
  totalIncome?: number;
  totalExpense?: number;
}

export default function BalanceCard({ balance, totalIncome = 0, totalExpense = 0 }: BalanceCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/30 rounded-2xl p-6 mb-6 border border-purple-500/30 backdrop-blur-sm">
      <div className="text-center mb-4">
        <p className="text-purple-200 text-sm mb-1">Total Saldo</p>
        <p className={`text-4xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          Rp {balance.toLocaleString('id-ID')}
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="text-green-400 text-sm">↑ +{(totalIncome - totalExpense).toLocaleString('id-ID')}</span>
          <span className="text-white/40 text-sm">dari semua transaksi</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-green-400 text-sm">Pemasukan</p>
          <p className="text-white font-semibold">Rp {totalIncome.toLocaleString('id-ID')}</p>
        </div>
        <div className="text-center">
          <p className="text-red-400 text-sm">Pengeluaran</p>
          <p className="text-white font-semibold">Rp {totalExpense.toLocaleString('id-ID')}</p>
        </div>
      </div>
    </div>
  );
}