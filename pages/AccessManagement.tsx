
import React, { useState } from 'react';

interface PermissionItem {
  name: string;
  desc: string;
  roles: boolean[]; // [Admin, Scheduler, Staff]
}

interface PermissionCategory {
  category: string;
  items: PermissionItem[];
}

const AccessManagement = () => {
  // Initialize state with the current permission data
  const [permissionData, setPermissionData] = useState<PermissionCategory[]>([
    {
      category: '排班管理模組 (SCHEDULING)',
      items: [
        { name: '每週班表檢視 (Weekly Schedule View)', desc: '檢視門市每週人員排班概況', roles: [true, true, true] },
        { name: '每日班表檢視 (Daily Schedule View)', desc: '檢視當日詳細工作站分配與時間', roles: [true, true, true] },
        { name: '排班管理 (AI/手動排班)', desc: '檢視、編輯並發布 AI/手動班表', roles: [true, true, false] },
        { name: '給班輸入 (Availability)', desc: '管理並提交個人可排班時間', roles: [true, true, true] },
        { name: '給班總表 (Availability Summary)', desc: '檢視、管理並匯出全體員工每週給班紀錄', roles: [true, true, false] },
      ]
    },
    {
      category: '員工與人事模組',
      items: [
        { name: '員工基本資料檢視', desc: '姓名、職稱、所屬工作站', roles: [true, true, false] },
      ]
    },
    {
      category: '數據分析與系統設定',
      items: [
        { name: '人力成本 analysis', desc: '薪資佔比、預算控制與支出明細', roles: [true, true, false] },
        { name: '權限矩陣調整', desc: '編輯當前各職位的存取權限', roles: [true, true, false] },
      ]
    },
    {
      category: '系統管理模組 (SYSTEM)',
      items: [
        { name: '系統設定調整', desc: '管理店鋪基本設定、營業時間與系統偏好', roles: [true, false, false] },
      ]
    }
  ]);

  const togglePermission = (catIdx: number, itemIdx: number, roleIdx: number) => {
    const newData = [...permissionData];
    newData[catIdx].items[itemIdx].roles[roleIdx] = !newData[catIdx].items[itemIdx].roles[roleIdx];
    setPermissionData(newData);
  };

  const handleSave = () => {
    console.log('Saving permissions:', permissionData);
    alert('權限設定已成功儲存！');
  };

  const handleReset = () => {
    if (window.confirm('確定要取消所有未儲存的變更嗎？')) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
        <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500">security</span>
          權限管理
        </h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            取消變更
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            儲存權限矩陣
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Legend Area */}
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white">
            <div className="space-y-1">
              <h2 className="text-base font-black text-slate-800">角色存取權限矩陣</h2>
              <p className="text-xs text-slate-400 font-medium">點擊下方圖示即可開啟或關閉特定職位的功能存取權限。</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500 text-lg">check_circle</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">已啟用</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-200 text-lg">circle</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">已停用</span>
              </div>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">功能模組 / 功能細項</th>
                <th className="px-4 py-5 text-center border-b border-slate-100 min-w-[120px]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-orange-600">最高權限</span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">Admin</span>
                  </div>
                </th>
                <th className="px-4 py-5 text-center border-b border-slate-100 min-w-[120px]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-slate-700">排班權限</span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">Scheduler</span>
                  </div>
                </th>
                <th className="px-4 py-5 text-center border-b border-slate-100 min-w-[120px]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-slate-700">一般員工</span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">Staff</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {permissionData.map((category, catIdx) => (
                <React.Fragment key={catIdx}>
                  {/* Category Header Row */}
                  <tr className="bg-slate-50/30">
                    <td colSpan={4} className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      {category.category}
                    </td>
                  </tr>
                  {/* Permission Items */}
                  {category.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-5 border-b border-slate-50">
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-slate-700 group-hover:text-orange-600 transition-colors">{item.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                        </div>
                      </td>
                      {item.roles.map((enabled, roleIdx) => (
                        <td key={roleIdx} className="px-4 py-5 border-b border-slate-50 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => togglePermission(catIdx, itemIdx, roleIdx)}
                              className={`group/btn relative flex items-center justify-center transition-all transform active:scale-90 ${
                                enabled ? 'text-orange-500' : 'text-slate-200 hover:text-slate-300'
                              }`}
                            >
                              <span className="material-symbols-outlined text-2xl transition-all">
                                {enabled ? 'check_circle' : 'circle'}
                              </span>
                              {/* Tooltip hint */}
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                {enabled ? '點擊關閉' : '點擊開啟'}
                              </span>
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Table Footer / Note */}
          <div className="bg-slate-50/50 p-6 flex items-start gap-3 border-t border-slate-100">
            <span className="material-symbols-outlined text-blue-500 text-lg">info</span>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              <span className="text-slate-800 font-black">權限說明：</span>勾選後該角色將獲得對應模組的存取或操作權力。請謹慎分配「排班管理」與「系統設定」權限以維持系統運作安全。
            </p>
          </div>
        </div>
      </div>

      <footer className="h-16 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0 no-print">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-300 text-sm">history</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            最後修改人員: 系統管理員 (2024-11-20 14:30)
          </span>
        </div>
        <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          DICOS ACCESS CONTROL V2.1
        </div>
      </footer>
    </div>
  );
};

export default AccessManagement;
