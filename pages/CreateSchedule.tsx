
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AvailabilityDay {
  date: string;
  status: 'available' | 'off' | 'conflict';
  time?: string;
  station?: string;
}

interface EmployeeData {
  id: string;
  name: string;
  initials: string;
  totalHours: number;
  maxHours: number;
  availability: AvailabilityDay[];
}

const EMPLOYEE_MOCK_DATA: Record<string, EmployeeData> = {
  '410': {
    id: '410',
    name: '陳潭輝',
    initials: 'TH',
    totalHours: 32.5,
    maxHours: 40,
    availability: [
      { date: '11/17 (一)', status: 'available', time: '全天' },
      { date: '11/18 (二)', status: 'conflict', time: '09:00 - 18:00', station: '櫃台' },
      { date: '11/19 (三)', status: 'off' },
      { date: '11/20 (四)', status: 'available', time: '13:00 以後' },
      { date: '11/21 (五)', status: 'available', time: '全天' },
    ]
  },
  '428': {
    id: '428',
    name: '林盛祥',
    initials: 'SX',
    totalHours: 24.0,
    maxHours: 40,
    availability: [
      { date: '11/17 (一)', status: 'off' },
      { date: '11/18 (二)', status: 'available', time: '07:00 - 16:00' },
      { date: '11/19 (三)', status: 'available', time: '全天' },
      { date: '11/20 (四)', status: 'off' },
      { date: '11/21 (五)', status: 'available', time: '09:00 - 18:00' },
    ]
  },
  '450': {
    id: '450',
    name: '王小明',
    initials: 'XM',
    totalHours: 38.5,
    maxHours: 40,
    availability: [
      { date: '11/17 (一)', status: 'available', time: '全天' },
      { date: '11/18 (二)', status: 'available', time: '全天' },
      { date: '11/19 (三)', status: 'available', time: '全天' },
      { date: '11/20 (四)', status: 'available', time: '全天' },
      { date: '11/21 (五)', status: 'available', time: '全天' },
    ]
  }
};

