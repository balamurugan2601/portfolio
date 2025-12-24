import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import SkillsManager from '@/components/admin/SkillsManager';
import SectionsManager from '@/components/admin/SectionsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <LogoutButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-2xl p-6">
            <SkillsManager />
          </div>
          <div className="glass-strong rounded-2xl p-6">
            <SectionsManager />
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-6">
          <ProjectsManager />
        </div>
      </div>
    </div>
  );
}

