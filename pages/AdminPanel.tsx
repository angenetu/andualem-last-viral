
import React from 'react';
import { Users, DollarSign, Activity, ShieldAlert } from 'lucide-react';

const AdminPanel: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
         <h2 className="text-3xl font-bold text-white mb-2">Admin Console</h2>
         <p className="text-slate-400">Logged in as: <span className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">angenetu47@gmail.com</span></p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Total Users</span>
          </div>
          <div className="text-3xl font-bold text-white">52,103</div>
        </div>
        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-slate-400 text-sm">MRR</span>
          </div>
          <div className="text-3xl font-bold text-white">$142,500</div>
        </div>
        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-slate-400 text-sm">AI Requests (24h)</span>
          </div>
          <div className="text-3xl font-bold text-white">1.2M</div>
        </div>
        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-slate-400 text-sm">Flagged Content</span>
          </div>
          <div className="text-3xl font-bold text-white">23</div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="font-bold text-white">Recent Signups</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-darker text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {[1,2,3,4,5].map(i => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">user_{i}@example.com</td>
                <td className="px-6 py-4">{i % 2 === 0 ? 'Pro' : 'Free'}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span></td>
                <td className="px-6 py-4">Oct 2{i}, 2023</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;