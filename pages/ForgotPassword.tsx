
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    // Updated: Changed all 'class' to 'className' for React compatibility
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3 w-full">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">德克士排班大師</h2>
        </div>
        <Link to="/login" className="flex min-w-[84px] items-center justify-center rounded-xl h-10 px-6 border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all">
          登入
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-[480px] w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-8 pt-12 pb-6 text-center">
            <div className="inline-flex items-center justify-center size-20 rounded-full bg-orange-50 mb-6 text-primary">
              <span className="material-symbols-outlined text-4xl">lock_reset</span>
            </div>
            <h1 className="text-slate-900 text-3xl font-bold mb-3">重設密碼</h1>
            <p className="text-gray-500 text-base">請輸入您的員工編號，系統將發送重設驗證至管理員。</p>
          </div>
          
          <form className="px-8 pb-12 space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-bold ml-1">員工編號 (帳號)</label>
              <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <input className="flex-1 h-14 px-4 outline-none" placeholder="請輸入您的員工編號" type="text" />
                <div className="w-14 bg-gray-50 flex items-center justify-center text-primary border-l border-gray-200">
                  <span className="material-symbols-outlined">person</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-bold ml-1">手機號碼</label>
              <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <input className="flex-1 h-14 px-4 outline-none" placeholder="請輸入登記的手機號碼" type="tel" />
                <div className="w-14 bg-gray-50 flex items-center justify-center text-primary border-l border-gray-200">
                  <span className="material-symbols-outlined">phone_iphone</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all text-lg" type="button">
              發送重設申請
            </button>
            
            <div className="text-center">
              <Link to="/login" className="text-primary hover:text-primary-dark font-bold text-sm inline-flex items-center gap-2 group transition-colors">
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
                返回登入
              </Link>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="py-8 text-center text-gray-400 text-xs">
        <p>© 2024 Dicos Scheduling Master. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
