import React, { useState } from 'react';
import { Wand2, Check, Copy, Video, Loader2, Hash } from 'lucide-react';
import { generateViralScript } from '../services/geminiService';
import { ScriptData } from '../types';

const ScriptGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState<ScriptData | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    try {
      const data = await generateViralScript(topic, platform);
      setScript(data);
    } catch (error) {
      alert("Failed to generate script. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Viral Script</span> Generator
          <Wand2 className="text-accent w-8 h-8" />
        </h2>
        <p className="text-slate-400">Turn a simple idea into a high-retention script in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Input Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 h-fit">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">What's your video about?</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 5 psychological tricks to make anyone like you..."
                className="w-full bg-darker border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-32 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {['TikTok', 'YouTube Shorts', 'Reels'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      platform === p 
                        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                        : 'bg-darker text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
              Generate Viral Script
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-2xl p-6 min-h-[500px] flex flex-col relative overflow-hidden">
          {!script ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-primary rounded-full animate-spin opacity-20 mb-4"></div>
              <p>AI is waiting for your genius idea...</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{script.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {script.hashtags.map((tag, i) => (
                      <span key={i} className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-md flex items-center">
                        <Hash className="w-3 h-3 mr-1" /> {tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white" title="Copy to Clipboard">
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Hook */}
                <div className="bg-darker/50 rounded-xl p-4 border-l-4 border-red-500">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 block">The Hook (0-3s)</span>
                  <p className="text-white font-medium text-lg leading-relaxed">"{script.hook}"</p>
                  <div className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span className="italic">Visual: {script.visualCues[0]}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-darker/50 rounded-xl p-4 border-l-4 border-blue-500">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">The Value (Body)</span>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">{script.body}</p>
                   <div className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span className="italic">Visual: {script.visualCues[1] || "Dynamic fast cuts"}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-darker/50 rounded-xl p-4 border-l-4 border-green-500">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 block">Call To Action</span>
                  <p className="text-white font-medium">"{script.cta}"</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                 <button className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
                  Regenerate
                 </button>
                 <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Send to Editor
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;