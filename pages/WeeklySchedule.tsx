
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '../utils/export';

const WeeklySchedule = () => {
  const navigate = useNavigate();
  
  // Set an initial date for the week (e.g., Nov 17, 2024)
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 17));

  // Helper to get start of the week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getDayLabel = (offset: number) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + offset);
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return `${days[d.getDay()]} (${d.getMonth() + 1}/${d.getDate()})`;
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const mockData = [
    { name: '陳潭輝', id: '410', mon: '休假', tue: '09:00-18:00', wed: '13:00-22:00', thu: '休假', fri: '13:00-22:00', sat: '07:00-22:00', sun: '10:00-17:00' },
    { name: '林盛祥', id: '428', mon: '07:00-16:00', tue: '11:00-20:00', wed: '休假', thu: '13:00-22:00', fri: '13:00-22:00', sat: '休假', sun: '13:00-22:00' },
    { name: '王小明', id: '450', mon: '09:00-18:00', tue: '09:00-18:00', wed: '09:00-18:00', thu: '09:00-18:00', fri: '09:00-18:00', sat: '休假', sun: '休假' },
    { name: '張建國', id: '451', mon: '13:00-22:00', tue: '休假', wed: '07:00-16:00', thu: '13:00-22:00', fri: '休假', sat: '10:00-19:00', sun: '10:00-19:00' },
    { name: '李佩芬', id: '452', mon: '休假', tue: '13:00-22:00', wed: '13:00-22:00', thu: '休假', fri: '07:00-16:00', sat: '07:00-16:00', sun: '休假' },
    { name: '曾雅妮', id: '453', mon: '11:00-20:00', tue: '11:00-20:00', wed: '休假', thu: '11:00-20:00', fri: '11:00-20:00', sat: '11:00-20:00', sun: '休假' },
    { name: '周杰西', id: '454', mon: '07:00-16:00', tue: '休假', wed: '07:00-16:00', thu: '07:00-16:00', fri: '休假', sat: '09:00-18:00', sun: '09:00-18:00' },
    { name: '陳大為', id: '455', mon: '17:00-23:00', tue: '17:00-23:00', wed: '17:00-23:00', thu: '17:00-23:00', fri: '17:00-23:00', sat: '12:00-21:00', sun: '12:00-21:00' },
    { name: '馬聖翔', id: '456', mon: '休假', tue: '08:00-17:00', wed: '08:00-17:00', thu: '08:00-17:00', fri: '08:00-17:00', sat: '休假', sun: '08:00-17:00' },
  ];

  const handleExport = () => {
    exportToExcel(mockData, `Weekly_Schedule_${startOfWeek.toISOString().split('T')[0]}`);
  };

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 no-print">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-slate-800">
            {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
          </h1>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button onClick={handlePrevWeek} className="p-1 hover:bg-white rounded transition-all">
              <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
            </button>
            <button onClick={handleToday} className="px-3 py-1 text-xs font-medium">今天</button>
            <button onClick={handleNextWeek} className="p-1 hover:bg-white rounded transition-all">
              <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <button onClick={() => navigate('/daily-schedule')} className="px-6 py-1.5 text-xs font-medium text-slate-600 hover:bg-white rounded transition-all">每日班表</button>
          <button className="px-6 py-1.5 text-xs font-medium bg-white text-orange-500 shadow-sm rounded transition-all">每週班表</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]">print</span>列印
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]">file_download</span>匯出
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6 bg-[#f8fafc]">
        <div className="min-w-[1000px] border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="grid grid-cols-[180px_repeat(7,1fr)] border-b border-slate-100 bg-slate-50/30 font-semibold text-xs text-slate-500">
            <div className="p-4 border-r border-slate-100 text-center uppercase">員工</div>
            <div className="p-4 border-r border-slate-100 text-center">{getDayLabel(1)}</div>
            <div className="p-4 border-r border-slate-100 text-center">{getDayLabel(2)}</div>
            <div className="p-4 border-r border-slate-100 text-center">{getDayLabel(3)}</div>
            <div className="p-4 border-r border-slate-100 text-center">{getDayLabel(4)}</div>
            <div className="p-4 border-r border-slate-100 text-center">{getDayLabel(5)}</div>
            <div className="p-4 border-r border-slate-100 text-center">{getDayLabel(6)}</div>
            <div className="p-4 text-center">{getDayLabel(0)}</div>
          </div>
          
          <div className="divide-y divide-slate-100">
            {mockData.map((emp) => (
              <div key={emp.id} className="grid grid-cols-[180px_repeat(7,1fr)] hover:bg-slate-50 transition-colors">
                <div className="p-4 border-r border-slate-100 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">{emp.name.substring(0, 1)}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{emp.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">ID: {emp.id}</p>
                  </div>
                </div>
                {[emp.mon, emp.tue, emp.wed, emp.thu, emp.fri, emp.sat, emp.sun].map((shift, idx) => (
                  <div key={idx} className="p-2 border-r border-slate-100 flex items-center justify-center">
                    {shift === '休假' ? (
                      <span className="text-slate-300 italic text-xs">休假</span>
                    ) : (
                      <div className="bg-orange-50 border border-orange-100 rounded p-1.5 text-center w-full shadow-sm hover:shadow transition-shadow">
                        <p className="text-[11px] font-bold text-orange-700">{shift}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t border-slate-200 px-8 py-3 flex items-center justify-between text-xs shrink-0 no-print">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="font-bold text-slate-700">人力狀況:</span>
            <span className="text-slate-500">當前週期班表已完整排定，無人力缺口</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">group</span>
            <span className="font-bold text-slate-700">在職員工:</span>
            <span className="text-slate-500">{mockData.length} 人</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="font-bold text-slate-700">本週總工時:</span>
            <span className="text-slate-500">458.0 小時</span>
          </div>
        </div>
        <div className="text-slate-500 flex items-center gap-2">
          最後更新於：剛才 <button className="material-symbols-outlined text-sm hover:text-primary leading-none transition-colors">refresh</button>
        </div>
      </footer>
    </>
  );
};

export default WeeklySchedule;
