
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
      { date: '06/03 (一)', status: 'available', time: '全天' },
      { date: '06/04 (二)', status: 'conflict', time: '09:00 - 18:00', station: '櫃台' },
      { date: '06/05 (三)', status: 'off' },
      { date: '06/06 (四)', status: 'available', time: '13:00 以後' },
      { date: '06/07 (五)', status: 'available', time: '全天' },
    ]
  },
  '450': {
    id: '450',
    name: '王小明',
    initials: 'XM',
    totalHours: 38.5,
    maxHours: 40,
    availability: [
      { date: '06/03 (一)', status: 'available', time: '全天' },
      { date: '06/04 (二)', status: 'available', time: '全天' },
      { date: '06/05 (三)', status: 'available', time: '全天' },
      { date: '06/06 (四)', status: 'available', time: '全天' },
      { date: '06/07 (五)', status: 'available', time: '全天' },
    ]
  }
};

// 模擬班次詳細資料查找
const SHIFT_DETAILS: Record<string, any> = {
  's1': { empId: '410', station: 'manager', startTime: '07:00', endTime: '16:00', date: '2024-06-03' },
  's7': { empId: '450', station: 'manager', startTime: '08:00', endTime: '12:00', date: '2024-06-05' },
};

const EditSchedule = () => {
  const navigate = useNavigate();
  const { shiftId } = useParams();
  
  const [selectedStation, setSelectedStation] = useState('manager');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('410');
  const [startDate, setStartDate] = useState('2024-06-03');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [breakRule, setBreakRule] = useState('4-8');

  useEffect(() => {
    if (shiftId && SHIFT_DETAILS[shiftId]) {
      const detail = SHIFT_DETAILS[shiftId];
      setSelectedEmployeeId(detail.empId);
      setSelectedStation(detail.station);
      setStartDate(detail.date);
      setStartTime(detail.startTime);
      setEndTime(detail.endTime);
    }
  }, [shiftId]);

  const stations = [
    { id: 'manager', name: '值班經理', icon: 'badge' },
    { id: 'counter', name: '櫃台區', icon: 'desktop_windows' },
    { id: 'burger', name: '漢堡區', icon: 'lunch_dining' },
    { id: 'fryer', name: '炸區', icon: 'flatware' },
    { id: 'wash', name: 'Wash區', icon: 'local_laundry_service' },
  ];

  const currentEmployee = useMemo(() => EMPLOYEE_MOCK_DATA[selectedEmployeeId] || EMPLOYEE_MOCK_DATA['410'], [selectedEmployeeId]);

  const calculateHoursPerDay = useMemo(() => {
    const [sH, sM] = startTime.split(':').map(Number);
    const [eH, eM] = endTime.split(':').map(Number);
    const startTotal = sH + sM / 60;
    const endTotal = eH + eM / 60;
    let duration = Math.max(0, endTotal - startTotal);
    
    if (breakRule === '4-8') duration -= 0.5;
    if (breakRule === '9+') duration -= 1.0;
    
    return Math.max(0, duration);
  }, [startTime, endTime, breakRule]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>排班管理</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span>編輯班表</span>
          </div>
          <h1 className="font-black text-slate-800 text-lg">編輯班表 - {shiftId}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/scheduling-management')} className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
          <button onClick={() => {
            alert('班次已成功更新！');
            navigate('/scheduling-management');
          }} className="px-8 py-2.5 text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
            儲存變更
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden bg-[#f8fafc]">
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto space-y-6 pb-12">
            
            <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">1</span>
                <h2 className="font-black text-slate-800">基本班次設定</h2>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">員工 (不可修改)</label>
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-400">
                    {currentEmployee.name} (ID: {currentEmployee.id})
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">排班日期</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">calendar_today</span>
                    <input 
                      type="date" 
                      className="w-full border-slate-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer bg-white" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">2</span>
                <h2 className="font-black text-slate-800">變更站台</h2>
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

            <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">3</span>
                <h2 className="font-black text-slate-800">調整時間</h2>
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
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">休息規則</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setBreakRule('4-8')}
                      className={`flex-1 p-2 rounded-xl border text-center transition-all ${breakRule === '4-8' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-400'}`}
                    >
                      <p className="text-[10px] font-black uppercase">4-8h</p>
                    </button>
                    <button 
                      onClick={() => setBreakRule('9+')}
                      className={`flex-1 p-2 rounded-xl border text-center transition-all ${breakRule === '9+' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-400'}`}
                    >
                      <p className="text-[10px] font-black uppercase">9h+</p>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <aside className="w-[360px] bg-white border-l border-slate-100 overflow-auto p-8 shrink-0">
          <h3 className="font-black text-slate-800 text-base mb-8">編輯衝突預覽</h3>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-sm uppercase">
              {currentEmployee.initials}
            </div>
            <div>
              <p className="text-base font-black text-slate-800 mb-1">{currentEmployee.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                當週總時數: {currentEmployee.totalHours}h
              </p>
            </div>
          </div>

          <div className="space-y-4">
             {currentEmployee.availability.map((day, idx) => (
               <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-50">
                 <span className="text-xs font-bold text-slate-600">{day.date}</span>
                 <div className="text-right">
                   {day.status === 'available' ? (
                     <span className="text-[10px] font-black text-emerald-500">可用 ({day.time})</span>
                   ) : day.status === 'conflict' ? (
                     <span className="text-[10px] font-black text-orange-400">已有班次 ({day.station})</span>
                   ) : (
                     <span className="text-[10px] font-black text-slate-300 italic">休假</span>
                   )}
                 </div>
               </div>
             ))}
          </div>

          <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
             <h4 className="text-xs font-black text-blue-800 mb-2">更新預估</h4>
             <div className="flex justify-between items-center text-sm mb-1">
               <span className="text-slate-500 font-medium">調整後時數</span>
               <span className="font-black text-slate-800">{calculateHoursPerDay.toFixed(1)} 小時</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-500 font-medium">人力預算變動</span>
               <span className="font-black text-emerald-600">無顯著變動</span>
             </div>
          </div>
        </aside>
      </div>

      <footer className="h-20 bg-white border-t border-slate-200 px-8 flex items-center justify-end gap-4 shadow-lg">
        <button onClick={() => {
          if(window.confirm('確定要刪除此班次嗎？')) {
            navigate('/scheduling-management');
          }
        }} className="mr-auto px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">刪除此班次</button>
        <button onClick={() => navigate('/scheduling-management')} className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200">取消</button>
        <button onClick={() => navigate('/scheduling-management')} className="px-12 py-3.5 bg-orange-500 text-white text-sm font-black rounded-xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-[0.98]">
          確認儲存變更
        </button>
      </footer>
    </div>
  );
};

export default EditSchedule;
