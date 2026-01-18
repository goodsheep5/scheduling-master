
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Updated: Changed all 'class' to 'className' for React compatibility
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 text-xl font-bold tracking-tight">德克士排班大師</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">繁體中文 (台灣)</span>
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">language</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-6">
                <span className="material-symbols-outlined text-primary text-[32px]">calendar_today</span>
              </div>
              <h1 className="text-slate-900 text-2xl font-extrabold tracking-tight mb-2">門市排班管理系統</h1>
              <p className="text-gray-500 text-sm">請輸入您的職工資訊以存取排班面板</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-slate-900 text-sm font-semibold ml-1">員編帳號</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">person</span>
                  <input className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="請輸入員編或管理員帳號" type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-900 text-sm font-semibold ml-1">密碼</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                  <input className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="請輸入密碼" type={showPassword ? "text" : "password"} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="size-4 rounded border-gray-300 text-primary focus:ring-primary/20" type="checkbox" />
                  <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">記住帳號</span>
                </label>
                {/* Fixed: Changed 'nclassName' to 'className' to fix the TypeScript error */}
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors">忘記密碼？</Link>
              </div>

              <button onClick={onLogin} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]">
                登入系統
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Internal Use Only</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                初次登入或無法登入？請聯繫門市經理<br />或撥打系統支援中心 (0800-XXX-XXX)
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
            DICOS STORE MANAGEMENT SYSTEM V1.0.42<br />
            © 2024 DICOS TAIWAN INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
