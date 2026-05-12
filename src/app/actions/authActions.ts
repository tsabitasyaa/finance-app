'use server';

import { query } from '@/app/lib/db';
import bcrypt from 'bcryptjs'; // Gunakan bcryptjs untuk kompatibilitas
import { createSession } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export async function register(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  
  // Validasi
  if (!username || !email || !password) {
    return { error: 'Semua field harus diisi' };
  }
  
  if (password !== confirmPassword) {
    return { error: 'Password tidak cocok' };
  }
  
  if (password.length < 6) {
    return { error: 'Password minimal 6 karakter' };
  }
  
  try {
    // Cek user sudah ada
    const existingUser = await query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    
    if (existingUser.rows.length > 0) {
      return { error: 'Username atau email sudah terdaftar' };
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Simpan user
    const result = await query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );
    
    const user = result.rows[0];
    
    // Buat session
    await createSession({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Terjadi kesalahan saat registrasi' };
  }
  
  redirect('/dashboard');
}

export async function login(formData: FormData) {
  const identifier = formData.get('identifier') as string;
  const password = formData.get('password') as string;
  
  if (!identifier || !password) {
    return { error: 'Semua field harus diisi' };
  }
  
  try {
    // Cek user
    const result = await query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [identifier]
    );
    
    if (result.rows.length === 0) {
      return { error: 'Username/email atau password salah' };
    }
    
    const user = result.rows[0];
    
    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return { error: 'Username/email atau password salah' };
    }
    
    // Buat session
    await createSession({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan saat login' };
  }
  
  redirect('/dashboard');
}

export async function logoutAction() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}

export async function getCurrentUser() {
  const { getSession } = await import('@/app/lib/auth');
  return await getSession();
}