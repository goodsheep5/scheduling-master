
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DailySchedule = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 17));

  const formatDate = (date: Date) => {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日 ${days[date.getDay()]}`;
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white dark:bg-card-dark px-8 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button onClick={handlePrevDay} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h2 className="text-base font-bold flex items-center gap-2 text-slate-800">
              {formatDate(currentDate)} 
              <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
            </h2>
            <button onClick={handleNextDay} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button className="px-4 py-1.5 text-[11px] font-bold rounded shadow-sm bg-white text-orange-500">每日班表</button>
            <button onClick={() => navigate('/')} className="px-4 py-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-700">每週班表</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">
            <span className="material-symbols-outlined align-middle mr-1">print</span>列印
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        <div className="min-w-[900px] border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col h-full">
          {/* Timeline Grid Header */}
          <div className="grid grid-cols-[70px_repeat(5,1fr)] bg-white rounded-t-xl border-b border-slate-200 sticky top-0 z-10">
            <div className="p-4 text-slate-400 text-[10px] font-bold uppercase border-r border-slate-100 flex items-center justify-center">時間</div>
            {['值班經理', '櫃台區', '漢堡區', '炸區', 'Wash區'].map((station) => (
              <div key={station} className="p-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1">
                <span className="text-xs font-bold text-slate-700">{station}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 relative overflow-auto">
            <div className="grid grid-cols-[70px_repeat(5,1fr)] min-h-[600px]">
               {/* Time labels column - Updated to 17 items to reach 23:00 */}
               <div className="bg-slate-50/50 border-r border-slate-100">
                  {Array.from({length: 17}, (_, i) => i + 7).map(hour => (
                    <div key={hour} className="h-12 border-b border-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold">{hour}:00</div>
                  ))}
               </div>
               
               {/* Manager Column */}
               <div className="border-r border-slate-100 relative">
                  <div className="absolute top-0 left-1 right-1 h-[300px] bg-indigo-50 border-l-4 border-indigo-500 p-2 rounded text-indigo-700">
                    <p className="text-[10px] font-bold uppercase mb-1">值班經理</p>
                    <p className="text-xs font-bold">李承翰</p>
                    <p className="text-[9px] mt-auto">07:00 - 16:00</p>
                  </div>
               </div>
               
               {/* Counter Column */}
               <div className="border-r border-slate-100 relative">
                  <div className="absolute top-[96px] left-1 right-1 h-[144px] bg-orange-50 border-l-4 border-orange-500 p-2 rounded text-orange-700">
                    <p className="text-[10px] font-bold uppercase mb-1">櫃台</p>
                    <p className="text-xs font-bold">譚天惠</p>
                    <p className="text-[9px] mt-auto">09:00 - 12:00</p>
                  </div>
               </div>

               {/* Burger Column */}
               <div className="border-r border-slate-100 relative">
                  <div className="absolute top-[48px] left-1 right-1 h-[240px] bg-red-50 border-l-4 border-red-500 p-2 rounded text-red-700">
                    <p className="text-[10px] font-bold uppercase mb-1">漢堡</p>
                    <p className="text-xs font-bold">馬聖翔</p>
                    <p className="text-[9px] mt-auto">08:00 - 13:00</p>
                  </div>
               </div>

               {/* Fryer Column */}
               <div className="border-r border-slate-100 relative">
                  <div className="absolute top-[144px] left-1 right-1 h-[168px] bg-yellow-50 border-l-4 border-yellow-500 p-2 rounded text-yellow-700">
                    <p className="text-[10px] font-bold uppercase mb-1">炸區</p>
                    <p className="text-xs font-bold">李偉國</p>
                    <p className="text-[9px] mt-auto">10:00 - 13:30</p>
                  </div>
               </div>

               {/* Wash Column */}
               <div className="relative">
                  <div className="absolute top-[576px] left-1 right-1 h-[144px] bg-emerald-50 border-l-4 border-emerald-500 p-2 rounded text-emerald-700">
                    <p className="text-[10px] font-bold uppercase mb-1">Wash</p>
                    <p className="text-xs font-bold">林正立</p>
                    <p className="text-[9px] mt-auto">19:00 - 22:00</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailySchedule;
