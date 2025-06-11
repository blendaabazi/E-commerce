import React from 'react';
import ProfilePage from '../profile/page'; // ose '../../app/profile/page'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ProfilePage />
    </div>
  );
}
