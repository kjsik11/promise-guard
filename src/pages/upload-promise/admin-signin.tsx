import { useRouter } from 'next/router';
import { useEffect } from 'react';

import AdminSignin from '@frontend/components/custom/admin/SignIn';
import AdminLayout from '@frontend/components/layout/Admin';
import useAdmin from '@frontend/hooks/use-admin';

export default function AdminSigninPage() {
  const router = useRouter();
  const { adminFlag } = useAdmin();

  useEffect(() => {
    if (adminFlag) router.push('/upload-promise');
  }, [adminFlag, router]);

  return <AdminSignin />;
}

AdminSigninPage.Layout = AdminLayout;
