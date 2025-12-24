import LoginForm from '@/components/admin/LoginForm';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function AdminLogin() {
  const authenticated = await isAuthenticated();
  
  if (authenticated) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

