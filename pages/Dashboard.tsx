
import React from 'react';
import { Play, TrendingUp, Users, Eye, Plus, Activity, ArrowUpRight, Zap } from 'lucide-react';
import { VideoProject } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../translations';
import { useUser } from '../UserContext';

const mockProjects: VideoProject[] = [
  { id: '1', title: 'Future of AI in 2025', thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg', duration: '10:24', status: 'Published', platform: 'YouTube', lastModified: '2h ago' },
  { id: '2', title: 'Morning Routine Vlog', thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg', duration: '0:58', status: 'Draft', platform: 'Shorts', lastModified: '5h ago' },
  { id: '3', title: 'Crypto Crash Explained', thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg', duration: '0:45', status: 'Rendering', platform: 'TikTok', lastModified: '1d ago' },
];

const analyticsData = [
  { name: 'Mon', views: 4000, subs: 240 },
  { name: 'Tue', views: 3000, subs: 139 },
  { name: 'Wed', views: 6000, subs: 980 },
  { name: 'Thu', views: 4780, subs: 390 },
  { name: 'Fri', views: 7890, subs: 480 },
  { name: 'Sat', views: 8390, subs: 380 },
  { name: 'Sun', views: 11490, subs: 830 },
];

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { tiktokUsername, isConnected, followerCount } = useUser();

  return (
    <div className="p-8 space-y-8 text-white max-w-[1600px] mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex justify-between items-end mb-4">
        <div>
           <h1 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Welcome back, Andualem</h1>
           {isConnected ? (
             <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full w-fit border border-green-500/20">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-400 font-medium">Live Sync Active: <strong className="text-white">{tiktokUsername}</strong></span>
             </div>
           ) : (
             <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full w-fit border border-red-500/20">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-red-400 font-bold">No Account Connected</span>
             </div>
           )}
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 bg-surface border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 flex items-center gap-2 transition-all hover:border-white/20">
             <Activity className="w-4 h-4 text-blue-400" /> {t('viewAnalytics')}
           </button>
           <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
             <Plus className="w-4 h-4" /> {t('createNew')}
           </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-surface to-darker border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
             <Eye className="w-24 h-24 text-blue-400" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20"><Eye className="text-blue-400 w-6 h-6" /></div>
            <span className="text-green-400 text-xs font-bold flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-lg border border-green-400/10"><ArrowUpRight className="w-3 h-3" /> +12.5%</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">{t('totalViews')}</h3>
          <p className="text-3xl font-black mt-1 tracking-tight text-white">2.4M</p>
        </div>

        <div className="bg-gradient-to-br from-surface to-darker border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
             <Users className="w-24 h-24 text-purple-400" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20"><Users className="text-purple-400 w-6 h-6" /></div>
            <span className="text-green-400 text-xs font-bold flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-lg border border-green-400/10"><ArrowUpRight className="w-3 h-3" /> +5.2%</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Followers</h3>
          {isConnected ? (
             <p className="text-3xl font-black mt-1 tracking-tight text-white">{followerCount}</p>
          ) : (
             <p className="text-xl font-bold mt-2 text-slate-500 italic">--</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-surface to-darker border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-all shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
             <Zap className="w-24 h-24 text-accent" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-accent/10 rounded-xl border border-accent/20"><Zap className="text-accent w-6 h-6" /></div>
            <span className="text-slate-400 text-xs font-medium bg-white/5 px-2 py-1 rounded-lg">30 Days</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">{t('viralScore')}</h3>
          <p className="text-3xl font-black mt-1 tracking-tight text-accent">92/100</p>
        </div>

        <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform backdrop-blur-sm border border-white/20">
            <Plus className="text-white w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg relative z-10">{t('newProject')}</h3>
          <p className="text-white/80 text-sm relative z-10 font-medium">Launch Studio</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center mb-8 relative z-10">
             <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-primary rounded-full"></div>
                <h2 className="text-xl font-bold">{t('growthAnalytics')}</h2>
             </div>
             <select className="bg-darker border border-white/10 rounded-lg text-xs px-4 py-2 text-slate-300 outline-none font-medium cursor-pointer hover:bg-white/5 transition-colors">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
             </select>
          </div>
          
          <div className="h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" axisLine={false} tickLine={false} dy={15} fontSize={12} fontWeight={500} />
                <YAxis stroke="#475569" axisLine={false} tickLine={false} dx={-10} fontSize={12} fontWeight={500} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', padding: '12px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" activeDot={{ r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">{t('recentProjects')}</h2>
            <button className="text-xs text-primary hover:text-primary/80 font-bold uppercase tracking-wider">{t('viewAll')}</button>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {mockProjects.map(project => (
              <div key={project.id} className="group flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-dark shadow-lg shrink-0">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-[10px] px-1.5 py-0.5 rounded text-white font-bold">{project.duration}</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                     <Play className="w-8 h-8 text-white drop-shadow-lg fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-1 flex flex-col justify-center">
                  <h4 className="font-bold text-sm truncate text-slate-200 group-hover:text-white transition-colors">{project.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                      ${project.status === 'Published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                        project.status === 'Rendering' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-700/50 text-slate-400 border border-slate-600/20'}`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{project.lastModified}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Skeleton */}
            <div className="flex gap-4 p-4 rounded-xl border border-dashed border-white/10 hover:bg-white/5 cursor-pointer transition-colors items-center justify-center text-slate-500 hover:text-slate-300 h-20">
               <Plus className="w-4 h-4 mr-2" /> <span className="text-sm font-medium">{t('startNewProject')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
