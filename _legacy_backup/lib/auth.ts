import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function verifyPassword(password: string): boolean {
  console.log('Verifying password:', { received: password, expected: 'SecurePass2025!' });
  return password === 'SecurePass2025!';
}

export async function setAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('admin-auth', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-auth');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

