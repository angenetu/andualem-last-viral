
import React from 'react';
import { LayoutDashboard, Video, TrendingUp, Settings, Zap, Layers, Image as ImageIcon, Mic, BrainCircuit, Film, ShoppingBag, User, ShieldCheck, Rocket } from 'lucide-react';
import { ViewState } from '../types';
import { useLanguage } from '../translations';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { t } = useLanguage();

  const navGroups = [
    {
      title: t('create'),
      items: [
        { id: ViewState.DASHBOARD, label: t('dashboard'), icon: LayoutDashboard },
        { id: ViewState.SCRIPT_GENERATOR, label: t('scriptGen'), icon: Zap },
        { id: ViewState.AI_VIDEO_GEN, label: t('aiVideo'), icon: Film },
        { id: ViewState.THUMBNAIL_MAKER, label: t('thumbnails'), icon: ImageIcon },
        { id: ViewState.EDITOR, label: t('editor'), icon: Video },
      ]
    },
    {
      title: t('grow'),
      items: [
        { id: ViewState.AUTO_PILOT, label: t('autoPilot'), icon: Rocket }, // New Item
        { id: ViewState.GROWTH_ENGINE, label: t('growthEngine'), icon: TrendingUp },
        { id: ViewState.LIVE_ASSISTANT, label: t('liveCoach'), icon: Mic },
        { id: ViewState.STRATEGY_AGENT, label: t('strategyAgent'), icon: BrainCircuit },
      ]
    },
    {
      title: t('platform'),
      items: [
        { id: ViewState.TEMPLATE_MARKETPLACE, label: t('templates'), icon: ShoppingBag },
        { id: ViewState.PROFILE, label: t('profile'), icon: User },
        { id: ViewState.ADMIN, label: t('admin'), icon: ShieldCheck },
      ]
    }
  ];

  return (
    <div className="w-64 bg-darker border-r border-surface h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-2 cursor-pointer" onClick={() => onViewChange(ViewState.LANDING)}>
        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-lg flex items-center justify-center">
          <Layers className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">ViralFlow<span className="text-primary">AI</span></h1>
      </div>

      <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                    currentView === item.id
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'text-slate-400 hover:bg-surface hover:text-white'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${currentView === item.id ? 'text-primary' : 'text-slate-500 group-hover:text-white'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-surface to-dark border border-white/10 rounded-xl p-4 text-center">
          <h3 className="text-white font-semibold mb-1">{t('proPlan')}</h3>
          <p className="text-xs text-slate-400 mb-3">{t('unlockPro')}</p>
          <button 
            onClick={() => onViewChange(ViewState.PROFILE)}
            className="w-full py-2 bg-white text-darker font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors"
          >
            {t('upgrade')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
