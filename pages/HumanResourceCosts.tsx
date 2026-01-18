
import React, { useState } from 'react';

const HumanResourceCosts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCostData = [
    { name: '陳潭輝', id: '410', role: '店經理 (FT)', subtype: '底薪制', hours: '176.0', cost: '48,200', initials: 'TH' },
    { name: '林盛祥', id: '428', role: '服務員 (PT)', subtype: '$185/hr', hours: '142.5', cost: '26,363', initials: 'SX' },
    { name: '王小明', id: '450', role: '組長 (FT)', subtype: '底薪制', hours: '168.0', cost: '38,500', initials: 'XM' },
    { name: '張建國', id: '451', role: '服務員 (PT)', subtype: '$185/hr', hours: '120.0', cost: '22,200', initials: 'JK' },
    { name: '李佩芬', id: '452', role: '服務員 (PT)', subtype: '$185/hr', hours: '98.5', cost: '18,223', initials: 'PF' },
    { name: '曾雅妮', id: '453', role: '服務員 (PT)', subtype: '$185/hr', hours: '112.0', cost: '20,720', initials: 'YN' },
    { name: '周杰西', id: '454', role: '服務員 (PT)', subtype: '$185/hr', hours: '88.0', cost: '16,280', initials: 'JX' },
    { name: '陳大為', id: '455', role: '服務員 (PT)', subtype: '$185/hr', hours: '156.0', cost: '28,860', initials: 'DW' },
    { name: '馬聖翔', id: '456', role: '服務員 (PT)', subtype: '$185/hr', hours: '64.0', cost: '11,840', initials: 'MS' },
  ];

  const visibleData = isExpanded ? mockCostData : mockCostData.slice(0, 5);

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500">analytics</span>
            人力成本 - 月報表
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="material-symbols-outlined text-slate-400 text-sm">calendar_month</span>
            <span className="text-sm font-bold text-slate-700">2024年 5月</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-[18px]">ios_share</span>匯出月報表
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6 bg-[#f8fafc] space-y-6">
        {/* Statistics Overview */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">本月總預估成本</span>
              <span className="p-1.5 bg-orange-50 rounded-lg text-orange-500">
                <span className="material-symbols-outlined text-lg">payments</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">$625,480</span>
              <span className="text-xs text-emerald-500 font-bold flex items-center">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                1.2%
              </span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">平均時薪成本</span>
              <span className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                <span className="material-symbols-outlined text-lg">avg_time</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">$188</span>
              <span className="text-xs text-slate-400 font-bold">-$2 (較上月)</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">成本佔營收百分比</span>
              <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-500">
                <span className="material-symbols-outlined text-lg">pie_chart</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">19.2%</span>
              <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full font-black">低於預算上限</div>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-black text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-xl">list_alt</span>
              員工月度薪資摘要
            </h2>
            <div className="text-xs text-slate-400 font-medium">資料結算至 2024/05/31 23:59</div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4 border-b border-slate-100">員工姓名 / ID</th>
                <th className="px-8 py-4 border-b border-slate-100">職位與角色</th>
                <th className="px-8 py-4 border-b border-slate-100">本月總工時 (hrs)</th>
                <th className="px-8 py-4 border-b border-slate-100 text-right">本月薪資預估 (NT$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleData.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs">{emp.initials}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">#{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-700">{emp.role}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{emp.subtype}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm font-black text-slate-700">{emp.hours}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span className="text-sm font-black text-slate-800">${emp.cost}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-8 text-center bg-slate-50/30">
            <button 
              /* Fix: Removed duplicate onClick and non-existent setSelectedWeek reference */
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 mx-auto transition-all"
            >
              {isExpanded ? '收起員工資料' : `檢視更多員工資料 (還有 ${mockCostData.length - 5} 名)`}
              <span className={`material-symbols-outlined text-sm transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="h-16 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0 no-print">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
            <span className="text-[11px] font-bold text-slate-500">預算狀態：符合門市營運基準</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500 text-sm">info</span>
            <span className="text-[11px] font-bold text-slate-500">資料來源：根據排班表自動估算，不包含加班費與勞健保提撥</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Last Updated: 2024-05-31 09:00
        </div>
      </footer>
    </>
  );
};

export default HumanResourceCosts;
