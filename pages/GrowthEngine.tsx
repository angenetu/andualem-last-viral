import React, { useEffect, useState } from 'react';
import { TrendingUp, Search, BarChart2, ArrowUpRight, Zap, ExternalLink } from 'lucide-react';
import { analyzeTrendsWithGrounding } from '../services/geminiService';
import { TrendData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const GrowthEngine: React.FC = () => {
  const [niche, setNiche] = useState('Tech');
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const data = await analyzeTrendsWithGrounding(niche);
      setTrends(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="p-8 text-white max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <TrendingUp className="text-primary w-8 h-8" /> Growth Engine
          </h2>
          <p className="text-slate-400">Real-time trend spotting powered by Google Search Grounding.</p>
        </div>
        <div className="flex items-center bg-surface border border-white/10 rounded-xl p-1">
          {['Tech', 'Fitness', 'Finance', 'Gaming'].map(cat => (
            <button
              key={cat}
              onClick={() => { setNiche(cat); fetchTrends(); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${niche === cat ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Trends List */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Trending Topics in {niche}</h3>
            <button onClick={fetchTrends} className="p-2 hover:bg-white/5 rounded-lg" title="Refresh">
               {loading ? <Zap className="w-5 h-5 text-yellow-400 animate-pulse" /> : <Search className="w-5 h-5 text-slate-400" />}
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3,4].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-4">
              {trends.map((trend, idx) => (
                <div key={idx} className="p-4 bg-darker/50 border border-white/5 rounded-xl hover:border-primary/30 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-600 w-6">#{idx + 1}</span>
                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{trend.topic}</h4>
                     </div>
                     <div className="text-green-400 font-bold flex items-center gap-1 text-sm">
                        <ArrowUpRight className="w-4 h-4" /> {trend.growth}% Growth
                     </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-3 ml-9">{trend.snippet}</p>
                  
                  <div className="flex items-center justify-between ml-9">
                    <span className={`text-xs px-2 py-1 rounded-full 
                      ${trend.difficulty === 'High' ? 'bg-red-500/20 text-red-400' : 
                        trend.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-green-500/20 text-green-400'}`}>
                      {trend.difficulty} Comp
                    </span>
                    
                    {trend.sourceUrl && (
                      <a href={trend.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                        Source <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Analytics/Score */}
        <div className="space-y-6">
           <div className="bg-surface border border-white/5 rounded-2xl p-6">
             <h3 className="font-bold mb-4">Virality Potential</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trends}>
                    <XAxis dataKey="topic" hide />
                    <YAxis hide />
                    <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                    <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                      {trends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
           </div>

           <div className="bg-gradient-to-br from-secondary to-pink-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/20">
             <h3 className="font-bold text-lg mb-2">AI Insight</h3>
             <p className="text-white/90 text-sm leading-relaxed">
               Google Search data indicates a spike in <strong>{trends[0]?.topic}</strong> queries. Create content now to ride the wave.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthEngine;