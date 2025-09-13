'use client';

import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className="dashboard-header">
      <h1>Marketplace Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </header>
  );
}