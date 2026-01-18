
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings3 = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    healthCheck: true,
    overload: true,
    release: true,
    emergency: false
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">notifications_active</span>
          系統設定 - 通知與資訊安全
        </h1>
        <button className="px-8 py-2.5 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
          儲存設定
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          {/* Notification Section */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-50">
              <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-2 rounded-2xl">campaign</span>
              <div>
                <h2 className="text-lg font-black text-slate-800">智慧通知設定</h2>
                <p className="text-xs text-slate-400 font-medium">針對特殊事件發送主動提醒給管理員與員工</p>
              </div>
            </div>

            <div className="space-y-4">
              <div 
                onClick={() => toggle('healthCheck')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${notifications.healthCheck ? 'bg-orange-50/30 border-orange-100' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${notifications.healthCheck ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="material-symbols-outlined">medical_information</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">體檢過期提醒通知</h3>
                    <p className="text-[11px] text-slate-400 font-medium">員工健康檢查即將到期前發送預警，確保門市營運符合衛生規範</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${notifications.healthCheck ? 'bg-orange-500' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notifications.healthCheck ? 'left-7 shadow-md' : 'left-1'}`}></div>
                </div>
              </div>

              <div 
                onClick={() => toggle('overload')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${notifications.overload ? 'bg-red-50/30 border-red-100' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${notifications.overload ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 text-red-600">工時超載警報</h3>
                    <p className="text-[11px] text-slate-400 font-medium">針對單位員工工時超過勞基法提醒通知，包含單日、單週、及連續出勤預警</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${notifications.overload ? 'bg-red-500' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notifications.overload ? 'left-7 shadow-md' : 'left-1'}`}></div>
                </div>
              </div>

              <div 
                onClick={() => toggle('release')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${notifications.release ? 'bg-blue-50/30 border-blue-100' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${notifications.release ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="material-symbols-outlined">send</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">班表發佈通知</h3>
                    <p className="text-[11px] text-slate-400 font-medium">排班管理員正式發佈新班表後，系統將即時通知所有受影響的員工</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${notifications.release ? 'bg-blue-500' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notifications.release ? 'left-7 shadow-md' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
              <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-2 rounded-2xl">security</span>
              <div>
                <h2 className="text-lg font-black text-slate-800">資訊安全與管理員存取</h2>
                <p className="text-xs text-slate-400 font-medium">進階帳號安全性與密碼原則設定</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all text-left group">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-orange-500 transition-colors">lock_reset</span>
                  <div>
                    <p className="text-sm font-black text-slate-800">修改管理員密碼</p>
                    <p className="text-[10px] text-slate-400 font-medium">定期更換後台存取憑證</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>

              <button className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all text-left group">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-orange-500 transition-colors">history</span>
                  <div>
                    <p className="text-sm font-black text-slate-800">登入與變更日誌</p>
                    <p className="text-[10px] text-slate-400 font-medium">檢閱系統設定與權限變更紀錄</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>
            </div>
          </section>

          <div className="flex justify-start items-center pb-12">
             <button 
              onClick={() => navigate('/system-settings-2')}
              className="px-6 py-3 text-sm font-black text-slate-500 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-all flex items-center gap-2"
             >
               <span className="material-symbols-outlined">arrow_back</span>
               上一頁：營業時間與規則
             </button>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              DICOS SYSTEM SECURITY PROTOCOL V1.2.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings3;
