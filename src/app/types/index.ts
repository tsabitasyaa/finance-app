export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

export interface Transaction {
  id: number;
  user_id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  created_at: Date;
}

export interface Balance {
  user_id: number;
  total_balance: number;
  updated_at: Date;
}

export interface SessionUser {
  id: number;
  username: string;
  email: string;
}