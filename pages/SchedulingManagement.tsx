
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// 模擬不同日期的排班資料，新增 id 欄位
const MOCK_SHIFTS_DATA: Record<string, any[]> = {
  '06/03': [
    { id: 's1', station: 'manager', name: '李承翰', time: '07:00 - 16:00', startCol: 1, span: 9 },
    { id: 's2', station: 'counter', name: '林美玲', time: '08:00 - 13:00', startCol: 2, span: 5 },
    { id: 's3', station: 'burger', name: '王大同', time: '11:00 - 15:00', startCol: 5, span: 4 },
  ],
  '06/04': [
    { id: 's4', station: 'manager', name: '陳潭輝', time: '08:00 - 17:00', startCol: 2, span: 9 },
    { id: 's5', station: 'counter', name: '曾雅妮', time: '12:00 - 18:00', startCol: 6, span: 6 },
    { id: 's6', station: 'fryer', name: '馬聖翔', time: '09:00 - 14:00', startCol: 3, span: 5 },
  ],
  '06/05': [
    { id: 's7', station: 'manager', name: '王小明', time: '08:00 - 12:00', startCol: 2, span: 4 },
    { id: 's8', station: 'counter', name: '林美玲', time: '07:00 - 12:00', startCol: 1, span: 5 },
    { id: 's9', station: 'counter', name: '張建國', time: '12:00 - 16:00', startCol: 6, span: 4 },
    { id: 's10', station: 'burger', name: '曾雅妮', time: '12:00 - 19:00', startCol: 6, span: 7 },
    { id: 's11', station: 'fryer', name: '李佩芬', time: '08:00 - 14:00', startCol: 2, span: 6 },
    { id: 's12', station: 'wash', name: '陳大為', time: '18:00 - 22:00', startCol: 12, span: 4 },
  ],
  '06/06': [
    { id: 's13', station: 'manager', name: '李承翰', time: '14:00 - 23:00', startCol: 8, span: 9 },
    { id: 's14', station: 'burger', name: '張建國', time: '17:00 - 22:00', startCol: 11, span: 5 },
    { id: 's15', station: 'wash', name: '周杰西', time: '10:00 - 14:00', startCol: 4, span: 4 },
  ],
  '06/07': [
    { id: 's16', station: 'manager', name: '王小明', time: '07:00 - 16:00', startCol: 1, span: 9 },
    { id: 's17', station: 'counter', name: '陳大為', time: '11:00 - 20:00', startCol: 5, span: 9 },
    { id: 's18', station: 'fryer', name: '林美玲', time: '10:00 - 15:00', startCol: 4, span: 5 },
  ],
  '06/08': [
    { id: 's19', station: 'manager', name: '陳潭輝', time: '10:00 - 19:00', startCol: 4, span: 9 },
    { id: 's20', station: 'counter', name: '馬聖翔', time: '12:00 - 21:00', startCol: 6, span: 9 },
    { id: 's21', station: 'burger', name: '李佩芬', time: '08:00 - 12:00', startCol: 2, span: 4 },
  ],
  '06/09': [
    { id: 's22', station: 'manager', name: '李承翰', time: '07:00 - 16:00', startCol: 1, span: 9 },
    { id: 's23', station: 'counter', name: '曾雅妮', time: '09:00 - 18:00', startCol: 3, span: 9 },
    { id: 's24', station: 'wash', name: '張建國', time: '18:00 - 23:00', startCol: 12, span: 5 },
  ]
};

