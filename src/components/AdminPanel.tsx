import React from 'react';
import { withAuthorization } from '../hoc/withAuthorization';
import type { WithAuthProps } from '../types';

interface AdminPanelProps extends WithAuthProps {
  title: string;
}

const AdminPanelComponent: React.FC<AdminPanelProps> = ({ title, currentUser }) => {
  return (
    <div className="admin-panel">
      <h3>{title}</h3>
      <p>Добро пожаловать в систему администрирования!</p>
      <p>Ваши текущие роли в системе: <strong>{currentUser?.roles.join(', ')}</strong></p>
    </div>
  );
};

const AdminPanel = withAuthorization(AdminPanelComponent, ['admin']);
export default AdminPanel;
