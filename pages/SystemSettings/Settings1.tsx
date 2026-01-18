
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings1 = () => {
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState('DICOS-TP-001');
  const [storeName, setStoreName] = useState('德克士台北誠品店');
  const [storePhone, setStorePhone] = useState('02-27223340');
  const [storeMobile, setStoreMobile] = useState('0912-345-678');
  const [storeEmail, setStoreEmail] = useState('service@dicos-tp.com.tw');
  const [storeAddress, setStoreAddress] = useState('台北市信義區松高路 11 號 B2');

  return (
    <div className="flex flex-col h-full">
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">store</span>
          系統設定 - 門市基本資訊
        </h1>
        <button className="px-8 py-2.5 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
          儲存變更
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-50">
              <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-2 rounded-2xl">info</span>
              <div>
                <h2 className="text-lg font-black text-slate-800">基本通訊資訊</h2>
                <p className="text-xs text-slate-400 font-medium">設定門市在系統中顯示的名稱與聯繫方式</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">門市名稱</label>
                <input 
                  className="w-full border-slate-200 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-bold text-slate-700 bg-slate-50/50 focus:bg-white" 
                  value={storeName} 
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest text-orange-600">門市 ID (可編輯)</label>
                <input 
                  className="w-full border-orange-100 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-mono font-bold text-slate-700 bg-orange-50/30 focus:bg-white" 
                  value={storeId} 
                  onChange={(e) => setStoreId(e.target.value)}
                  placeholder="例如: DICOS-001"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">門市市話</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">phone</span>
                  <input 
                    className="w-full border-slate-200 rounded-2xl p-4 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-bold text-slate-700 bg-slate-50/50 focus:bg-white" 
                    value={storePhone} 
                    onChange={(e) => setStorePhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">門市手機號碼</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">smartphone</span>
                  <input 
                    className="w-full border-slate-200 rounded-2xl p-4 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-bold text-slate-700 bg-slate-50/50 focus:bg-white" 
                    value={storeMobile} 
                    onChange={(e) => setStoreMobile(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest text-blue-600">門市聯絡信箱 (Email)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl">mail</span>
                  <input 
                    className="w-full border-blue-100 rounded-2xl p-4 pl-12 outline-none focus:ring-1 focus:ring-blue-500 transition-all font-bold text-slate-700 bg-blue-50/30 focus:bg-white" 
                    value={storeEmail} 
                    onChange={(e) => setStoreEmail(e.target.value)}
                    placeholder="員工重設密碼信件之發送/備援信箱"
                    type="email"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1 ml-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">info</span>
                  預設為員工忘記密碼時發送重新設定密碼信件的收件/通知信箱
                </p>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">門市完整地址</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">location_on</span>
                  <input 
                    className="w-full border-slate-200 rounded-2xl p-4 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-bold text-slate-700 bg-slate-50/50 focus:bg-white" 
                    value={storeAddress} 
                    onChange={(e) => setStoreAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pb-12">
             <button className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-600">重設資料</button>
             <button 
              onClick={() => navigate('/system-settings-2')}
              className="bg-slate-800 text-white px-10 py-3 rounded-2xl font-black text-sm shadow-xl shadow-slate-800/20 transition-all active:scale-[0.98] hover:bg-slate-900"
             >
               下一頁：營業時間設定
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings1;
