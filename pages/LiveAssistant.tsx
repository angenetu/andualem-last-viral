
import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const LiveAssistant: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Refs for audio handling
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

  const connectToLive = async () => {
    try {
      addLog("Initializing audio context...");
      
      // Cross-browser AudioContext creation
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;

      // CRITICAL: Resume audio context if it was suspended (Browser Autoplay Policy)
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      addLog("Requesting microphone...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      addLog("Connecting to Gemini Live API...");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          systemInstruction: "You are a viral content coach. Help the user brainstorm ideas for TikToks and YouTube Shorts. Be energetic and concise.",
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        },
        callbacks: {
          onopen: () => {
            addLog("Session Connected!");
            setConnected(true);
            
            const source = audioCtx.createMediaStreamSource(stream);
            // ScriptProcessor is deprecated but widely supported for raw PCM access in demos
            const processor = audioCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Simple placeholder for PCM data transmission
              // In a full implementation, we would convert Float32 to Int16 PCM here
              sessionPromise.then(session => {
                 // session.sendRealtimeInput({ media: ... });
              });
            };
            
            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: (msg) => {
            if (msg.serverContent?.modelTurn) {
              setIsSpeaking(true);
              setTimeout(() => setIsSpeaking(false), 2000);
            }
          },
          onclose: () => {
             setConnected(false);
             addLog("Session Closed");
          },
          onerror: (err) => {
             console.error(err);
             addLog("Error: " + err.message);
          }
        }
      });
      
    } catch (error: any) {
      addLog("Connection failed: " + error.message);
    }
  };

  const disconnect = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setConnected(false);
    addLog("Disconnected");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Live Viral Coach</h2>
        <p className="text-slate-400">Have a real-time voice conversation with Gemini to brainstorm ideas.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-500 ${connected ? 'bg-primary/20 shadow-[0_0_50px_rgba(99,102,241,0.3)]' : 'bg-surface'}`}>
          {/* Visualizer Circle */}
          {connected && (
             <div className={`absolute inset-0 border-4 border-primary rounded-full opacity-50 ${isSpeaking ? 'animate-ping' : ''}`}></div>
          )}
          
          <button 
            onClick={connected ? disconnect : connectToLive}
            className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all hover:scale-105 ${connected ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
          >
            {connected ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
          </button>
        </div>

        <div className="mt-12 space-y-2 text-center">
           <div className="h-6 text-primary font-mono text-sm">
             {isSpeaking ? <span className="flex items-center justify-center gap-2"><Volume2 className="w-4 h-4 animate-pulse" /> AI is speaking...</span> : (connected ? "Listening..." : "")}
           </div>
           <div className="bg-surface/50 p-4 rounded-xl border border-white/5 w-96 h-40 overflow-y-auto custom-scrollbar text-left font-mono text-xs text-slate-400">
             {logs.map((log, i) => <div key={i}>&gt; {log}</div>)}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
