
import React, { useState, useMemo } from 'react';

interface StationRequirement {
  id: string;
  name: string;
  icon: string;
  hourlyDemand: Record<number, number>;
}

const StationManpowerSettings = () => {
  const [selectedDate, setSelectedDate] = useState('2024-11-17');
  const [activeStationTab, setActiveStationTab] = useState('all');
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [selectedDaysToCopy, setSelectedDaysToCopy] = useState<string[]>([]);

  const stationsList = [
    { id: 'manager', name: '值班經理', icon: 'badge' },
    { id: 'counter', name: '櫃台區', icon: 'desktop_windows' },
    { id: 'burger', name: '漢堡區', icon: 'lunch_dining' },
    { id: 'fryer', name: '炸區', icon: 'flatware' },
    { id: 'wash', name: 'Wash區', icon: 'local_laundry_service' },
  ];

  const hours = Array.from({ length: 17 }, (_, i) => i + 7); // 07:00 to 23:00

  // Helper: Create a zeroed-out requirement object for a day
  const createEmptyDay = () => {
    const dayData: Record<string, Record<number, number>> = {};
    stationsList.forEach(s => {
      dayData[s.id] = {};
      hours.forEach(h => {
        dayData[s.id][h] = 0;
      });
    });
    return dayData;
  };

  // State keyed by date string (YYYY-MM-DD)
  const [allRequirements, setAllRequirements] = useState<Record<string, Record<string, Record<number, number>>>>({
    '2024-11-17': createEmptyDay()
  });

  // Current requirements based on selectedDate, fallback to zeros
  const currentRequirements = useMemo(() => {
    return allRequirements[selectedDate] || createEmptyDay();
  }, [allRequirements, selectedDate]);

  const handleRequirementChange = (stationId: string, hour: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setAllRequirements(prev => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || createEmptyDay()),
        [stationId]: {
          ...(prev[selectedDate]?.[stationId] || {}),
          [hour]: numValue
        }
      }
    }));
  };

  // 根據目前選擇的站台分頁，計算該時段的總人力需求
  const totalManpowerByHour = useMemo(() => {
    const totals: Record<number, number> = {};
    const visibleStations = stationsList.filter(s => activeStationTab === 'all' || activeStationTab === s.id);
    
    hours.forEach(h => {
      totals[h] = visibleStations.reduce((sum, s) => sum + (currentRequirements[s.id]?.[h] || 0), 0);
    });
    return totals;
  }, [currentRequirements, hours, activeStationTab]);

  // Helper: Get the week containing selectedDate
  const weekDates = useMemo(() => {
    const current = new Date(selectedDate);
    const day = current.getDay(); // 0 is Sunday
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday as start
    const monday = new Date(current.setDate(diff));
    
    const days = [];
    const dayLabels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      days.push({
        iso,
        label: `${d.getMonth() + 1}/${d.getDate()} (${dayLabels[i]})`,
        isCurrent: iso === selectedDate
      });
    }
    return days;
  }, [selectedDate]);

  const handleCopyAction = () => {
    if (selectedDaysToCopy.length === 0) return;
    
    const sourceData = currentRequirements;
    const updated = { ...allRequirements };
    
    selectedDaysToCopy.forEach(date => {
      // Deep copy the source data
      updated[date] = JSON.parse(JSON.stringify(sourceData));
    });
    
    setAllRequirements(updated);
    setIsCopyModalOpen(false);
    setSelectedDaysToCopy([]);
    alert(`已將人力設定複製到 ${selectedDaysToCopy.length} 個日期`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden">
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500">engineering</span>
            站台人力需求設定
          </h1>
          <div className="relative">
            <input 
              type="date" 
              className="border-slate-200 rounded-xl px-4 py-1.5 text-sm font-bold text-slate-700 focus:ring-1 focus:ring-orange-500 outline-none" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
          <button className="px-8 py-2.5 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]">
            儲存本日設定
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col p-8 gap-6">
        {/* Summary Info Cards */}
        <div className="grid grid-cols-4 gap-6 shrink-0">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="size-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {activeStationTab === 'all' ? '本日平均人力' : '所選站台平均人力'}
              </p>
              <p className="text-xl font-black text-slate-800">
                {/* Fix: Explicitly cast Object.values to number[] to ensure correct arithmetic operations in reduce */}
                {((Object.values(totalManpowerByHour) as number[]).reduce((a, b) => a + b, 0) / hours.length).toFixed(1)} 人
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="size-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {activeStationTab === 'all' ? '高峰期總需求' : '所選站台高峰需求'}
              </p>
              <p className="text-xl font-black text-slate-800">
                {/* Fix: Explicitly cast Object.values to number[] to fix spread argument type mismatch for Math.max */}
                {Math.max(...(Object.values(totalManpowerByHour) as number[]))} 人
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="size-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">總營運時數</p>
              <p className="text-xl font-black text-slate-800">16 小時</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="size-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">content_copy</span>
            </div>
            <button className="text-left" onClick={() => setIsCopyModalOpen(true)}>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">快捷功能</p>
              <p className="text-sm font-black text-orange-500 hover:underline">複製到本週其他天</p>
            </button>
          </div>
        </div>

        {/* Main Grid Card */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-white shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">table_rows</span>
              <h2 className="font-black text-slate-800">站台/時段 人力需求矩陣</h2>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveStationTab('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeStationTab === 'all' ? 'bg-white shadow-sm text-orange-500' : 'text-slate-500'}`}
              >
                全部站台
              </button>
              {stationsList.map(s => (
                <button 
                  key={s.id}
                  onClick={() => setActiveStationTab(s.id)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeStationTab === s.id ? 'bg-white shadow-sm text-orange-500' : 'text-slate-500'}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-20">
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 bg-slate-50 border-r border-slate-100 min-w-[160px] text-left">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">站台名稱</span>
                  </th>
                  {hours.map(h => (
                    <th key={h} className="p-4 text-center border-r border-slate-100 min-w-[80px]">
                      <span className="text-xs font-black text-slate-700">{h}:00</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stationsList
                  .filter(s => activeStationTab === 'all' || activeStationTab === s.id)
                  .map(station => (
                  <tr key={station.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 border-r border-slate-100 bg-white font-bold text-sm text-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-orange-500 text-lg">{station.icon}</span>
                        {station.name}
                      </div>
                    </td>
                    {hours.map(h => (
                      <td key={h} className="p-2 border-r border-slate-100 text-center">
                        <input 
                          type="number" 
                          min="0"
                          max="10"
                          className="w-14 h-10 border-slate-100 rounded-lg text-center font-black text-slate-700 bg-slate-50/50 focus:bg-white focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                          value={currentRequirements[station.id]?.[h] || 0}
                          onChange={(e) => handleRequirementChange(station.id, h, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Footer total row */}
                <tr className="bg-orange-50/50 border-t-2 border-orange-100 font-black">
                  <td className="p-4 border-r border-slate-100">
                    <span className="text-xs font-black text-orange-600 uppercase tracking-widest">
                      {activeStationTab === 'all' ? '總計所需人數' : `${stationsList.find(s => s.id === activeStationTab)?.name} 需求小計`}
                    </span>
                  </td>
                  {hours.map(h => (
                    <td key={h} className="p-4 text-center border-r border-slate-100">
                      <span className="text-sm text-orange-700">{totalManpowerByHour[h]}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3 shrink-0">
          <span className="material-symbols-outlined text-blue-500 text-lg">info</span>
          <p className="text-[11px] text-blue-700 font-bold leading-relaxed">
            設定說明：請依照門市預估客流量設定各時段所需之人力。此設定將直接影響 AI 排班引擎的分配邏輯。
            <br />
            若某站台在特定時段不需要配置人力（例如準備期或清潔期），請將數值設為 0。未設定的日期各站台預設人力將保持為 0。
          </p>
        </div>
      </div>

      {/* Copy to Week Modal */}
      {isCopyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">複製人力需求設定</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">
                  來源日期：{selectedDate}
                </p>
              </div>
              <button onClick={() => setIsCopyModalOpen(false)} className="size-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">選擇目標日期 (本週)</span>
                <button 
                  onClick={() => {
                    const allTargetDates = weekDates.filter(d => !d.isCurrent).map(d => d.iso);
                    setSelectedDaysToCopy(prev => prev.length === allTargetDates.length ? [] : allTargetDates);
                  }}
                  className="text-[10px] font-black text-orange-500 hover:underline uppercase"
                >
                  全選 / 取消全選
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {weekDates.map(day => (
                  <label 
                    key={day.iso}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      day.isCurrent 
                        ? 'opacity-50 grayscale bg-slate-50 border-transparent cursor-not-allowed'
                        : selectedDaysToCopy.includes(day.iso)
                          ? 'border-orange-500 bg-orange-50 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${selectedDaysToCopy.includes(day.iso) ? 'text-orange-900' : 'text-slate-700'}`}>
                        {day.label}
                      </span>
                      {day.isCurrent && <span className="text-[10px] text-slate-400 font-black italic">目前選擇的日期</span>}
                    </div>
                    {!day.isCurrent && (
                      <input 
                        type="checkbox"
                        className="size-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                        checked={selectedDaysToCopy.includes(day.iso)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDaysToCopy([...selectedDaysToCopy, day.iso]);
                          } else {
                            setSelectedDaysToCopy(selectedDaysToCopy.filter(d => d !== day.iso));
                          }
                        }}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setIsCopyModalOpen(false)}
                className="flex-1 px-6 py-3.5 text-sm font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleCopyAction}
                disabled={selectedDaysToCopy.length === 0}
                className="flex-1 px-6 py-3.5 text-sm font-black text-white bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
              >
                確認複製
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationManpowerSettings;
