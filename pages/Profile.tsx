
import React, { useState } from 'react';
import { User, CreditCard, Globe, LogOut, Crown, Zap, ShieldCheck, CheckCircle, RefreshCw, Link as LinkIcon, X } from 'lucide-react';
import { UserProfile } from '../types';
import { useUser } from '../UserContext';

const mockProfile: UserProfile = {
  name: 'Andualem Gentu',
  email: 'angenetu47@gmail.com',
  plan: 'Unlimited',
  role: 'Admin',
  credits: 9850,
  avatar: 'https://ui-avatars.com/api/?name=Andualem+Gentu&background=6366f1&color=fff'
};

const Profile: React.FC = () => {
  const { tiktokUsername, isConnected, connectTiktok, disconnectTiktok } = useUser();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('@egineerandua2');

  const handleConnectSubmit = () => {
    if (usernameInput) {
      connectTiktok(usernameInput);
      setShowConnectModal(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      
      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 w-96 shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Connect TikTok</h3>
               <button onClick={() => setShowConnectModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4 mb-6">
               <p className="text-sm text-slate-400">Enter your TikTok username to enable auto-posting and analytics sync.</p>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Username</label>
                  <input 
                    type="text" 
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-darker border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary"
                    placeholder="@username"
                  />
               </div>
            </div>
            <button 
              onClick={handleConnectSubmit}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Authorize & Connect
            </button>
          </div>
        </div>
      )}

      <div className="relative mb-12">
        <div className="h-32 bg-gradient-to-r from-primary via-purple-600 to-accent rounded-t-2xl"></div>
        <div className="absolute -bottom-10 left-8 flex items-end gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-darker bg-darker overflow-hidden">
             <img src={mockProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="mb-2">
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
               {mockProfile.name} <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             </h2>
             <div className="flex items-center gap-3 mt-1">
                <p className="text-slate-400 text-sm">{mockProfile.email}</p>
                {mockProfile.role === 'Admin' && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> ADMIN
                  </span>
                )}
             </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-8 flex gap-3">
           <button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-bold text-white hover:bg-white/20 transition-all">Share Profile</button>
           <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">Settings</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {['General', 'Billing & Plans', 'Connected Accounts', 'Notifications', 'API Keys'].map((item, i) => (
            <button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${i === 2 ? 'bg-gradient-to-r from-surface to-white/5 text-white border border-white/10 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-surface'}`}>
              {item}
            </button>
          ))}
          <div className="pt-8">
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Plan & Credits */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-all duration-700"></div>
             
             <div className="flex justify-between items-start mb-6 relative z-10">
               <div>
                 <h3 className="text-lg font-bold text-white flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Subscription Status</h3>
                 <p className="text-sm text-slate-400">Manage your plan and usage limits</p>
               </div>
               <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-bold text-white shadow-lg shadow-primary/25">UNLIMITED TIER</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
               <div className="p-5 bg-darker/50 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                 <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Monthly Cost</div>
                 <div className="text-3xl font-bold text-white">$99.00</div>
                 <div className="text-xs text-green-400 mt-1 flex items-center gap-1">Auto-renew on Nov 1st</div>
               </div>
               <div className="p-5 bg-darker/50 rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
                 <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">AI Credits Left</div>
                 <div className="text-3xl font-bold text-white">{mockProfile.credits.toLocaleString()}</div>
                 <div className="text-xs text-slate-500 mt-1">~450 videos remaining</div>
               </div>
             </div>
             
             <div className="w-full bg-darker h-3 rounded-full mb-2 overflow-hidden relative z-10">
               <div className="bg-gradient-to-r from-blue-500 via-primary to-accent h-full w-[15%] animate-pulse"></div>
             </div>
             <p className="text-xs text-slate-400 text-right relative z-10">15% of monthly quota used</p>
          </div>

          {/* Connected Accounts */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-400" /> Connected Channels</h3>
             <div className="space-y-4">
               
               {/* TikTok Connection Logic */}
               {isConnected ? (
                 <div className="flex items-center justify-between p-4 bg-gradient-to-r from-darker/50 to-surface border border-green-500/30 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.05)] animate-fade-in">
                   <div className="flex items-center gap-4">
                     <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold border border-white/20 shadow-lg">TT</div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-darker flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 text-black" />
                        </div>
                     </div>
                     <div>
                       <div className="font-bold text-white flex items-center gap-2">
                         {tiktokUsername} <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20">VERIFIED</span>
                       </div>
                       <div className="text-xs text-slate-400 flex items-center gap-2">
                         <span className="text-white">850K Followers</span>
                         <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                         <span className="flex items-center gap-1 text-green-400"><RefreshCw className="w-3 h-3 animate-spin" /> Syncing Live</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs font-bold text-slate-400 border border-white/10 rounded-lg hover:bg-white/5">Manage</button>
                      <button onClick={disconnectTiktok} className="px-3 py-1 text-xs font-bold text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10">Disconnect</button>
                   </div>
                 </div>
               ) : (
                 <div className="flex items-center justify-between p-4 bg-darker/30 border border-white/5 border-dashed rounded-xl hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500"><Globe className="w-5 h-5" /></div>
                       <div>
                          <div className="font-bold text-slate-300">TikTok</div>
                          <div className="text-xs text-slate-500">Not Connected</div>
                       </div>
                    </div>
                    <button onClick={() => setShowConnectModal(true)} className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                       <LinkIcon className="w-3 h-3" /> Connect
                    </button>
                 </div>
               )}

               {/* YouTube - Default */}
               <div className="flex items-center justify-between p-4 bg-darker/50 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/20">YT</div>
                   <div>
                     <div className="font-bold text-white">Andualem Tech</div>
                     <div className="text-xs text-slate-400">1.2M Subscribers</div>
                   </div>
                 </div>
                 <button className="px-3 py-1 text-xs font-bold text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10">Disconnect</button>
               </div>

               <button className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                 + Connect Instagram
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
