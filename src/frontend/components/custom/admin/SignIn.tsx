import { useState } from 'react';

import useAdmin from '@frontend/hooks/use-admin';

export default function AdminSignin() {
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleAdminSignin } = useAdmin();

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Admin Key
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setAdminKey(e.target.value)}
                    value={adminKey}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={!adminKey || loading}
                  onClick={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    await handleAdminSignin(adminKey);
                    setAdminKey('');
                    setLoading(false);
                  }}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
