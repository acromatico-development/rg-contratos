'use client'

import { useAuth } from '@context/AuthContext';

const AppPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Bienvenido, {user?.Name}
      </h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>Email: {user?.Email}</p>
        <p>Role: {user?.Role}</p>
        <p>Usuario desde: {new Date(user?.CreatedAt || '').toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AppPage;