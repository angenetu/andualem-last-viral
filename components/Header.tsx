
import React from 'react';
import { Bell, Search, UserCircle, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../translations';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="h-16 bg-darker/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10 ml-64 shadow-lg shadow-primary/5">
      <div className="flex items-center bg-surface/50 rounded-full px-4 py-2 border border-white/5 w-96 focus-within:border-primary/50 focus-within:bg-surface transition-all">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder={t('searchPlaceholder')} 
          className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-white/5 hover:bg-white/10 transition-all"
        >
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-200">{language === 'en' ? '🇺🇸 EN' : '🇪🇹 AM'}</span>
        </button>

        <button className="relative p-2 hover:bg-surface rounded-full transition-colors group">
          <Bell className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-white/10"></div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white flex items-center gap-1 justify-end">
              Andualem Gentu
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </p>
            <p className="text-xs text-primary font-medium">{t('proCreator')}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
             <div className="w-full h-full rounded-full bg-darker overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Andualem+Gentu&background=random&color=fff" alt="Andualem" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
