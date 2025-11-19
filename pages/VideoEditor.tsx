
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Scissors, Type, Music, Image as ImageIcon, Download, Settings2, Plus, CheckCircle, Mic, Wand2, FileText, Loader2, Share2 } from 'lucide-react';
import { generateTTS, planVideoEdit, generateCaptions } from '../services/geminiService';

const VideoEditor: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  
  // Video Ref for controlling playback
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // New states for AI features
  const [showTTSModal, setShowTTSModal] = useState(false);
  const [showAutoEditModal, setShowAutoEditModal] = useState(false);
  const [ttsText, setTtsText] = useState('');
  const [isGeneratingTTS, setIsGeneratingTTS] = useState(false);
  const [isAutoEditing, setIsAutoEditing] = useState(false);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
  
  // Export States
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPreset, setExportPreset] = useState<'TikTok' | 'Shorts' | 'Reels' | 'Custom'>('TikTok');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Auto Edit Preferences
  const [autoEditPrompt, setAutoEditPrompt] = useState("");
  const [editPacing, setEditPacing] = useState('Fast-paced');
  const [editStyle, setEditStyle] = useState('TikTok Viral');

  const [tracks, setTracks] = useState([
    { id: 1, type: 'video', name: 'Main_Footage_v1.mp4', duration: 120, color: 'bg-blue-500' },
    { id: 2, type: 'audio', name: 'Viral_Background_Music.mp3', duration: 120, color: 'bg-green-500' },
  ]);

  // Sync Video State with UI
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Auto-save effect
  useEffect(() => {
    const intervalId = setInterval(() => performAutoSave(), 120000);
    return () => clearInterval(intervalId);
  }, [tracks, currentTime]);

  const performAutoSave = () => {
    const projectState = { tracks, currentTime, lastModified: new Date().toISOString() };
    try {
      localStorage.setItem('viralflow_current_project', JSON.stringify(projectState));
      setLastSaved(new Date());
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    } catch (error) {
      console.error("Auto-save failed", error);
    }
  };

  const handleTTS = async () => {
    if (!ttsText) return;
    setIsGeneratingTTS(true);
    try {
      const audioBase64 = await generateTTS(ttsText);
      if (audioBase64) {
         setTracks(prev => [...prev, {
           id: Date.now(),
           type: 'audio',
           name: 'AI_Voiceover.wav',
           duration: 30, 
           color: 'bg-orange-500'
         }]);
         setShowTTSModal(false);
         setTtsText('');
      }
    } catch (e) {
      alert("TTS Generation failed");
    } finally {
      setIsGeneratingTTS(false);
    }
  };

  const handleAutoEdit = async () => {
    setIsAutoEditing(true);
    try {
      const rawFootageDesc = "Raw 10-minute vlog footage, handheld camera, street noise, good lighting.";
      const fullStylePrompt = `Pacing: ${editPacing}. Style: ${editStyle}. Instructions: ${autoEditPrompt || 'Make it engaging.'}`;
      const result = await planVideoEdit(rawFootageDesc, fullStylePrompt);
      if (result) {
        const newTracks = [...tracks];
        if (result.musicTrack) {
          newTracks.push({
            id: Date.now(),
            type: 'audio',
            name: `AI: ${result.musicTrack}`,
            duration: 120,
            color: 'bg-pink-500'
          });
        }
        setTracks(newTracks);
        setShowAutoEditModal(false);
      }
    } catch (e) {
      alert("Auto Edit failed to generate a plan.");
    } finally {
      setIsAutoEditing(false);
    }
  };

  const handleAutoCaptions = async () => {
    setIsGeneratingCaptions(true);
    try {
      const captions = await generateCaptions("Welcome to the channel! Today we are reviewing the new AI gadgets.");
      if (captions) {
        setTracks(prev => [...prev, {
           id: Date.now(),
           type: 'text',
           name: 'AI_Captions.srt',
           duration: 120, 
           color: 'bg-purple-500'
        }]);
      }
    } catch (e) {
      alert("Caption generation failed");
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  const startExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    // Simulate render process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setShowExportModal(false);
          alert(`Video Exported Successfully for ${exportPreset}!`);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-darker overflow-hidden relative">
      
      {/* Auto-save Banner Notification */}
      <div className={`absolute top-0 left-0 right-0 z-[60] transition-transform duration-500 ease-in-out ${showSaveNotification ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-green-600 text-white py-3 shadow-xl flex items-center justify-center gap-3 border-b border-green-500">
          <div className="p-1 bg-white/20 rounded-full">
             <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide">Project Auto-Saved Successfully!</span>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="bg-surface border border-white/10 rounded-2xl p-8 w-[500px] shadow-2xl relative overflow-hidden">
            {isExporting && (
              <div className="absolute inset-0 bg-darker/90 flex flex-col items-center justify-center z-20">
                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                   <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75 ease-out" style={{width: `${exportProgress}%`}}></div>
                </div>
                <p className="text-white font-bold animate-pulse">Rendering Video... {exportProgress}%</p>
                <p className="text-xs text-slate-400 mt-2">Optimizing for {exportPreset}</p>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2"><Share2 className="w-6 h-6 text-accent" /> Export Video</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-white">Close</button>
            </div>
            
            <div className="space-y-4 mb-8">
               <label className="text-sm text-slate-400 font-bold uppercase tracking-wider">Select Platform Preset</label>
               <div className="grid grid-cols-3 gap-3">
                 <button 
                   onClick={() => setExportPreset('TikTok')}
                   className={`p-4 rounded-xl border transition-all text-center ${exportPreset === 'TikTok' ? 'bg-black border-primary shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-darker border-white/5 hover:bg-white/5'}`}
                 >
                   <div className="font-bold text-white mb-1">TikTok</div>
                   <div className="text-[10px] text-slate-400">1080x1920 • 30fps</div>
                 </button>
                 <button 
                   onClick={() => setExportPreset('Shorts')}
                   className={`p-4 rounded-xl border transition-all text-center ${exportPreset === 'Shorts' ? 'bg-red-900/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-darker border-white/5 hover:bg-white/5'}`}
                 >
                   <div className="font-bold text-white mb-1">Shorts</div>
                   <div className="text-[10px] text-slate-400">1080x1920 • 60fps</div>
                 </button>
                 <button 
                   onClick={() => setExportPreset('Reels')}
                   className={`p-4 rounded-xl border transition-all text-center ${exportPreset === 'Reels' ? 'bg-pink-900/20 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'bg-darker border-white/5 hover:bg-white/5'}`}
                 >
                   <div className="font-bold text-white mb-1">Reels</div>
                   <div className="text-[10px] text-slate-400">1080x1920 • 30fps</div>
                 </button>
               </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Resolution</span>
                <span className="text-white font-mono">1080 x 1920</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Frame Rate</span>
                <span className="text-white font-mono">{exportPreset === 'Shorts' ? '60 fps' : '30 fps'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Format</span>
                <span className="text-white font-mono">H.264 / MP4</span>
              </div>
            </div>

            <button 
              onClick={startExport}
              className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-bold text-white text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
            >
              Export Video
            </button>
          </div>
        </div>
      )}

      {/* TTS Modal */}
      {showTTSModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-surface border border-white/10 rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">AI Voiceover (TTS)</h3>
            <textarea 
              value={ttsText}
              onChange={e => setTtsText(e.target.value)}
              placeholder="Enter text to speak..."
              className="w-full bg-darker p-3 rounded-lg text-white text-sm h-32 mb-4 outline-none border border-white/10"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowTTSModal(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
              <button onClick={handleTTS} disabled={isGeneratingTTS} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                {isGeneratingTTS ? 'Generating...' : 'Add to Timeline'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto Edit Modal */}
      {showAutoEditModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-surface border border-white/10 rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Wand2 className="w-5 h-5 text-accent" /> Auto-Edit Preferences</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                  <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Pacing</label>
                  <select 
                      value={editPacing}
                      onChange={(e) => setEditPacing(e.target.value)}
                      className="w-full bg-darker border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-accent"
                  >
                      <option>Fast-paced (Viral)</option>
                      <option>Cinematic (Slow)</option>
                      <option>Balanced (Standard)</option>
                  </select>
              </div>
              <div>
                  <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Style</label>
                  <select 
                      value={editStyle}
                      onChange={(e) => setEditStyle(e.target.value)}
                      className="w-full bg-darker border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-accent"
                  >
                      <option>TikTok / Shorts High Energy</option>
                      <option>YouTube Vlog</option>
                      <option>Professional / Corporate</option>
                      <option>Documentary</option>
                  </select>
              </div>
              <div>
                  <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Additional Instructions</label>
                  <textarea 
                      value={autoEditPrompt}
                      onChange={e => setAutoEditPrompt(e.target.value)}
                      className="w-full bg-darker p-3 rounded-lg text-white text-sm h-24 outline-none border border-white/10 focus:border-accent resize-none placeholder:text-slate-600"
                      placeholder="e.g. 'Remove silence > 0.5s', 'Sync cuts to beat', 'Zoom on key moments'..."
                  />
                  <div className="text-[10px] text-slate-500 mt-2 space-y-1 border-t border-white/5 pt-2">
                    <p className="font-semibold text-slate-400">Example Prompts:</p>
                    <p>• "Cut all silence longer than 0.3s"</p>
                    <p>• "Add a slow zoom-in when I speak loudly"</p>
                    <p>• "Match the cuts to the beat of the music"</p>
                    <p>• "Insert B-roll when I mention 'AI Technology'"</p>
                  </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAutoEditModal(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
              <button onClick={handleAutoEdit} disabled={isAutoEditing} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium flex items-center gap-2">
                {isAutoEditing ? <Loader2 className="animate-spin w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                {isAutoEditing ? 'AI is Editing...' : 'Apply AI Edits'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Toolbar */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-surface">
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300" title="Split"><Scissors className="w-5 h-5" /></button>
           <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300" title="Text"><Type className="w-5 h-5" /></button>
           <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300" title="Audio"><Music className="w-5 h-5" /></button>
           <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300" title="Image"><ImageIcon className="w-5 h-5" /></button>
           <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
           <button onClick={() => setShowTTSModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white border border-white/5">
             <Mic className="w-4 h-4 text-blue-400" /> AI Voice
           </button>
           <button onClick={() => setShowAutoEditModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white border border-white/5">
             <Wand2 className="w-4 h-4 text-accent" /> Auto-Edit
           </button>
           <button onClick={handleAutoCaptions} disabled={isGeneratingCaptions} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white border border-white/5">
             {isGeneratingCaptions ? <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" /> : <FileText className="w-4 h-4 text-green-400" />} Captions
           </button>
        </div>
        <div className="text-sm font-mono text-slate-400">00:00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:02:00</div>
        <div className="flex items-center gap-4">
          {lastSaved && <span className="text-xs text-slate-500 hidden sm:block">Saved {lastSaved.toLocaleTimeString()}</span>}
          <button 
            onClick={() => setShowExportModal(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex">
        
        {/* Assets */}
        <div className="w-64 border-r border-white/5 bg-surface p-4 flex flex-col gap-4 hidden md:flex">
           <div className="p-3 bg-white/5 rounded-lg border border-white/5 border-dashed flex flex-col items-center justify-center text-slate-400 hover:bg-white/10 cursor-pointer transition-colors">
             <Plus className="w-6 h-6 mb-2" />
             <span className="text-xs font-medium">Import Media</span>
           </div>
           <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
             {/* Mock Assets */}
             {[1,2,3].map(i => (
               <div key={i} className="flex gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer group">
                 <div className="w-12 h-12 bg-dark rounded-md overflow-hidden relative">
                    <img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-full h-full object-cover opacity-70" />
                 </div>
                 <div className="flex-1 min-w-0 flex flex-col justify-center">
                   <p className="text-xs text-slate-200 truncate">clip_{i}.mp4</p>
                   <p className="text-[10px] text-slate-500">00:15</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-black flex items-center justify-center relative p-8">
           <div className="aspect-[9/16] h-full max-h-[600px] bg-zinc-900 rounded-lg overflow-hidden shadow-2xl relative group ring-1 ring-white/10">
             {/* REAL VIDEO PLAYER */}
             <video 
               ref={videoRef}
               className="w-full h-full object-cover"
               src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" // Reliable Default
               onTimeUpdate={handleTimeUpdate}
               onClick={togglePlay}
               onEnded={() => setIsPlaying(false)}
               playsInline
               crossOrigin="anonymous"
             />
             
             <div className="absolute bottom-20 w-full text-center px-8 pointer-events-none">
                {isGeneratingCaptions && (
                  <span className="bg-black/60 text-white font-black text-2xl px-2 py-1 uppercase animate-bounce">
                    GENERATING CAPTIONS...
                  </span>
                )}
             </div>

             <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <button onClick={togglePlay} className="pointer-events-auto w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
                </button>
             </div>
           </div>
        </div>

        {/* Properties */}
        <div className="w-64 border-l border-white/5 bg-surface p-4 hidden lg:block">
          <div className="flex items-center gap-2 mb-6 text-slate-300">
            <Settings2 className="w-4 h-4" /> <span className="font-bold text-sm">Properties</span>
          </div>
          {/* Controls */}
          <div className="space-y-4">
             <div><label className="text-xs font-bold text-slate-500 uppercase">Scale</label><input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none accent-primary" /></div>
             <div><label className="text-xs font-bold text-slate-500 uppercase">Volume</label><input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none accent-primary" /></div>
          </div>
        </div>

      </div>

      {/* Timeline */}
      <div className="h-64 border-t border-white/5 bg-darker flex flex-col">
         <div className="h-8 border-b border-white/5 flex items-center px-4 gap-4 text-slate-400">
            <button onClick={togglePlay} className="hover:text-white">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max={videoRef.current?.duration || 100} 
              value={currentTime}
              onChange={(e) => {
                const time = parseFloat(e.target.value);
                setCurrentTime(time);
                if(videoRef.current) videoRef.current.currentTime = time;
              }}
              className="flex-1 accent-primary h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
            />
         </div>
         
         <div className="flex-1 overflow-y-auto p-4 space-y-2 relative custom-scrollbar">
            <div className="absolute top-0 left-4 right-4 h-full w-[1px] bg-red-500 z-10 pointer-events-none shadow-[0_0_10px_red]" style={{ left: `${(currentTime / (videoRef.current?.duration || 120)) * 100}%` }}></div>
            {tracks.map(track => (
              <div key={track.id} className="flex gap-4 items-center">
                <div className="w-8 text-xs text-slate-500 uppercase font-bold">{track.type}</div>
                <div className="flex-1 h-10 bg-white/5 rounded-lg relative overflow-hidden group hover:bg-white/10 transition-colors">
                  <div className={`absolute top-0 left-0 h-full ${track.color}/20 border-l-2 border-r-2 border-${track.color.split('-')[1]}-500 w-1/2 flex items-center px-2 ring-1 ring-white/5`}>
                    <span className="text-xs font-medium text-white truncate">{track.name}</span>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default VideoEditor;
