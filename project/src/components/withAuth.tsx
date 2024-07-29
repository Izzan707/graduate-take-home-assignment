import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthenticatedLayout from '../layouts/Authenticated';
import GuestLayout from '../layouts/Guest';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      };

      checkAuth();
    }, []);

    useEffect(() => {
      if (isAuthenticated === false) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? (
      <AuthenticatedLayout>
        <WrappedComponent {...props} />
      </AuthenticatedLayout>
    ) : (
      <GuestLayout>
        <div>Redirecting...</div>
      </GuestLayout>
    );
  };
};

export default withAuth;
