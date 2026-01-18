
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewEmployee = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  const stations = [
    { id: 'manager', name: '值班經理', icon: 'badge' },
    { id: 'counter', name: '櫃台區', icon: 'desktop_windows' },
    { id: 'burger', name: '漢堡區', icon: 'lunch_dining' },
    { id: 'fryer', name: '炸區', icon: 'flatware' },
    { id: 'wash', name: 'Wash區', icon: 'local_laundry_service' },
  ];

  const toggleStation = (stationId: string) => {
    setSelectedStations(prev => 
      prev.includes(stationId) 
        ? prev.filter(id => id !== stationId) 
        : [...prev, stationId]
    );
  };

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <nav className="flex items-center gap-2 text-sm">
          <button onClick={() => navigate('/employee-management')} className="text-slate-500 hover:text-slate-800">員工管理</button>
          <span className="text-slate-400">/</span>
          <span className="font-bold text-slate-800">新增員工</span>
        </nav>
        <button onClick={() => navigate('/employee-management')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">取消</button>
      </header>

      <div className="flex-1 overflow-auto p-8 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section: Basic Information */}
          <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-orange-500 font-bold">badge</span>
              <h2 className="text-lg font-bold text-slate-800">基本資料</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">員工姓名</label>
                <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500" placeholder="輸入真實姓名" type="text" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">員工編號 (ID)</label>
                <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500" placeholder="例如: 450" type="text" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">職位類型</label>
                <div className="relative">
                  <select className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white appearance-none transition-all focus:border-orange-500">
                    <option value="">請選擇職位</option>
                    <option value="FT">正職</option>
                    <option value="PT">PT (兼職)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">系統管理權限</label>
                <div className="relative">
                  <select className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white appearance-none transition-all focus:border-orange-500">
                    <option value="">請選擇權限角色</option>
                    <option value="ADMIN">管理員</option>
                    <option value="SCHEDULER">排班經理</option>
                    <option value="STAFF">一般員工</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Added Workstation Field */}
              <div className="col-span-2 space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  分配工作站 (可多選)
                  <span className="text-[10px] text-slate-400 font-normal">指定該員工可被排班的站點</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {stations.map(station => (
                    <button
                      key={station.id}
                      type="button"
                      onClick={() => toggleStation(station.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                        selectedStations.includes(station.id)
                          ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-sm'
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{station.icon}</span>
                      {station.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">聯絡電話</label>
                <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500" placeholder="09XX-XXX-XXX" type="tel" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  PT 時薪
                  <span className="bg-orange-50 text-orange-500 text-[10px] px-1.5 py-0.5 rounded border border-orange-100 font-medium">PT 適用</span>
                </label>
                <div className="relative">
                  <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500 pr-12" placeholder="例如: 185" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">NT$</span>
                </div>
              </div>
              
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">住家地址</label>
                <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500" placeholder="請輸入完整住家地址" type="text" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">到職日</label>
                <div className="relative">
                  <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500 appearance-none" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">體檢到期日</label>
                <div className="relative">
                  <input className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500 appearance-none" type="date" />
                </div>
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                  <p className="text-[11px] font-medium">系統將於到期前14天自動發送提醒</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Account and Password Settings */}
          <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-orange-500 font-bold">lock_person</span>
              <h2 className="text-lg font-bold text-slate-800">帳號與密碼設定</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">登入帳號</label>
                <input className="w-full border-slate-100 rounded-xl p-3.5 bg-slate-50 text-slate-400 outline-none cursor-not-allowed" placeholder="輸入員工編號後自動填入" type="text" readOnly />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">登入密碼</label>
                <div className="relative">
                  <input 
                    className="w-full border-slate-200 rounded-xl focus:ring-orange-500 p-3.5 outline-none bg-white transition-all focus:border-orange-500 pr-12" 
                    placeholder="請輸入6位英文字母與數字組合" 
                    type={showPassword ? "text" : "password"} 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    type="button" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-6 text-slate-400">
               <span className="material-symbols-outlined text-sm">info</span>
               <p className="text-[11px] font-medium">帳號預設為工號，密碼請設定至少6位英數組合</p>
            </div>
          </section>
        </div>
      </div>

      <footer className="h-20 bg-white border-t border-slate-200 px-8 flex items-center justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">重設表單</button>
        <button onClick={() => navigate('/employee-management')} className="px-10 py-3 text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined text-xl">save</span>儲存員工
        </button>
      </footer>
    </>
  );
};

export default CreateNewEmployee;
