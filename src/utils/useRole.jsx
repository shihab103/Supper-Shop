import { useState, useEffect, useContext } from 'react';
import { useAxiosSecure } from './axiosSecure';
import { AuthContext } from '../providers/AuthProvider';

const useRole = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (authLoading || !user?.email) return;

    axiosSecure('/get-user-role')
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((error) => {
        console.error("Failed to fetch user role", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [user, authLoading, axiosSecure]);

  return { role, loading };
};

export default useRole;
