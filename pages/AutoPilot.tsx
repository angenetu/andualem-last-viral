
import React, { useState, useEffect } from 'react';
import { Rocket, RefreshCw, CheckCircle, Clock, Globe, Play, Pause, Edit, ToggleRight, ToggleLeft, Zap, ExternalLink, AlertTriangle } from 'lucide-react';
import { generateDailyPlan } from '../services/geminiService';
import { AutoPilotSlot } from '../types';
import { useLanguage } from '../translations';
import { useUser } from '../UserContext';

const AutoPilot: React.FC = () => {
  const { t } = useLanguage();
  const { tiktokUsername, isConnected } = useUser();
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('Educational & Inspiring');
  const [includeAmharic, setIncludeAmharic] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [schedule, setSchedule] = useState<AutoPilotSlot[]>([]);
  const [isActive, setIsActive] = useState(false);

  // Simulating the "Auto-Pilot" execution
  useEffect(() => {
    let interval: any;
    if (isActive && schedule.length > 0 && isConnected) {
      // Accelerate loop to 200ms for rapid generation demonstration
      interval = setInterval(() => {
        setSchedule(prev => prev.map(slot => {
          if (slot.status === 'Pending' && Math.random() > 0.6) {
             return { ...slot, status: 'Scripting', progress: 10 };
          }
          if (slot.status === 'Scripting') {
             const newProgress = slot.progress + 30;
             return { ...slot, progress: Math.min(100, newProgress), status: newProgress >= 100 ? 'Rendering' : 'Scripting' };
          }
          if (slot.status === 'Rendering') {
             const newProgress = slot.progress + 25;
             return { ...slot, progress: Math.min(100, newProgress), status: newProgress >= 100 ? 'Posted' : 'Rendering' };
          }
          return slot;
        }));
      }, 200); 
    }
    return () => clearInterval(interval);
  }, [isActive, schedule, isConnected]);

  const handleGenerate = async () => {
    if (!niche) return;
    setIsGenerating(true);
    try {
      const plan = await generateDailyPlan(niche, tone, includeAmharic);
      setSchedule(plan);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditSlot = (index: number) => {
    const newTitle = prompt("Edit Video Title:", schedule[index].title);
    if (newTitle) {
      const newSchedule = [...schedule];
      newSchedule[index].title = newTitle;
      setSchedule(newSchedule);
    }
  };

  const handleQuickPost = () => {
    if (!isConnected) {
      alert("Please connect your TikTok account in Profile first!");
      return;
    }

    const motivationSlot: AutoPilotSlot = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: "⚡ Daily Motivation: Unstoppable Mindset",
      concept: "High-energy cinematic speech for entrepreneurs. 'Don't stop when you're tired, stop when you're done.'",
      hook: "You are one decision away from a completely different life.",
      platforms: ['TikTok', 'YouTube', 'Instagram'],
      status: 'Scripting', // Start immediately at scripting
      progress: 5,
      language: 'English'
    };
    
    // Add to top of schedule
    setSchedule(prev => [motivationSlot, ...prev]);
    setIsActive(true); // Auto-start the engine
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Rocket className="text-accent w-8 h-8" /> {t('autoPilotTitle')}
          </h2>
          <p className="text-slate-400">{t('autoPilotDesc')}</p>
        </div>
        
        {schedule.length > 0 && (
           <div className="flex items-center gap-2 bg-surface border border-white/10 px-4 py-2 rounded-full mt-4 md:mt-0">
              <Globe className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-slate-300">
                {includeAmharic ? 'Global + Ethiopia Mode' : 'Global Mode'}
              </span>
           </div>
        )}
      </div>

      {!isConnected && (
         <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-400">
            <AlertTriangle className="w-6 h-6" />
            <div>
               <h3 className="font-bold text-sm">No Account Connected</h3>
               <p className="text-xs opacity-80">Auto-Pilot is paused because no TikTok account is linked. Go to Profile to connect.</p>
            </div>
         </div>
      )}

      {schedule.length === 0 ? (
        <div className="bg-surface border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto text-center">
           <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
           <h3 className="text-2xl font-bold text-white mb-4">Configure Your 24/7 Engine</h3>
           <p className="text-slate-400 mb-8">
             Tell us what your channel is about. Our AI will generate a unique 24-hour posting plan.
           </p>
           
           <div className="space-y-6 text-left">
             <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">Niche / Topic</label>
               <input 
                 type="text" 
                 value={niche}
                 onChange={(e) => setNiche(e.target.value)}
                 placeholder="e.g. Sustainable Living, Future Tech, Mental Health..."
                 className="w-full bg-darker border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary"
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">Content Tone</label>
               <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-darker border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary"
               >
                 <option>Educational & Inspiring</option>
                 <option>Funny & Relatable</option>
                 <option>News & Current Events</option>
                 <option>Deep & Philosophical</option>
               </select>
             </div>

             {/* Language Toggle */}
             <div 
               className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                 includeAmharic 
                   ? 'border-yellow-500/50 bg-yellow-500/10' 
                   : 'border-white/10 bg-darker hover:border-white/20'
               }`} 
               onClick={() => setIncludeAmharic(!includeAmharic)}
             >
                <div>
                   <div className={`font-bold text-lg flex items-center gap-2 ${includeAmharic ? 'text-yellow-400' : 'text-white'}`}>
                      <span className="text-2xl">🇪🇹</span> Amharic Content Option
                   </div>
                   <div className="text-sm text-slate-400 mt-1 max-w-md">
                     Enable this to generate <strong>6 videos daily</strong> in Amharic, featuring Ethiopian culture, people, and history.
                   </div>
                </div>
                {includeAmharic ? (
                   <ToggleRight className="w-10 h-10 text-yellow-400" />
                ) : (
                   <ToggleLeft className="w-10 h-10 text-slate-600" />
                )}
             </div>

             <div className="flex gap-3">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !niche}
                  className="flex-1 py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-bold text-white hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="animate-spin w-5 h-5" /> : <Rocket className="w-5 h-5" />}
                  {t('generatePlan')}
                </button>
                
                <button 
                  onClick={handleQuickPost}
                  className="px-6 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-600/20"
                  title="Immediately create and post a motivational video"
                >
                  <Zap className="w-5 h-5 fill-white" /> Quick Post
                </button>
             </div>
           </div>
        </div>
      ) : (
        <div>
          {/* Control Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-surface p-4 rounded-xl border border-white/5 sticky top-0 z-10 shadow-2xl gap-4">
             <div className="flex gap-8 w-full md:w-auto justify-center md:justify-start items-center">
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase font-bold">Total Posts</div>
                  <div className="text-xl font-bold text-white">24</div>
                </div>
                {includeAmharic && (
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold">Ethiopia (AM)</div>
                    <div className="text-xl font-bold text-yellow-400">{schedule.filter(s => s.language === 'Amharic').length}</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase font-bold">Pending</div>
                  <div className="text-xl font-bold text-amber-400">{schedule.filter(s => s.status !== 'Posted').length}</div>
                </div>
                <div className="hidden md:block w-[1px] h-8 bg-white/10"></div>
                <div className="text-center hidden md:block">
                  <div className="text-xs text-slate-500 uppercase font-bold">Target Account</div>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1 justify-center">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span> 
                    {isConnected ? (
                       <a href={`https://www.tiktok.com/${tiktokUsername}`} target="_blank" rel="noreferrer" className="hover:underline">{tiktokUsername}</a>
                    ) : (
                       <span className="text-slate-500">DISCONNECTED</span>
                    )}
                  </div>
                </div>
             </div>

             <div className="flex gap-3">
                <button 
                  onClick={handleQuickPost}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-orange-500/20 animate-pulse"
                >
                   <Zap className="w-4 h-4 fill-white" /> Post Motivation Now
                </button>

                <button 
                  onClick={() => setSchedule([])}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 font-medium text-sm"
                >
                   Reset
                </button>
                <button 
                  onClick={() => setIsActive(!isActive)}
                  disabled={!isConnected}
                  className={`w-full md:w-auto px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isActive ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-green-500 text-white hover:bg-green-600'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? 'Pause Auto-Pilot' : t('activateAutoPilot')}
                </button>
             </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {schedule.map((slot, idx) => (
              <div key={idx} className={`relative p-5 rounded-xl border transition-all group ${
                  slot.status === 'Posted' ? 'bg-green-900/10 border-green-500/30' : 
                  slot.language === 'Amharic' ? 'bg-gradient-to-br from-yellow-900/20 to-surface border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : // Distinct Visual for Amharic
                  'bg-surface border-white/5 hover:border-white/20'
                }`}>
                
                {/* Edit Button */}
                <button 
                  onClick={() => handleEditSlot(idx)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-black/50 hover:bg-white/20 rounded-lg text-slate-300"
                  title="Edit Content"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-start mb-3 pr-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="bg-darker px-3 py-1 rounded-lg text-sm font-mono text-slate-300 border border-white/10 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {slot.time}
                    </div>
                    {/* Amharic Badge Indicator */}
                    {slot.language === 'Amharic' && (
                      <div className="bg-yellow-500 text-black px-2 py-1 rounded-md text-xs font-black uppercase flex items-center gap-1 shadow-lg">
                        <span>🇪🇹</span> AMHARIC
                      </div>
                    )}
                    <div className={`text-xs px-2 py-1 rounded-full font-bold uppercase
                      ${slot.status === 'Posted' ? 'bg-green-500 text-black' : 
                        slot.status === 'Rendering' ? 'bg-blue-500 text-white' :
                        slot.status === 'Scripting' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                      {slot.status}
                    </div>
                  </div>
                </div>

                <h4 className={`font-bold text-lg mb-1 truncate ${slot.language === 'Amharic' ? 'font-serif text-yellow-200' : 'text-white'}`}>
                  {slot.title}
                </h4>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{slot.concept}</p>
                
                {/* Platform Icons */}
                <div className="flex gap-2 mb-4">
                    {slot.platforms.map(p => (
                      <div key={p} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center border border-white/5" title={p}>
                         {p === 'TikTok' ? <span className="text-[10px] font-bold">TT</span> : 
                          p === 'YouTube' ? <span className="text-[10px] font-bold text-red-500">YT</span> :
                          p === 'Instagram' ? <span className="text-[10px] font-bold text-pink-500">IG</span> : 
                          <span className="text-[10px] font-bold text-blue-500">FB</span>}
                      </div>
                    ))}
                </div>

                {/* Progress Bar */}
                {slot.status !== 'Pending' && slot.status !== 'Posted' && (
                  <div className="w-full h-1.5 bg-darker rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{width: `${slot.progress}%`}}
                    ></div>
                  </div>
                )}
                
                {slot.status === 'Posted' && (
                   <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center animate-fade-in">
                     <div className="flex items-center gap-1 text-xs text-green-400 font-bold">
                       <CheckCircle className="w-3 h-3" /> Posted to {tiktokUsername}
                     </div>
                     <a 
                       href={`https://www.tiktok.com/${tiktokUsername}`} 
                       target="_blank" 
                       rel="noreferrer"
                       className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-slate-300 flex items-center gap-1 transition-colors border border-white/5"
                     >
                       View Post <ExternalLink className="w-3 h-3" />
                     </a>
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoPilot;
