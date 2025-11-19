import React, { useState } from 'react';
import { BrainCircuit, Lightbulb, MapPin, Search } from 'lucide-react';
import { deepStrategyThink, findLocations } from '../services/geminiService';

const StrategyAgent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'strategy' | 'location'>('strategy');
  const [result, setResult] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    setIsThinking(true);
    setResult('');
    
    try {
      if (mode === 'strategy') {
        const response = await deepStrategyThink(query);
        setResult(response || "No insights generated.");
      } else {
        // Demo location: San Francisco
        const response = await findLocations(query, 37.7749, -122.4194);
        setResult(response);
      }
    } catch (error) {
      setResult("An error occurred while processing your request.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <BrainCircuit className="text-blue-400 w-8 h-8" /> Strategy Agent
        </h2>
        <p className="text-slate-400">Uses Gemini 3 Pro with "Thinking Mode" for complex reasoning and Google Maps for location scouting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
           <div 
             onClick={() => setMode('strategy')}
             className={`p-4 rounded-xl border cursor-pointer transition-all ${mode === 'strategy' ? 'bg-blue-500/20 border-blue-500' : 'bg-surface border-white/5 hover:border-white/20'}`}
           >
             <div className="flex items-center gap-3 mb-2">
               <Lightbulb className={`w-6 h-6 ${mode === 'strategy' ? 'text-blue-400' : 'text-slate-400'}`} />
               <h3 className="font-bold text-white">Deep Strategy</h3>
             </div>
             <p className="text-sm text-slate-400">Analyze channel performance, competitor strategy, or complex growth problems.</p>
           </div>

           <div 
             onClick={() => setMode('location')}
             className={`p-4 rounded-xl border cursor-pointer transition-all ${mode === 'location' ? 'bg-green-500/20 border-green-500' : 'bg-surface border-white/5 hover:border-white/20'}`}
           >
             <div className="flex items-center gap-3 mb-2">
               <MapPin className={`w-6 h-6 ${mode === 'location' ? 'text-green-400' : 'text-slate-400'}`} />
               <h3 className="font-bold text-white">Location Scout</h3>
             </div>
             <p className="text-sm text-slate-400">Find viral filming locations using Google Maps Grounding.</p>
           </div>
        </div>

        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-2xl p-6 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
            {isThinking ? (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 animate-pulse">
                 <BrainCircuit className="w-12 h-12 text-blue-500" />
                 <p>Gemini 3 Pro is thinking...</p>
                 <div className="text-xs font-mono text-slate-600">Budget: 16k tokens</div>
               </div>
            ) : result ? (
               <div className="prose prose-invert max-w-none">
                 <div className="whitespace-pre-wrap text-slate-200">{result}</div>
               </div>
            ) : (
               <div className="flex items-center justify-center h-full text-slate-600">
                 <p>Select a mode and ask a question.</p>
               </div>
            )}
          </div>

          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={mode === 'strategy' ? "Analyze why my retention drops at 0:30..." : "Find aesthetic coffee shops with natural light in San Francisco..."}
              className="w-full bg-darker border border-white/10 rounded-xl p-4 pr-12 text-white resize-none h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAsk(); }}}
            />
            <button 
              onClick={handleAsk}
              disabled={isThinking || !query}
              className="absolute bottom-3 right-3 p-2 bg-blue-600 rounded-lg text-white disabled:opacity-50 hover:bg-blue-500"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyAgent;