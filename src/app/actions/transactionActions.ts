'use server';

import { query } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export async function getTransactions() {
  const user = await getSession();
  if (!user) return { transactions: [], balance: 0 };
  
  const result = await query(
    'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  );
  
  let balance = 0;
  result.rows.forEach((t: any) => {
    if (t.type === 'income') {
      balance += Number(t.amount);
    } else {
      balance -= Number(t.amount);
    }
  });
  
  return { transactions: result.rows, balance };
}

export async function addTransaction(formData: FormData) {
  const user = await getSession();
  if (!user) redirect('/login');
  
  const description = formData.get('description') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const type = formData.get('type') as 'income' | 'expense';
  
  if (!description || !amount || !type) {
    throw new Error('All fields are required');
  }
  
  await query(
    'INSERT INTO transactions (user_id, description, amount, type) VALUES ($1, $2, $3, $4)',
    [user.id, description, amount, type]
  );
  
  // Update balance
  const transactions = await query('SELECT * FROM transactions WHERE user_id = $1', [user.id]);
  let totalBalance = 0;
  transactions.rows.forEach((t: any) => {
    if (t.type === 'income') {
      totalBalance += Number(t.amount);
    } else {
      totalBalance -= Number(t.amount);
    }
  });
  
  await query(
    'UPDATE balances SET total_balance = $1, updated_at = NOW() WHERE user_id = $2',
    [totalBalance, user.id]
  );
  
  revalidatePath('/dashboard');
}

export async function deleteTransaction(formData: FormData) {
  const user = await getSession();
  if (!user) redirect('/login');
  
  const id = parseInt(formData.get('id') as string);
  
  await query('DELETE FROM transactions WHERE id = $1 AND user_id = $2', [id, user.id]);
  
  const transactions = await query('SELECT * FROM transactions WHERE user_id = $1', [user.id]);
  let totalBalance = 0;
  transactions.rows.forEach((t: any) => {
    if (t.type === 'income') {
      totalBalance += Number(t.amount);
    } else {
      totalBalance -= Number(t.amount);
    }
  });
  
  await query(
    'UPDATE balances SET total_balance = $1, updated_at = NOW() WHERE user_id = $2',
    [totalBalance, user.id]
  );
  
  revalidatePath('/dashboard');
}