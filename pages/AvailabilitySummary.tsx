
import React, { useState, useMemo } from 'react';
import { exportToExcel } from '../utils/export';

const AvailabilitySummary = () => {
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  });

  const weekDates = useMemo(() => {
    const [year, week] = selectedWeek.split('-W').map(Number);
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = new Date(simple);
    if (dow <= 4) {
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    const dayLabels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(ISOweekStart);
      d.setDate(ISOweekStart.getDate() + i);
      return {
        iso: d.toISOString().split('T')[0],
        display: `${d.getMonth() + 1}/${d.getDate()}`,
        label: dayLabels[i]
      };
    });
  }, [selectedWeek]);

  const mockAvailability = [
    { name: '陳潭輝', id: '410', mon: '09:00-18:00', tue: '09:00-18:00', wed: '休假', thu: '09:00-18:00', fri: '09:00-18:00', sat: '07:00-22:00', sun: '10:00-17:00' },
    { name: '林盛祥', id: '428', mon: '休假', tue: '07:00-16:00', wed: '09:00-18:00', thu: '休假', fri: '09:00-18:00', sat: '休假', sun: '13:00-22:00' },
    { name: '王小明', id: '450', mon: '全天', tue: '全天', wed: '全天', thu: '全天', fri: '全天', sat: '休假', sun: '休假' },
    { name: '張建國', id: '451', mon: '13:00-22:00', tue: '休假', wed: '07:00-16:00', thu: '13:00-22:00', fri: '休假', sat: '10:00-19:00', sun: '10:00-19:00' },
    { name: '李佩芬', id: '452', mon: '休假', tue: '13:00-22:00', wed: '13:00-22:00', thu: '休假', fri: '07:00-16:00', sat: '07:00-16:00', sun: '休假' },
    { name: '曾雅妮', id: '453', mon: '11:00-20:00', tue: '11:00-20:00', wed: '休假', thu: '11:00-20:00', fri: '11:00-20:00', sat: '11:00-20:00', sun: '休假' },
    { name: '周杰西', id: '454', mon: '07:00-16:00', tue: '休假', wed: '07:00-16:00', thu: '07:00-16:00', fri: '休假', sat: '09:00-18:00', sun: '09:00-18:00' },
    { name: '陳大為', id: '455', mon: '17:00-23:00', tue: '17:00-23:00', wed: '17:00-23:00', thu: '17:00-23:00', fri: '17:00-23:00', sat: '12:00-21:00', sun: '12:00-21:00' },
  ];

  const handleExport = () => {
    exportToExcel(mockAvailability, `Availability_Summary_${selectedWeek}`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden">
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500">fact_check</span>
            給班總表紀錄
          </h1>
          <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 group-hover:bg-white group-hover:border-orange-500 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-orange-500 text-lg transition-colors">calendar_month</span>
              <span className="text-sm font-bold text-slate-700">
                第 {selectedWeek.split('-W')[1]} 週 ({weekDates[0].display} - {weekDates[6].display})
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
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-black text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            匯出 Excel
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">group</span>
              <h2 className="font-black text-slate-800">全體員工給班概覽</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-100 border border-orange-200"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">可排班時段</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-50 border border-slate-100"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">休假</span>
              </div>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[200px]">員工姓名 / ID</th>
                {weekDates.map(date => (
                  <th key={date.iso} className="px-4 py-4 text-center border-b border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-700">{date.label}</span>
                      <span className="text-[10px] font-bold text-slate-400">{date.display}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAvailability.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-black text-xs border border-blue-100">
                        {emp.name.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {emp.id}</p>
                      </div>
                    </div>
                  </td>
                  {[emp.mon, emp.tue, emp.wed, emp.thu, emp.fri, emp.sat, emp.sun].map((avail, idx) => (
                    <td key={idx} className="px-2 py-5 text-center">
                      {avail === '休假' ? (
                        <div className="py-2 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-300 italic">OFF</span>
                        </div>
                      ) : (
                        <div className="py-2 bg-orange-50 rounded-xl border border-orange-100">
                          <span className={`text-[11px] font-black ${avail === '全天' ? 'text-orange-600' : 'text-slate-700'}`}>
                            {avail}
                          </span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-8 bg-slate-50/30 flex items-start gap-3 border-t border-slate-100">
            <span className="material-symbols-outlined text-blue-500 text-lg">info</span>
            <p className="text-[11px] text-blue-700 font-bold leading-relaxed">
              管理員說明：此表整合了所有員工在「給班輸入」模組中提交的時段。可用於比對 AI 自動排班與原始給班需求。
              <br />
              若員工未提交該週給班，系統將預設為全天不可用。
            </p>
          </div>
        </div>
      </div>

      <footer className="h-16 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0 no-print">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-sm">group</span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">已填寫員工：{mockAvailability.length} 位</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-sm">verified</span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">給班完成率：100%</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          DICOS AVAILABILITY CONSOLIDATION V1.0
        </div>
      </footer>
    </div>
  );
};

export default AvailabilitySummary;