const SchedulingManagement = () => {
  const navigate = useNavigate();
  
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2024, 5, 3));
  const [selectedDay, setSelectedDay] = useState('06/03');

  const hoursList = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const formatMD = (date: Date) => {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatHeader = (date: Date) => {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} (${days[date.getDay()]})`;
  };

  const formatShortHeader = (date: Date) => {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} (${days[date.getDay()]})`;
  };

  const getWeekDays = (start: Date) => {
    const days = [];
    const labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push({
        label: labels[i],
        date: formatMD(d),
        fullDate: d,
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
        isSunday: d.getDay() === 0
      });
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);
  const startOfCurrentWeek = weekDays[0].fullDate;
  const endOfCurrentWeek = weekDays[6].fullDate;

  const handlePrevWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(next);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const stations = [
    { id: 'manager', name: '值班經理', capacity: '1/1 人', coverage: '100%' },
    { id: 'counter', name: '櫃檯區', capacity: '2/2 人', coverage: '100%' },
    { id: 'burger', name: '漢堡區', capacity: '1/1 人', coverage: '100%' },
    { id: 'fryer', name: '炸區', capacity: '1/1 人', coverage: '100%' },
    { id: 'wash', name: 'wash', capacity: '1/1 人', coverage: '100%' },
  ];

  const shifts = useMemo(() => {
    return MOCK_SHIFTS_DATA[selectedDay] || [];
  }, [selectedDay]);

  const chartBars = useMemo(() => {
    const daySeed = parseInt(selectedDay.split('/')[1]) || 0;
    return Array.from({ length: 42 }).map((_, i) => ({
      height: 30 + ((daySeed + i) % 60)
    }));
  }, [selectedDay]);

  const sidebarEmployees = [
    { name: '周杰西', time: '10:00 - 19:00', tags: ['櫃檯', '外送'] },
    { name: '陳大為', time: '08:00 - 12:00', tags: ['漢堡'] },
  ];

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="h-[72px] border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">排班管理</h1>
          <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
            <button onClick={handlePrevWeek} className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all">
              <span className="material-symbols-outlined text-slate-400">chevron_left</span>
            </button>
            <span className="px-4 text-sm font-bold text-slate-700 whitespace-nowrap">
              {formatHeader(startOfCurrentWeek)} - {formatShortHeader(endOfCurrentWeek)}
            </span>
            <button onClick={handleNextWeek} className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all">
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          </div>
          <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">本日人力充足率</span>
              <span className="text-emerald-500 font-black text-lg">98%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">本日預估總工時</span>
              <div className="flex items-baseline gap-1">
                <span className="text-slate-800 font-black text-lg">
                   {shifts.reduce((acc, s) => acc + s.span, 0)}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">hrs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-orange-500">psychology</span>
            重新生成建議
          </button>
          <button onClick={() => navigate('/create-schedule')} className="px-8 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-[0.98]">
            建立班表
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-auto bg-white border-r border-slate-100">
          <div className="p-6 border-b border-slate-50 shrink-0">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {weekDays.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(day.date)}
                  className={`min-w-[84px] p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border ${
                    day.date === selectedDay
                      ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20'
                      : 'bg-white border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase ${
                    day.date === selectedDay ? 'text-white/70' : day.isWeekend ? (day.isSunday ? 'text-red-400' : 'text-blue-400') : 'text-slate-400'
                  }`}>
                    {day.label}
                  </span>
                  <span className={`text-sm font-black ${day.date === selectedDay ? 'text-white' : 'text-slate-700'}`}>
                    {day.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-1.5 rounded-lg text-lg">bar_chart</span>
                <h3 className="font-bold text-slate-800">當日站台人力需求與供給 (Labor Demand vs. Supply) - {selectedDay}</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">需求人數</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-500"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">AI 預配人力</span>
                </div>
              </div>
            </div>
            
            <div className="h-44 w-full flex items-end gap-[3px] border-b border-slate-100 relative">
              {chartBars.map((bar, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-orange-500 rounded-t-[2px] hover:bg-orange-400 transition-all cursor-pointer relative group" 
                  style={{ height: `${bar.height}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    供給: 12 / 需求: 10
                  </div>
                </div>
              ))}
              <div className="absolute left-0 right-0 top-1/4 border-t border-slate-100 border-dashed"></div>
              <div className="absolute left-0 right-0 top-1/2 border-t border-slate-100 border-dashed"></div>
              <div className="absolute left-0 right-0 top-3/4 border-t border-slate-100 border-dashed"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3 px-1">
              <span>07:00</span>
              <span>09:00</span>
              <span>11:00</span>
              <span>13:00</span>
              <span>15:00</span>
              <span>17:00</span>
              <span>19:00</span>
              <span>21:00</span>
              <span>23:00</span>
            </div>
          </div>

          <div className="p-6">
            <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm overflow-x-auto">
              <div className="grid grid-cols-[160px_repeat(17,1fr)] bg-slate-50/50 border-b border-slate-100 min-w-[1200px]">
                <div className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 flex items-center">站別 / 時段</div>
                {hoursList.map(time => (
                  <div key={time} className="p-4 text-[11px] font-black text-slate-700 text-center border-r border-slate-100 last:border-r-0 whitespace-nowrap">{time}</div>
                ))}
              </div>
              
              <div className="relative min-w-[1200px]">
                {stations.map(station => (
                  <div key={station.id} className="grid grid-cols-[160px_repeat(17,1fr)] border-b border-slate-50 last:border-b-0 min-h-[80px]">
                    <div className="p-4 border-r border-slate-100 bg-white flex flex-col justify-center">
                      <h4 className="font-black text-slate-800 text-sm mb-1">{station.name}</h4>
                      <div className="flex items-center gap-2">
                         <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold border border-emerald-100">
                           {shifts.filter(s => s.station === station.id).length} / 1 人
                         </span>
                         <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">AI 覆蓋 {station.coverage}</span>
                      </div>
                    </div>
                    {Array.from({ length: 17 }).map((_, i) => (
                      <div key={i} className="border-r border-slate-50 last:border-r-0 bg-white"></div>
                    ))}
                  </div>
                ))}

                {shifts.map((shift, idx) => (
                  <div 
                    key={`${selectedDay}-${idx}`}
                    onClick={() => navigate(`/edit-schedule/${shift.id}`)}
                    className="absolute bg-white border border-slate-100 rounded-2xl p-2.5 shadow-md flex flex-col justify-between group cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all animate-in fade-in zoom-in duration-300"
                    style={{
                      top: `${stations.findIndex(s => s.id === shift.station) * 80 + 10}px`,
                      width: `calc(${(shift.span / 17) * (100 - (160 / 1200 * 100))}% - 8px)`,
                      height: '60px',
                      marginLeft: '4px',
                      left: `calc(160px + ${(shift.startCol - 1) * (100 / 17 * (1 - 160 / 1200))}%)`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                           {shift.name.substring(0, 1)}
                        </div>
                        <span className="text-[10px] font-black text-slate-800 truncate">{shift.name}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-200 text-sm group-hover:text-orange-500">edit</span>
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 mt-1">{shift.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="w-[320px] bg-white flex flex-col shrink-0">
          <div className="p-6 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-slate-800">已給班員工</h3>
               <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-full border border-slate-200">
                 本日未排: {3 - shifts.length > 0 ? 3 - shifts.length : 0} 人
               </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mb-6">AI 已根據員工給班情況完成預排</p>
            
            <div className="relative mb-6">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:ring-1 focus:ring-orange-500 outline-none" 
                placeholder="搜尋姓名或編號..."
                type="text" 
              />
            </div>

            <div className="space-y-3 overflow-auto flex-1 pb-6 pr-1">
              {sidebarEmployees.map((emp, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-orange-200 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{emp.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">給班: {emp.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {emp.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-bold rounded border border-slate-100 uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-800 text-xs mb-4 uppercase tracking-widest">本日已排班 ({shifts.length} 人)</h3>
              <div className="space-y-2">
                {shifts.map((emp, i) => (
                  <div key={i} onClick={() => navigate(`/edit-schedule/${emp.id}`)} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/30 group cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-[10px] flex items-center justify-center font-black text-orange-500 group-hover:bg-white transition-colors">{emp.name.substring(0, 1)}</div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{emp.name}</span>
                        <span className="text-[9px] text-slate-400 font-medium">{emp.time}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 mt-auto">
             <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-xl">auto_awesome</span>
                <div>
                   <p className="text-[11px] font-black text-emerald-800 mb-0.5">AI 排班狀態</p>
                   <p className="text-[10px] text-emerald-600/80 leading-relaxed font-medium">針對 {selectedDay} 已填補 92% 的人力需求。</p>
                </div>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SchedulingManagement;
