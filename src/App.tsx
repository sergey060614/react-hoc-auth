import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel.tsx';
import type { CurrentUser } from './types';
import './App.css';

export const App: React.FC = () => {
  const [userMode, setUserMode] = useState<'guest' | 'user' | 'admin'>('guest');

  const getCurrentUser = (): CurrentUser | null => {
    if (userMode === 'guest') return null;
    if (userMode === 'user') return { roles: ['user'] };
    if (userMode === 'admin') return { roles: ['admin', 'user'] };
    return null;
  };

  const currentUser = getCurrentUser();

  return (
    <div className="app-container">
      <h2>Демонстрация HOC контроля доступа</h2>
      
      <div className="controls-box">
        <p>Выберите роль текущего пользователя:</p>
        <div className="btn-group">
          <button 
            onClick={() => setUserMode('guest')} 
            className={`auth-btn ${userMode === 'guest' ? 'active' : ''}`}
          >
            ❌ Не авторизован (Гость)
          </button>
          <button 
            onClick={() => setUserMode('user')} 
            className={`auth-btn ${userMode === 'user' ? 'active' : ''}`}
          >
            👤 Роль: User
          </button>
          <button 
            onClick={() => setUserMode('admin')} 
            className={`auth-btn ${userMode === 'admin' ? 'active' : ''}`}
          >
            👑 Роль: Admin
          </button>
        </div>
      </div>

      <div className="preview-zone">
        <h4>Результат проверки доступа HOC:</h4>
        {/* Передаем проп currentUser и кастомный проп title */}
        <AdminPanel 
          currentUser={currentUser} 
          title="Панель управления сервером" 
        />
      </div>
    </div>
  );
};
