import React from 'react';
import { Play, CheckCircle, Zap, TrendingUp, Users, Star, ArrowRight, Cpu, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from '../translations';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-darker/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-purple-600 to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
              <Sparkles className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">ViralFlow<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#creator" className="hover:text-white transition-colors text-accent">By Andualem Gentu</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onGetStarted} className="text-sm font-bold hover:text-white text-slate-300 transition-colors">Log In</button>
            <button onClick={onGetStarted} className="px-6 py-2.5 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg shadow-white/10">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-32 px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8 animate-fade-in backdrop-blur-md hover:border-primary/50 transition-colors cursor-default">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-slate-200 font-medium">{t('poweredBy')}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8 tracking-tight">
            {t('heroTitle')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent">{t('heroTitleHighlight')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={onGetStarted} className="px-10 py-5 bg-gradient-to-r from-primary to-accent hover:to-purple-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-all hover:scale-105">
              {t('launchApp')} <ArrowRight className="w-6 h-6" />
            </button>
            <button className="px-10 py-5 bg-surface/50 backdrop-blur-md hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg flex items-center gap-3 transition-all hover:border-white/30">
              <Play className="w-5 h-5 fill-current" /> {t('seeAction')}
            </button>
          </div>
          
          <div className="mt-20 p-3 bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
             <div className="rounded-2xl overflow-hidden border border-white/5 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent z-10"></div>
                <img src="https://picsum.photos/1600/900" alt="Dashboard Preview" className="w-full opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                
                {/* Floating UI Elements */}
                <div className="absolute bottom-10 left-10 z-20 bg-surface/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-xl animate-bounce-slow">
                   <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="text-green-400 w-5 h-5" />
                      <span className="font-bold">Viral Prediction</span>
                   </div>
                   <div className="text-2xl font-bold">98.5% Success</div>
                </div>

                <div className="absolute top-10 right-10 z-20 bg-surface/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-xl animate-bounce-slow delay-500">
                   <div className="flex items-center gap-3 mb-2">
                      <Zap className="text-yellow-400 w-5 h-5" />
                      <span className="font-bold">Script Generated</span>
                   </div>
                   <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-full bg-green-500 animate-pulse"></div></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('featuresTitle')}</h2>
          <p className="text-slate-400 text-xl">{t('featuresSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: Zap, color: "text-yellow-400", title: t('feature1Title'), desc: t('feature1Desc') },
             { icon: Layers, color: "text-blue-400", title: t('feature2Title'), desc: t('feature2Desc') },
             { icon: TrendingUp, color: "text-green-400", title: t('feature3Title'), desc: t('feature3Desc') },
             { icon: Cpu, color: "text-purple-400", title: t('feature4Title'), desc: t('feature4Desc') },
             { icon: Star, color: "text-pink-400", title: t('feature5Title'), desc: t('feature5Desc') },
             { icon: CheckCircle, color: "text-cyan-400", title: t('feature6Title'), desc: t('feature6Desc') }
           ].map((feature, i) => (
             <div key={i} className="p-8 rounded-3xl bg-gradient-to-br from-surface to-surface/50 border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-2 group hover:shadow-2xl hover:shadow-primary/10">
                <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform border border-white/5`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
           <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ViralFlow<span className="text-primary">AI</span></span>
          </div>
          
          <div className="flex gap-8 mb-8 text-sm font-medium text-slate-400">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>

          <p className="text-slate-500 text-sm mb-4">
            &copy; 2025 ViralFlow AI. {t('footerRights')}
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 mt-4">
            <span className="text-slate-400 text-xs">{t('designedBy')}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-bold text-sm">Andualem Gentu</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;