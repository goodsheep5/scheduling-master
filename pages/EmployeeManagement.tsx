
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterType, setFilterType] = useState('所有'); // '所有', '正職', 'PT'
  const [filterStation, setFilterStation] = useState('所有站台');
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { name: '陳潭輝', initials: 'TH', id: '410', type: '正職', stations: ['櫃台區', '漢堡區'], hours: 40, color: 'bg-blue-100 text-blue-600' },
    { name: '林盛祥', initials: 'SX', id: '428', type: 'PT', stations: ['炸區', 'Wash區'], hours: 25, color: 'bg-orange-100 text-orange-600' },
    { name: '王小明', initials: 'XM', id: '450', type: '正職', stations: ['值班經理'], hours: 40, color: 'bg-emerald-100 text-emerald-600' },
    { name: '張建國', initials: 'JK', id: '451', type: 'PT', stations: ['櫃台區'], hours: 20, color: 'bg-purple-100 text-purple-600' },
    { name: '李佩芬', initials: 'PF', id: '452', type: 'PT', stations: ['漢堡區'], hours: 18, color: 'bg-rose-100 text-rose-600' },
    { name: '曾雅妮', initials: 'YN', id: '453', type: 'PT', stations: ['炸區'], hours: 22, color: 'bg-yellow-100 text-yellow-600' },
    { name: '周杰西', initials: 'JX', id: '454', type: 'PT', stations: ['櫃台區', '外送'], hours: 15, color: 'bg-indigo-100 text-indigo-600' },
    { name: '陳大為', initials: 'DW', id: '455', type: 'PT', stations: ['漢堡區'], hours: 28, color: 'bg-slate-100 text-slate-600' },
    { name: '馬聖翔', initials: 'MS', id: '456', type: 'PT', stations: ['Wash區'], hours: 12, color: 'bg-cyan-100 text-cyan-600' },
    { name: '林正立', initials: 'ZL', id: '457', type: '正職', stations: ['漢堡區', '炸區'], hours: 40, color: 'bg-teal-100 text-teal-600' },
    { name: '譚天惠', initials: 'TH', id: '458', type: 'PT', stations: ['櫃台區'], hours: 20, color: 'bg-amber-100 text-amber-600' },
    { name: '李偉國', initials: 'WG', id: '459', type: 'PT', stations: ['炸區'], hours: 16, color: 'bg-fuchsia-100 text-fuchsia-600' },
  ];

  // 複合篩選邏輯
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchType = filterType === '所有' || emp.type === filterType;
      const matchStation = filterStation === '所有站台' || emp.stations.includes(filterStation);
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.id.includes(searchTerm);
      return matchType && matchStation && matchSearch;
    });
  }, [filterType, filterStation, searchTerm]);

  const visibleEmployees = isExpanded ? filteredEmployees : filteredEmployees.slice(0, 5);
  const remainingCount = filteredEmployees.length - 5;

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-slate-800">員工管理</h1>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input 
              className="pl-9 pr-4 py-1.5 text-sm bg-slate-100 border-none rounded-lg focus:ring-1 focus:ring-orange-500 w-64 outline-none transition-all" 
              placeholder="搜尋姓名或編號..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button onClick={() => navigate('/create-new-employees')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 rounded-lg shadow-sm transition-all active:scale-95">
          <span className="material-symbols-outlined text-[18px]">add</span>新增員工
        </button>
      </header>

      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setFilterType('所有')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              filterType === '所有' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            所有員工 ({employees.length})
          </button>
          <button 
            onClick={() => setFilterType('正職')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              filterType === '正職' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            正職
          </button>
          <button 
            onClick={() => setFilterType('PT')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              filterType === 'PT' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            PT
          </button>
          <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
          <div className="relative">
            <select 
              className="text-sm border-none bg-slate-50 rounded-lg py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-orange-500 text-slate-600 font-bold cursor-pointer appearance-none"
              value={filterStation}
              onChange={(e) => setFilterStation(e.target.value)}
            >
              <option value="所有站台">所有站台篩選</option>
              <option value="值班經理">值班經理</option>
              <option value="櫃台區">櫃台區</option>
              <option value="漢堡區">漢堡區</option>
              <option value="炸區">炸區</option>
              <option value="Wash區">Wash區</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
          </div>
        </div>
        
        {searchTerm || filterType !== '所有' || filterStation !== '所有站台' ? (
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilterType('所有');
              setFilterStation('所有站台');
            }}
            className="text-xs font-bold text-orange-500 hover:underline"
          >
            重設篩選
          </button>
        ) : null}
      </div>

      <div className="flex-1 overflow-auto p-6 bg-[#f8fafc]">
        {filteredEmployees.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">員工姓名</th>
                  <th className="px-6 py-4">員編</th>
                  <th className="px-6 py-4">職位</th>
                  <th className="px-6 py-4">主要站台</th>
                  <th className="px-6 py-4">每週工時上限</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-full ${emp.color} flex items-center justify-center font-bold text-xs uppercase shadow-sm`}>
                          {emp.initials}
                        </div>
                        <span className="text-sm font-medium text-slate-800 group-hover:text-orange-600 transition-colors">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{emp.id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${emp.type === '正職' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {emp.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {emp.stations.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white text-slate-500 text-[10px] font-bold border border-slate-100 whitespace-nowrap">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{emp.hours} 小時</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => navigate(`/edit-employee/${emp.id}`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredEmployees.length > 5 && (
              <div className="p-6 text-center bg-slate-50/30 border-t border-slate-100">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600 transition-all hover:scale-105"
                >
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    expand_more
                  </span>
                  {isExpanded ? '收起員工列表' : `檢視更多結果 (還有 ${remainingCount} 名)`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-20 text-center flex flex-col items-center shadow-sm">
            <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
              <span className="material-symbols-outlined text-5xl">person_search</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">找不到符合條件的員工</h3>
            <p className="text-sm text-slate-400 font-medium max-w-xs">請嘗試變更職位篩選、工作站台或更換搜尋關鍵字。</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('所有');
                setFilterStation('所有站台');
              }}
              className="mt-8 px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              清除所有篩選條件
            </button>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-slate-200 px-8 py-3 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-slate-400">group</span>
          <span className="font-bold text-slate-700">符合篩選結果: {filteredEmployees.length} 人 / 總人數: {employees.length} 人</span>
        </div>
        <div className="text-slate-500 flex items-center gap-2">
          最後更新：剛才 
          <button className="material-symbols-outlined text-sm hover:text-orange-500 leading-none transition-colors">refresh</button>
        </div>
      </footer>
    </>
  );
};

export default EmployeeManagement;