const CreateSchedule = () => {
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState<'single' | 'weekly'>('single');
  const [selectedStation, setSelectedStation] = useState('counter');
  const [breakRule, setBreakRule] = useState('4-8');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('410');
  
  // Define stations here to fix the "Cannot find name 'stations'" error
  const stations = [
    { id: 'manager', name: '值班經理', icon: 'badge' },
    { id: 'counter', name: '櫃台區', icon: 'desktop_windows' },
    { id: 'burger', name: '漢堡區', icon: 'lunch_dining' },
    { id: 'fryer', name: '炸區', icon: 'flatware' },
    { id: 'wash', name: 'Wash區', icon: 'local_laundry_service' },
  ];
  
  // State for date and time pickers
  const [startDate, setStartDate] = useState('2024-11-17');
  const [selectedWeek, setSelectedWeek] = useState('2024-W46');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  // Multi-select for dates
  const [selectedDateStrings, setSelectedDateStrings] = useState<string[]>([]);

  const currentEmployee = useMemo(() => EMPLOYEE_MOCK_DATA[selectedEmployeeId], [selectedEmployeeId]);

  // Helper to calculate dates in a chosen week
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

    const dayLabels = ['一', '二', '三', '四', '五', '六', '日'];
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

  // Update selected dates when switching mode or week
  useEffect(() => {
    if (scheduleType === 'single') {
      setSelectedDateStrings([startDate]);
    } else {
      // Default to the first day of the week if nothing selected
      if (selectedDateStrings.length === 0 || !weekDates.some(wd => wd.iso === selectedDateStrings[0])) {
        setSelectedDateStrings([weekDates[0].iso]);
      }
    }
  }, [scheduleType, startDate, weekDates]);

  const toggleDate = (iso: string) => {
    if (scheduleType === 'single') {
      setStartDate(iso);
      setSelectedDateStrings([iso]);
    } else {
      setSelectedDateStrings(prev => 
        prev.includes(iso) 
          ? (prev.length > 1 ? prev.filter(d => d !== iso) : prev) // Keep at least one
          : [...prev, iso]
      );
    }
  };

  const calculateHoursPerDay = useMemo(() => {
    const [sH, sM] = startTime.split(':').map(Number);
    const [eH, eM] = endTime.split(':').map(Number);
    const startTotal = sH + sM / 60;
    const endTotal = eH + eM / 60;
    let duration = Math.max(0, endTotal - startTotal);
    
    // Simple break subtraction logic for cost estimate
    if (breakRule === '4-8') duration -= 0.5;
    if (breakRule === '9+') duration -= 1.0;
    
    return Math.max(0, duration);
  }, [startTime, endTime, breakRule]);

  const totalEstimatedHours = (calculateHoursPerDay * selectedDateStrings.length).toFixed(1);
  const totalEstimatedCost = Math.round(Number(totalEstimatedHours) * 185).toLocaleString();

  const getWeekRange = (weekStr: string) => {
    if (!weekStr) return "未選擇";
    return `第 ${weekStr.split('-W')[1]} 週 (週一至週日)`;
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator,
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

      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>排班管理</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span>建立班表</span>
          </div>
          <h1 className="font-black text-slate-800 text-lg">建立班表</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/scheduling-management')} className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
          <button onClick={() => navigate('/scheduling-management')} className="px-8 py-2.5 text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">確認建立</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden bg-[#f8fafc]">
        {/* Left Form Panel */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto space-y-6 pb-12">
            
            {/* Section 1: Basic Settings */}
            <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">1</span>
                <h2 className="font-black text-slate-800">基本設定</h2>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">選擇員工</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <select 
                      value={selectedEmployeeId}
                      onChange={(e) => setSelectedEmployeeId(e.target.value)}
                      className="w-full border-slate-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all appearance-none bg-white cursor-pointer"
                    >
                      <option value="410">陳潭輝 (ID: 410)</option>
                      <option value="428">林盛祥 (ID: 428)</option>
                      <option value="450">王小明 (ID: 450)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">排班模式</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setScheduleType('single')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${scheduleType === 'single' ? 'bg-white shadow-sm text-orange-500' : 'text-slate-500'}`}
                    >
                      單日模式
                    </button>
                    <button 
                      onClick={() => setScheduleType('weekly')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${scheduleType === 'weekly' ? 'bg-white shadow-sm text-orange-500' : 'text-slate-500'}`}
                    >
                      整週模式
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {scheduleType === 'single' ? '選擇日期' : '選擇目標週數'}
                </label>
                {scheduleType === 'single' ? (
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">calendar_today</span>
                    <input 
                      type="date" 
                      className="w-full border-slate-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer bg-white" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">date_range</span>
                      <input 
                        type="week" 
                        className="w-full border-slate-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer bg-white" 
                        value={selectedWeek} 
                        onChange={(e) => setSelectedWeek(e.target.value)}
                      />
                    </div>
                    <div className="px-4 py-3 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-2">
                      <span className="text-xs font-black text-orange-600 uppercase tracking-tighter">週期：</span>
                      <span className="text-sm font-bold text-orange-700">{getWeekRange(selectedWeek)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Date Selection Section */}
              <div className="space-y-4 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>套用日期 {scheduleType === 'weekly' && '(可多選)'}</span>
                  {selectedDateStrings.length > 1 && (
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">已選 {selectedDateStrings.length} 天</span>
                  )}
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {weekDates.map((wd) => (
                    <button 
                      key={wd.iso}
                      type="button"
                      onClick={() => toggleDate(wd.iso)}
                      className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center border transition-all ${
                        selectedDateStrings.includes(wd.iso)
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02]' 
                          : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-[10px] font-black uppercase mb-0.5 ${selectedDateStrings.includes(wd.iso) ? 'text-white/70' : 'text-slate-400'}`}>
                        {wd.label}
                      </span>
                      <span className="text-sm font-black">{wd.display}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 2: Station Selection */}
            <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">2</span>
                  <h2 className="font-black text-slate-800">站台選擇 (可多選)</h2>
                </div>
                <button className="text-xs font-bold text-orange-500 hover:text-orange-600">清除重選</button>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {stations.map(station => (
                  <button 
                    key={station.id}
                    onClick={() => setSelectedStation(station.id)}
                    className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                      selectedStation === station.id 
                        ? 'bg-orange-50 border-orange-500 text-orange-600 ring-2 ring-orange-500/10' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-2xl ${selectedStation === station.id ? 'text-blue-500' : 'text-blue-400'}`}>
                      {station.icon}
                    </span>
                    <span className="text-xs font-black">{station.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Section 3: Time & Break */}
            <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">3</span>
                <h2 className="font-black text-slate-800">時間與休息</h2>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">開始時間</label>
                  <div className="relative">
                    <input 
                      type="time"
                      className="w-full border-slate-200 rounded-xl p-3.5 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-bold text-slate-700 bg-white cursor-pointer" 
                      value={startTime} 
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">schedule</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">結束時間</label>
                  <div className="relative">
                    <input 
                      type="time"
                      className="w-full border-slate-200 rounded-xl p-3.5 outline-none focus:ring-1 focus:ring-orange-500 transition-all font-bold text-slate-700 bg-white cursor-pointer" 
                      value={endTime} 
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">schedule</span>
                  </div>
                </div>
                <div className="space-y-2 col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">休息規則 (可複選)</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setBreakRule('4-8')}
                      className={`flex-1 p-2 rounded-xl border text-left transition-all ${breakRule === '4-8' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}
                    >
                      <p className="text-[10px] font-black text-slate-800">4-8 小時</p>
                      <p className="text-[9px] text-slate-400 font-bold">休息 0.5 小時</p>
                    </button>
                    <button 
                      onClick={() => setBreakRule('9+')}
                      className={`flex-1 p-2 rounded-xl border text-left transition-all ${breakRule === '9+' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}
                    >
                      <p className="text-[10px] font-black text-slate-800">9 小時以上</p>
                      <p className="text-[9px] text-slate-400 font-bold">休息 1 小時</p>
                    </button>
                    <button 
                      onClick={() => setBreakRule('none')}
                      className={`flex-1 p-2 rounded-xl border flex items-center justify-center transition-all ${breakRule === 'none' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}
                    >
                      <p className="text-[10px] font-black text-slate-800">不休息</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">任務備註</label>
                <textarea 
                  className="w-full border-slate-200 rounded-xl p-4 min-h-[100px] outline-none focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                  placeholder="例如：開早、支援櫃檯、清機等..."
                ></textarea>
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar - Dynamically updated based on selectedEmployeeId */}
        <aside className="w-[360px] bg-white border-l border-slate-100 overflow-auto p-8 shrink-0">
          <h3 className="font-black text-slate-800 text-base mb-8">員工可用時間 (預覽)</h3>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm uppercase">
              {currentEmployee.initials}
            </div>
            <div>
              <p className="text-base font-black text-slate-800 leading-none mb-1">{currentEmployee.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                本週累積: {currentEmployee.totalHours} / {currentEmployee.maxHours}h
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-3 mb-4">
            <span>日期</span>
            <span>狀態 / 可用時段</span>
          </div>

          <div className="space-y-4 mb-8">
             {currentEmployee.availability.map((day, idx) => (
               <div key={idx} className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-600">{day.date}</span>
                 <div className="text-right">
                   {day.status === 'available' ? (
                     <span className="text-[10px] font-black text-emerald-500 uppercase">{day.time}</span>
                   ) : day.status === 'conflict' ? (
                     <>
                       <p className="text-[9px] text-slate-300 font-bold line-through">{day.time}</p>
                       <p className="text-[10px] font-black text-red-400">已有班表 ({day.station})</p>
                     </>
                   ) : (
                     <span className="text-[10px] font-black text-slate-300 uppercase italic">休假 (不可用)</span>
                   )}
                 </div>
               </div>
             ))}
          </div>

          {currentEmployee.availability.some(d => d.status === 'conflict' && selectedDateStrings.includes(d.date.split(' ')[0])) && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 mb-10 animate-in fade-in zoom-in duration-300">
              <span className="material-symbols-outlined text-red-500 text-lg">error</span>
              <div>
                 <p className="text-[11px] font-black text-red-800 mb-1">時段衝突</p>
                 <p className="text-[10px] text-red-600/80 leading-relaxed font-medium">
                   偵測到該員工於選定日期已有重複班表安排，請檢查選取時段。
                 </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-3">排班小秘訣</h4>
             <ul className="space-y-3">
               <li className="flex items-start gap-2 text-[10px] font-medium text-slate-500 leading-relaxed">
                 <span className="text-slate-300 mt-0.5">•</span>
                 建議週五晚間安排至少 2 名漢堡區人力。
               </li>
               <li className="flex items-start gap-2 text-[10px] font-medium text-slate-500 leading-relaxed">
                 <span className="text-slate-300 mt-0.5">•</span>
                 工作 4h 建議休 0.5h，超過 8h 務必休 1h。
               </li>
             </ul>
          </div>
        </aside>
      </div>

      <footer className="h-20 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-lg relative z-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">本次預計新增總時數</span>
            <div className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full font-black text-sm border border-blue-100">
              {totalEstimatedHours} 小時
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">預估人力成本總計</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-slate-400">NT$</span>
              <span className="text-xl font-black text-slate-800">{totalEstimatedCost}</span>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/scheduling-management')} className="px-12 py-3.5 bg-orange-500 text-white text-sm font-black rounded-xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-[0.98]">
          確認建立 {selectedDateStrings.length} 天/週班表
        </button>
      </footer>
    </div>
  );
};

export default CreateSchedule;
