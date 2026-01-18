
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: '每週班表', path: '/', icon: 'calendar_view_week' },
    { name: '員工管理', path: '/employee-management', icon: 'groups' },
    { name: '排班管理', path: '/scheduling-management', icon: 'event_note' },
    { name: '站台人力設定', path: '/station-manpower', icon: 'engineering' },
    { name: '給班輸入', path: '/availability', icon: 'edit_calendar' },
    { name: '給班總表', path: '/availability-summary', icon: 'fact_check' },
    { name: '人力成本', path: '/hr-costs', icon: 'analytics' },
    { name: '權限管理', path: '/access-management', icon: 'admin_panel_settings' },
    { name: '系統設定', path: '/system-settings-1', icon: 'settings' },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname;

    // 處理首頁精確匹配
    if (path === '/') {
      return currentPath === '/' || currentPath === '/daily-schedule';
    }

    // 處理排班管理及其子頁面
    if (path === '/scheduling-management') {
      return currentPath === '/scheduling-management' || currentPath === '/create-schedule';
    }

    // 處理員工管理及其子頁面
    if (path === '/employee-management') {
      return currentPath.startsWith('/employee-management') || 
             currentPath.startsWith('/create-new-employees') || 
             currentPath.startsWith('/edit-employee');
    }

    // 處理系統設定的多個步驟
    if (path === '/system-settings-1') {
      return currentPath === '/system-settings-1' || 
             currentPath === '/system-settings-2' || 
             currentPath === '/system-settings-3';
    }

    // 處理給班輸入與給班總表（避免前綴衝突）
    if (path === '/availability') {
      return currentPath === '/availability';
    }
    
    if (path === '/availability-summary') {
      return currentPath === '/availability-summary';
    }

    // 通用匹配邏輯：精確匹配或以路徑加斜槓開頭
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="no-print w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 text-primary font-bold text-xl mb-8">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-slate-800">德克士排班大師</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-orange-50 text-orange-600 font-bold shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive(item.path) ? 'fill-1' : ''}`}>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">person</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">店經理</p>
              <p className="text-xs text-slate-500">ID: #8829</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            登出 LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
