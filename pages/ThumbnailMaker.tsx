
import React, { useState } from 'react';
import { Image as ImageIcon, Wand2, Download, RefreshCw, Layers } from 'lucide-react';
import { generateImagenImage, editImageNano } from '../services/geminiService';

const ThumbnailMaker: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');

  const handleAction = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      if (mode === 'generate') {
        const base64 = await generateImagenImage(prompt, aspectRatio);
        setGeneratedImage(base64);
      } else if (mode === 'edit' && generatedImage) {
        const base64 = await editImageNano(generatedImage, prompt);
        if (base64) setGeneratedImage(base64);
      }
    } catch (error) {
      alert("Operation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <ImageIcon className="text-purple-400 w-8 h-8" /> Thumbnail Creator
          </h2>
          <p className="text-slate-400">Create high-CTR thumbnails with Imagen 3 & Edit with Flash Image.</p>
        </div>
        <div className="bg-surface p-1 rounded-lg border border-white/10 flex">
          <button onClick={() => setMode('generate')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'generate' ? 'bg-primary text-white' : 'text-slate-400'}`}>Generate</button>
          <button onClick={() => setMode('edit')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'edit' ? 'bg-primary text-white' : 'text-slate-400'}`}>Edit (Nano)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-surface border border-white/5 rounded-2xl p-6 h-fit">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {mode === 'generate' ? 'Describe your Thumbnail' : 'How to edit this image?'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={mode === 'generate' ? "A shocked youtuber pointing at a flying car, vibrant colors..." : "Add a red arrow pointing to the car..."}
                className="w-full bg-darker border border-white/10 rounded-xl p-4 text-white h-32 resize-none focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {mode === 'generate' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Aspect Ratio</label>
                <div className="flex gap-2">
                  {['16:9', '9:16', '1:1'].map(r => (
                    <button 
                      key={r} 
                      onClick={() => setAspectRatio(r as any)}
                      className={`flex-1 py-2 border rounded-lg text-sm ${aspectRatio === r ? 'bg-purple-600 border-purple-600 text-white' : 'border-white/10 text-slate-400'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAction}
              disabled={isLoading || !prompt}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="animate-spin w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
              {mode === 'generate' ? 'Generate with Imagen 3' : 'Edit with Nano Banana'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-center min-h-[500px] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
           {!generatedImage ? (
             <div className="text-slate-500 text-center p-8">
               <Layers className="w-16 h-16 mx-auto mb-4 opacity-20" />
               <p>Your masterpiece starts here.</p>
             </div>
           ) : (
             <div className="relative w-full h-full flex items-center justify-center p-4">
               <img src={generatedImage} alt="Generated" className="max-w-full max-h-full rounded-lg shadow-2xl" />
               <div className="absolute top-4 right-4 flex gap-2">
                 <a href={generatedImage} download="thumbnail.png" className="p-2 bg-white/90 text-black rounded-lg hover:bg-white"><Download className="w-5 h-5" /></a>
               </div>
             </div>
           )}
           {isLoading && (
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
               <div className="text-center">
                 <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                 <p className="text-white font-medium">{mode === 'generate' ? 'Painting pixels...' : 'Applying magic edits...'}</p>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailMaker;
