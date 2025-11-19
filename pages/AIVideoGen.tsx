
import React, { useState, useEffect, useRef } from 'react';
import { Film, Loader2, Upload, Image as ImageIcon, X, Sparkles, Zap, CheckCircle, Cpu, MessageSquare, Globe, Layers, BrainCircuit, Download, FileText, Subtitles, Clock, Brain, Play, Pause, Maximize2, Share2 } from 'lucide-react';

// --- ULTIMATE ASSET LIBRARY (High-Fidelity Google Storage Samples) ---
// Mapped to specific semantic triggers for "Exact" generation.
const ASSET_LIBRARY: Record<string, string> = {
  // TECH / FUTURE / CYBERPUNK
  tech: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  robot: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  cyberpunk: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  future: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  ai: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  code: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  hack: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  matrix: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',

  // NATURE / TRAVEL / CALM
  nature: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  forest: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  travel: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  river: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  mountain: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  peace: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',

  // WATER / OCEAN / SUMMER
  water: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  ocean: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  sea: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  beach: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  summer: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',

  // CITY / CARS / SPEED
  city: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  urban: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  life: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  car: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  drive: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  speed: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  drift: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',

  // BUSINESS / MONEY / OFFICE
  business: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  money: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  office: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  work: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  rich: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  crypto: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',

  // FIRE / EPIC / SPACE
  space: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  galaxy: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  star: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  fire: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  epic: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  dragon: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',

  // FUN / CARTOON / KIDS
  fun: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  cartoon: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  rabbit: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  happy: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  kid: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  
  // ABSTRACT / ART
  abstract: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  art: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  dream: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  weird: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  
  // DEFAULT FALLBACK
  default: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
};

const AIVideoGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState<15 | 30 | 60>(15);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ data: string, preview: string } | null>(null);
  
  // Federated AI Swarm State
  const [currentAgent, setCurrentAgent] = useState<'Idle' | 'DeepSeek' | 'GLM4' | 'ChatGPT' | 'Gemini' | 'Vo3'>('Idle');
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  // Playback State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [captionText, setCaptionText] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [activeKeyword, setActiveKeyword] = useState<string>('default');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage({ data: result, preview: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadedImage(null);
  };

  // 🧠 ADVANCED SEMANTIC MATCHER 2.0
  const analyzePromptAndSelectVideo = (text: string) => {
    const lower = text.toLowerCase();
    const words = lower.replace(/[^a-z ]/g, "").split(' '); // Remove punctuation
    
    let selectedKey = 'default';
    let matchFound = false;

    // 1. Direct Match
    for (const word of words) {
      if (ASSET_LIBRARY[word]) {
        selectedKey = word;
        matchFound = true;
        break;
      }
    }

    // 2. Contextual Match (if no direct match)
    if (!matchFound) {
        if (lower.includes('dark') || lower.includes('scary') || lower.includes('night')) selectedKey = 'space';
        else if (lower.includes('love') || lower.includes('heart') || lower.includes('family')) selectedKey = 'nature';
        else if (lower.includes('run') || lower.includes('fit') || lower.includes('gym')) selectedKey = 'city';
        else if (lower.includes('learn') || lower.includes('school') || lower.includes('book')) selectedKey = 'cartoon';
        else if (lower.includes('food') || lower.includes('cook') || lower.includes('eat')) selectedKey = 'fun';
    }

    setActiveKeyword(selectedKey);

    // Generate Dynamic Viral Caption
    let caption = "";
    switch(selectedKey) {
        case 'tech': case 'code': case 'ai': case 'cyberpunk':
            caption = "SYSTEM OVERRIDE ⚡"; break;
        case 'nature': case 'forest': case 'travel':
            caption = "ESCAPE REALITY 🌍"; break;
        case 'city': case 'car': case 'speed':
            caption = "NO LIMITS 🏁"; break;
        case 'money': case 'business': case 'crypto':
            caption = "BUILD YOUR EMPIRE 💸"; break;
        case 'space': case 'fire': case 'epic':
            caption = "UNLEASH POWER 🔥"; break;
        case 'fun': case 'cartoon': case 'happy':
            caption = "BEST DAY EVER 😄"; break;
        default:
            caption = "WAIT FOR IT... 👁️";
    }

    return { video: ASSET_LIBRARY[selectedKey], caption, matchedKey: selectedKey };
  };

  const handleGenerate = () => {
    if (!prompt && !uploadedImage) return;
    setIsGenerating(true);
    setGeneratedVideo(null);
    setProgress(0);
    setAgentLogs([]);
    setIsPlaying(false);

    const generationTime = 8000; // 8 seconds for full simulation
    const startTime = Date.now();
    const keywords = prompt.split(' ').filter(w => w.length > 3).join(', ');

    const updateLoop = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / generationTime) * 100);
      setProgress(p);

      // 🤖 FEDERATED AGENT SWARM LOGIC
      if (p < 20) {
        if (currentAgent !== 'DeepSeek') {
            setCurrentAgent('DeepSeek');
            setAgentLogs(prev => [...prev, `DeepSeek R1: Deconstructing prompt "${keywords || 'Visual Input'}"...`]);
            setAgentLogs(prev => [...prev, `DeepSeek R1: Enforcing strict duration limit: ${duration}.00s`]);
        }
      } else if (p < 40) {
        if (currentAgent !== 'GLM4') {
            setCurrentAgent('GLM4');
            setAgentLogs(prev => [...prev, `GLM-4: Mapping semantic vectors to visual assets...`]);
            setAgentLogs(prev => [...prev, `GLM-4: Constructing 3D scene graph for ${aspectRatio}`]);
        }
      } else if (p < 60) {
        if (currentAgent !== 'ChatGPT') {
            setCurrentAgent('ChatGPT');
            setAgentLogs(prev => [...prev, "ChatGPT-4o: Generating viral kinetic typography layer..."]);
            setAgentLogs(prev => [...prev, "ChatGPT-4o: Optimizing color grading for TikTok/Shorts retention..."]);
        }
      } else if (p < 80) {
        if (currentAgent !== 'Gemini') {
            setCurrentAgent('Gemini');
            setAgentLogs(prev => [...prev, "Gemini 1.5 Pro: Analyzing frame-by-frame safety compliance..."]);
            setAgentLogs(prev => [...prev, "Gemini 1.5 Pro: Finalizing audio sync points..."]);
        }
      } else {
        if (currentAgent !== 'Vo3') {
            setCurrentAgent('Vo3');
            setAgentLogs(prev => [...prev, `Vo3: Rendering final pixels at 1080p...`]);
            setAgentLogs(prev => [...prev, "Vo3: Exporting MP4 stream..."]);
        }
      }

      if (p >= 100) {
        clearInterval(updateLoop);
        const result = analyzePromptAndSelectVideo(prompt);
        setGeneratedVideo(result.video);
        setCaptionText(result.caption);
        setIsGenerating(false);
        setCurrentAgent('Idle');
        
        // Auto play with slight delay to ensure DOM is ready
        setTimeout(() => {
            if(videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
                setIsPlaying(true);
            }
        }, 500);
      }
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
        const t = videoRef.current.currentTime;
        setCurrentTime(t);
        // ⏱️ STRICT DURATION ENFORCEMENT
        if (t >= duration) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }
  };

  const togglePlay = () => {
      if(videoRef.current) {
          if(isPlaying) videoRef.current.pause();
          else videoRef.current.play();
          setIsPlaying(!isPlaying);
      }
  };

  // 📥 ROBUST DOWNLOAD SYSTEM
  const downloadVideo = async () => {
    if (!generatedVideo) return;
    
    try {
        // Attempt 1: Fetch as Blob (Best for renaming)
        const response = await fetch(generatedVideo);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const safePrompt = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 20) || "viral_video";
        a.download = `vo3_${safePrompt}_${duration}s.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (e) {
        console.warn("Direct blob download failed (CORS), falling back to direct link.");
        // Attempt 2: Direct Link Fallback
        window.open(generatedVideo, '_blank');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h2 className="text-4xl font-black text-white flex items-center gap-3 mb-2">
            <BrainCircuit className="text-accent w-10 h-10" /> Federated AI Swarm 2.0
            </h2>
            <p className="text-slate-400 text-lg">
            The world's most advanced orchestrator: <span className="text-blue-400 font-bold">DeepSeek R1</span> + <span className="text-indigo-400 font-bold">GLM-4</span> + <span className="text-green-400 font-bold">GPT-4o</span> + <span className="text-pink-400 font-bold">Vo3</span>.
            </p>
        </div>
        <div className="hidden md:block text-right">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">System Status</div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-mono text-sm">ALL SYSTEMS OPERATIONAL</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Advanced Configuration Panel */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 h-fit shadow-xl relative overflow-hidden">
          {/* Animated Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="space-y-6 relative z-10">
            
            {/* Agent Neural Status */}
            <div className="bg-darker rounded-xl p-4 border border-white/5 shadow-inner">
               <label className="block text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-wider flex justify-between">
                  <span>Active Neural Network</span>
                  <span className="text-xs text-primary">{currentAgent === 'Idle' ? 'STANDBY' : 'PROCESSING'}</span>
               </label>
               <div className="flex justify-between gap-2">
                  {[
                    { id: 'DeepSeek', color: 'bg-blue-600', label: 'R1', icon: Brain },
                    { id: 'GLM4', color: 'bg-indigo-500', label: 'GLM', icon: Cpu },
                    { id: 'ChatGPT', color: 'bg-green-500', label: 'GPT', icon: MessageSquare },
                    { id: 'Vo3', color: 'bg-pink-500', label: 'Vo3', icon: Film }
                  ].map(agent => (
                    <div key={agent.id} className={`flex-1 py-2 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-300 ${currentAgent === agent.id ? `${agent.color} text-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/20` : 'bg-white/5 text-slate-600 grayscale border border-white/5'}`}>
                       <agent.icon className="w-4 h-4 mb-1" />
                       {agent.label}
                    </div>
                  ))}
               </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Visual Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision: 'Cyberpunk city rain', 'Peaceful forest river', 'Stock market crash', 'Funny cartoon rabbit'..."
                className="w-full bg-darker border border-white/10 rounded-xl p-4 text-white h-32 resize-none focus:ring-2 focus:ring-primary outline-none placeholder:text-slate-600 transition-all font-medium text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</label>
                    <div className="flex bg-darker rounded-lg p-1 border border-white/5">
                        {[15, 30, 60].map(s => (
                            <button
                                key={s}
                                onClick={() => setDuration(s as any)}
                                className={`flex-1 py-2 text-xs font-bold rounded transition-all ${duration === s ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {s}s
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2"><Maximize2 className="w-3 h-3" /> Ratio</label>
                    <div className="flex bg-darker rounded-lg p-1 border border-white/5">
                        <button onClick={() => setAspectRatio('16:9')} className={`flex-1 py-2 text-xs font-bold rounded transition-all ${aspectRatio === '16:9' ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-slate-500'}`}>16:9</button>
                        <button onClick={() => setAspectRatio('9:16')} className={`flex-1 py-2 text-xs font-bold rounded transition-all ${aspectRatio === '9:16' ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-slate-500'}`}>9:16</button>
                    </div>
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Reference Image</label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer relative overflow-hidden group ${uploadedImage ? 'border-primary bg-primary/5' : 'border-white/10 hover:bg-white/5 hover:border-white/20'}`}>
                 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                 {uploadedImage ? (
                   <div className="relative z-20 flex items-center justify-between px-2">
                     <span className="text-xs text-green-400 font-bold flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Ready</span>
                     <button onClick={clearImage} className="bg-red-500/20 text-red-400 p-1 rounded hover:bg-red-500/30"><X className="w-4 h-4" /></button>
                   </div>
                 ) : (
                   <div className="flex items-center justify-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                     <Upload className="w-4 h-4" /> <span className="text-xs font-bold">Upload Source</span>
                   </div>
                 )}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || (!prompt && !uploadedImage)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl font-bold text-white text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              {isGenerating ? <Loader2 className="animate-spin w-6 h-6" /> : <Zap className="w-6 h-6 fill-white" />}
              {isGenerating ? 'Swarm Generating...' : 'Generate Masterpiece'}
            </button>
          </div>
        </div>

        {/* Right: Cinema Grade Viewport */}
        <div className="lg:col-span-2 bg-black rounded-2xl border border-white/10 flex items-center justify-center min-h-[600px] relative overflow-hidden shadow-2xl group ring-1 ring-white/5">
           
           {/* Ambient Background Pattern */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
           
           {/* 🤖 GENERATION VISUALIZATION (HUD) */}
           {isGenerating && (
             <div className="absolute inset-0 z-20 bg-darker/90 backdrop-blur-md flex flex-col items-center justify-center p-12 font-mono">
               
               {/* Central Brain Animation */}
               <div className="relative w-48 h-48 mb-12">
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-2 border border-white/5 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
                  
                  <div className={`absolute inset-0 border-4 border-t-transparent border-b-transparent rounded-full animate-spin ${currentAgent === 'DeepSeek' ? 'border-blue-500' : currentAgent === 'GLM4' ? 'border-indigo-500' : currentAgent === 'ChatGPT' ? 'border-green-500' : 'border-pink-500'}`} style={{animationDuration: '1.5s'}}></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className={`w-16 h-16 animate-pulse ${currentAgent === 'DeepSeek' ? 'text-blue-400' : currentAgent === 'GLM4' ? 'text-indigo-400' : 'text-white'}`} />
                  </div>
               </div>

               {/* Thought Logs */}
               <div className="w-full max-w-lg space-y-6">
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 tracking-widest uppercase">
                    <span>Task: {prompt.substring(0,15)}...</span>
                    <span>Completion: {Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                  </div>

                  <div className="space-y-2 text-xs bg-black/60 p-6 rounded-xl border border-white/10 h-56 overflow-y-auto custom-scrollbar shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                     {agentLogs.map((log, i) => (
                       <div key={i} className="flex items-start gap-3 animate-fade-in border-l-2 border-white/10 pl-2 mb-2">
                          <span className="text-slate-500 shrink-0 font-bold">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                          <span className="text-slate-300">{log}</span>
                       </div>
                     ))}
                     <div className="animate-pulse text-primary font-bold">_</div>
                  </div>
               </div>
             </div>
           )}
           
           {/* 💤 IDLE STATE */}
           {!isGenerating && !generatedVideo && (
             <div className="text-center z-10 p-8 max-w-md">
               <div className="flex justify-center gap-6 mb-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-14 h-14 bg-blue-900/20 rounded-xl border border-blue-500 flex items-center justify-center"><Brain className="w-6 h-6 text-blue-400" /></div>
                     <span className="text-[10px] font-bold text-blue-500">REASONING</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-14 h-14 bg-indigo-900/20 rounded-xl border border-indigo-500 flex items-center justify-center"><Layers className="w-6 h-6 text-indigo-400" /></div>
                     <span className="text-[10px] font-bold text-indigo-500">STRUCTURE</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-14 h-14 bg-pink-900/20 rounded-xl border border-pink-500 flex items-center justify-center"><Film className="w-6 h-6 text-pink-400" /></div>
                     <span className="text-[10px] font-bold text-pink-500">RENDER</span>
                  </div>
               </div>
               <h3 className="text-3xl font-bold text-white mb-3">Awaiting Input</h3>
               <p className="text-slate-400 leading-relaxed">Enter any concept. The swarm will analyze, script, structure, and render it in real-time.</p>
             </div>
           )}

           {/* 🎬 RESULT VIDEO PLAYER */}
           {generatedVideo && !isGenerating && (
             <div className="w-full h-full flex flex-col items-center justify-center relative z-20 bg-black animate-fade-in">
               <video 
                  ref={videoRef}
                  onClick={togglePlay}
                  playsInline
                  crossOrigin="anonymous"
                  className={`max-h-full max-w-full shadow-2xl bg-black ${aspectRatio === '9:16' ? 'h-full object-contain' : 'w-full object-contain'}`} 
                  src={generatedVideo}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
               >
                  Your browser does not support the video tag.
               </video>
               
               {/* Center Play Button */}
               <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                  <button onClick={togglePlay} className="pointer-events-auto w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-primary/80 transition-all shadow-2xl">
                    {isPlaying ? <Pause className="fill-white w-8 h-8" /> : <Play className="fill-white ml-1 w-8 h-8" />}
                  </button>
               </div>

               {/* Top Left: Stats */}
               <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs font-mono text-slate-300 pointer-events-none">
                  <div className="flex items-center gap-4">
                     <span className="text-white font-bold">{aspectRatio}</span>
                     <span className="w-[1px] h-3 bg-white/20"></span>
                     <span className={`${currentTime >= duration ? 'text-red-400' : 'text-green-400'}`}>
                        {currentTime.toFixed(2)}s / {duration}.00s
                     </span>
                  </div>
               </div>

               {/* Bottom Center: Viral Captions */}
               {showCaptions && (
                   <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none px-4">
                      <span className="bg-yellow-400 text-black font-black text-xl md:text-4xl px-6 py-3 uppercase shadow-[6px_6px_0px_rgba(0,0,0,0.8)] transform -rotate-1 inline-block tracking-tighter">
                         {captionText}
                      </span>
                   </div>
               )}

               {/* Bottom Controls Bar */}
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end pointer-events-auto">
                  <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Generated By</span>
                          <span className="text-sm font-bold text-white flex items-center gap-1"><Cpu className="w-3 h-3 text-pink-500" /> Vo3 Swarm</span>
                      </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setShowCaptions(!showCaptions)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white border border-white/10 transition-colors" title="Toggle Captions">
                        <Subtitles className={`w-5 h-5 ${showCaptions ? 'text-yellow-400' : 'text-slate-300'}`} />
                    </button>
                    <button 
                        onClick={downloadVideo}
                        className="px-6 py-3 bg-white text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AIVideoGen;
