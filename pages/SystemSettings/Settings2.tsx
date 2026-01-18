
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings2 = () => {
  const navigate = useNavigate();
  const [openTime, setOpenTime] = useState('07:00');
  const [closeTime, setCloseTime] = useState('23:00');
  const [baseDate, setBaseDate] = useState('2024-06-01');
  const [minHours, setMinHours] = useState(4);
  
  // 多選休息規則狀態
  const [selectedBreakRules, setSelectedBreakRules] = useState<string[]>(['rule-4-30']);

  const breakRules = [
    { id: 'rule-4-30', title: '滿 4 小時休 30 分', desc: '適用於一般工時規範' },
    { id: 'rule-6-45', title: '滿 6 小時休 45 分', desc: '適用於中長工時規範' },
    { id: 'rule-8-60', title: '滿 9 小時休 60 分', desc: '適用於全日班次規範' },
    { id: 'rule-flexible', title: '彈性休息時間', desc: '允許管理員手動調整' },
  ];

  const toggleBreakRule = (id: string) => {
    setSelectedBreakRules(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <style>{`
        input[type="time"]::-webkit-calendar-picker-indicator,
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>
      
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">more_time</span>
          系統設定 - 營業時間與排班規則
        </h1>
        <button className="px-8 py-2.5 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
          儲存設定
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
           {/* 營業時間設定 */}
           <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 space-y-8">
             <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-2 rounded-2xl">schedule</span>
                <div>
                  <h2 className="text-lg font-black text-slate-800">營業時間設定</h2>
                  <p className="text-xs text-slate-400 font-medium">定義每日門市可排班的營運時段</p>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">alarm</span>
                    營業開始時間
                  </label>
                  <div className="relative group">
                    <input 
                      type="time" 
                      className="w-full border-slate-200 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-black text-slate-700 bg-slate-50 group-hover:bg-white" 
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors">schedule</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">alarm_on</span>
                    營業結束時間
                  </label>
                  <div className="relative group">
                    <input 
                      type="time" 
                      className="w-full border-slate-200 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-black text-slate-700 bg-slate-50 group-hover:bg-white" 
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors">schedule</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">event</span>
                    排班生效基準日
                  </label>
                  <div className="relative group">
                    <input 
                      type="date" 
                      className="w-full border-slate-200 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-black text-slate-700 bg-slate-50 group-hover:bg-white" 
                      value={baseDate}
                      onChange={(e) => setBaseDate(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors">calendar_month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">最低排班時數 (每人/次)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full border-slate-200 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-black text-slate-700 bg-slate-50 focus:bg-white" 
                      value={minHours}
                      onChange={(e) => setMinHours(parseInt(e.target.value) || 0)}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase tracking-widest">小時</span>
                  </div>
                </div>
             </div>
           </section>

           {/* 休息與用餐規則 - 多選 */}
           <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 space-y-8">
             <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-2 rounded-2xl">coffee</span>
                <div>
                  <h2 className="text-lg font-black text-slate-800">休息與用餐規則</h2>
                  <p className="text-xs text-slate-400 font-medium">設定系統排班時應自動檢查並排入的休息時段邏輯</p>
                </div>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">強制休息規則 (可多選)</label>
                  <div className="grid grid-cols-2 gap-4">
                    {breakRules.map((rule) => (
                      <div 
                        key={rule.id}
                        onClick={() => toggleBreakRule(rule.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                          selectedBreakRules.includes(rule.id)
                            ? 'bg-orange-50 border-orange-500 shadow-md shadow-orange-500/10'
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className={`mt-1 size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedBreakRules.includes(rule.id) ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                        }`}>
                          {selectedBreakRules.includes(rule.id) && (
                            <span className="material-symbols-outlined text-[14px] text-white font-bold">check</span>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-black transition-colors ${
                            selectedBreakRules.includes(rule.id) ? 'text-orange-900' : 'text-slate-700'
                          }`}>
                            {rule.title}
                          </p>
                          <p className={`text-[10px] font-medium transition-colors ${
                            selectedBreakRules.includes(rule.id) ? 'text-orange-700/70' : 'text-slate-400'
                          }`}>
                            {rule.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-3">
                   <span className="material-symbols-outlined text-blue-500 text-lg">info</span>
                   <p className="text-[11px] text-blue-700 leading-relaxed font-bold">
                     勾選多項規則時，系統將優先套用「最嚴格」或「最長工時」對應之規範。例如：同時勾選滿 4 小時與滿 6 小時之規則，則於工作 7 小時之員工會優先套用滿 6 小時休息 45 分之規定。
                   </p>
                </div>
             </div>
           </section>

           <div className="flex justify-between items-center pb-12">
             <button 
              onClick={() => navigate('/system-settings-1')}
              className="px-6 py-3 text-sm font-black text-slate-500 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-all flex items-center gap-2"
             >
               <span className="material-symbols-outlined">arrow_back</span>
               上一頁：基本資訊
             </button>
             <button 
              onClick={() => navigate('/system-settings-3')}
              className="bg-slate-800 text-white px-10 py-3 rounded-2xl font-black text-sm shadow-xl shadow-slate-800/20 transition-all active:scale-[0.98] hover:bg-slate-900"
             >
               下一頁：通知設定
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings2;
