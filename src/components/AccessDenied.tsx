import React from 'react';

const AccessDenied: React.FC = () => {
  return (
    <div className="access-denied-container">
      <h2>Доступ ограничен</h2>
      <p>У вас нет прав для просмотра этого раздела.</p>
    </div>
  );
};

export default AccessDenied;
