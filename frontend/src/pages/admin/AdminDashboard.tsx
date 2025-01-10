import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const Cookies = require('js-cookie');
  localStorage.setItem('menuVisible', 'true');
  const isAdminRole = (role: string): boolean => {
    const roleHierarchy = ['A', 'B', 'C', 'D', 'E'];
    return roleHierarchy.indexOf(role) >= roleHierarchy.indexOf('B');
  };

  useEffect(() => {
    if(!isAdminRole(Cookies.get('role'))){  
      alert('관리자가 아닙니다.');
      navigate('/admin/login');
    }
  }, [Cookies]);

  return (
    <div>
      <h1>AdminDashboard</h1>
    </div>
  );
};

export default AdminDashboard;
