
import React, { useState, useEffect } from 'react';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  dayName: string;
  dateStr: string;
  isOff: boolean;
  slots: TimeSlot[];
}

const Availability = () => {
  // Helper to get current ISO week string (e.g., "2024-W23")
  const getCurrentWeek = () => {
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  };

  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [weekData, setWeekData] = useState<DayAvailability[]>([]);

  // Function to generate 7 days of data for a specific week string
  const generateWeekData = (weekStr: string) => {
    const [year, week] = weekStr.split('-W').map(Number);
    
    // Calculate Monday of that week
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) {
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    const labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
    const newData: DayAvailability[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(ISOweekStart);
      d.setDate(ISOweekStart.getDate() + i);
      newData.push({
        dayName: labels[i],
        dateStr: `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`,
        isOff: true, // Default to OFF as requested
        slots: [{ start: '09:00', end: '17:00' }]
      });
    }
    return newData;
  };

  // Update week data whenever selectedWeek changes
  useEffect(() => {
    setWeekData(generateWeekData(selectedWeek));
  }, [selectedWeek]);

  const toggleDayOff = (index: number) => {
    const newData = [...weekData];
    newData[index].isOff = !newData[index].isOff;
    setWeekData(newData);
  };

  const updateTime = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    const newData = [...weekData];
    newData[dayIndex].slots[slotIndex][field] = value;
    setWeekData(newData);
  };

  const calculateHours = (start: string, end: string) => {
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    const startTotal = sH + sM / 60;
    const endTotal = eH + eM / 60;
    return Math.max(0, endTotal - startTotal);
  };

  const getTotalHours = () => {
    return weekData.reduce((acc, day) => {
      if (day.isOff) return acc;
      const dayTotal = day.slots.reduce((sAcc, slot) => sAcc + calculateHours(slot.start, slot.end), 0);
      return acc + dayTotal;
    }, 0);
  };

  const getDisplayRange = () => {
    if (weekData.length === 0) return "";
    return `${weekData[0].dateStr} - ${weekData[6].dateStr}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <style>{`
        input[type="week"]::-webkit-calendar-picker-indicator {
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

      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-black text-slate-800">給班輸入</h1>
          <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 group-hover:bg-white group-hover:border-orange-500 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-orange-500 text-lg transition-colors">calendar_month</span>
              <span className="text-sm font-bold text-slate-700">
                {getDisplayRange()} (第 {selectedWeek.split('-W')[1]} 週)
              </span>
              <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
            </div>
            <input 
              type="week" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setWeekData(generateWeekData(selectedWeek))}
            className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
          >
            重設本週
          </button>
          <button className="px-8 py-2.5 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
            提交本週給班
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* Main Form Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <div className="size-10 bg-blue-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-white">tips_and_updates</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-blue-900 font-black text-sm">給班小提醒</h3>
                <p className="text-blue-700 text-xs leading-relaxed font-medium">
                  請點擊上方日曆選擇欲排班的週別。每日狀態預設為「當日休假」。<br />
                  請手動將可排班的日期切換為「可以上班」並填寫時段。
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-[140px_160px_1fr_120px] bg-slate-50 border-b border-slate-200 px-8 py-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">日期 / 星期</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">狀態</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">可用時段</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">小計</span>
              </div>

              <div className="divide-y divide-slate-100">
                {weekData.map((day, dIdx) => (
                  <div key={day.dayName + day.dateStr} className={`grid grid-cols-[140px_160px_1fr_120px] px-8 py-6 items-center transition-colors ${day.isOff ? 'bg-slate-50/50' : 'bg-white hover:bg-slate-50/30'}`}>
                    <div className="flex flex-col">
                      <span className="text-base font-black text-slate-800">{day.dayName}</span>
                      <span className="text-[11px] font-bold text-slate-400">{day.dateStr}</span>
                    </div>

                    <div>
                      <button 
                        onClick={() => toggleDayOff(dIdx)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-black transition-all ${
                          day.isOff 
                            ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
                            : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {day.isOff ? 'block' : 'check_circle'}
                        </span>
                        {day.isOff ? '當日休假' : '可以上班'}
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {day.isOff ? (
                        <span className="text-slate-300 text-sm font-medium italic">此日已排定休假</span>
                      ) : (
                        day.slots.map((slot, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-4 animate-in fade-in duration-300">
                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                              <input 
                                type="time" 
                                value={slot.start}
                                onChange={(e) => updateTime(dIdx, sIdx, 'start', e.target.value)}
                                className="border-none bg-transparent text-sm font-black text-slate-700 focus:ring-0 p-1 cursor-pointer" 
                              />
                              <span className="text-slate-300 font-bold">至</span>
                              <input 
                                type="time" 
                                value={slot.end}
                                onChange={(e) => updateTime(dIdx, sIdx, 'end', e.target.value)}
                                className="border-none bg-transparent text-sm font-black text-slate-700 focus:ring-0 p-1 cursor-pointer" 
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="text-right">
                      {day.isOff ? (
                        <span className="text-xs font-bold text-slate-300">0.0h</span>
                      ) : (
                        <span className="text-sm font-black text-slate-700">
                          {day.slots.reduce((acc, s) => acc + calculateHours(s.start, s.end), 0).toFixed(1)}h
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Panel */}
        <aside className="w-[320px] bg-white border-l border-slate-200 p-8 flex flex-col shrink-0 no-print">
          <h2 className="font-black text-slate-800 text-base mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500">analytics</span>
            本週時數統計
          </h2>

          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 text-center shadow-sm">
              <p className="text-[11px] text-orange-400 font-black uppercase tracking-widest mb-1">本週總計給班時數</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-orange-600">{getTotalHours().toFixed(1)}</span>
                <span className="text-xs font-bold text-orange-400">小時</span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3">狀態摘要</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">可以上班天數</span>
                <span className="text-sm font-black text-emerald-500">{weekData.filter(d => !d.isOff).length} 天</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">休假天數</span>
                <span className="text-sm font-black text-red-400">{weekData.filter(d => d.isOff).length} 天</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all transform active:scale-[0.98]">
              <span className="material-symbols-outlined text-[20px]">send</span>
              提交給班時數
            </button>
            <p className="text-center text-[10px] text-slate-400 font-bold mt-4">
              提交後將無法修改，請確認無誤。
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Availability;
