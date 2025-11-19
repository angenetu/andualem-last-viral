import React, { useState } from 'react';
import { Search, Filter, Download, Star, PlayCircle } from 'lucide-react';
import { Template } from '../types';

const mockTemplates: Template[] = [
  { id: '1', title: 'Fast-Paced Vlog Intro', category: 'Lifestyle', thumbnail: 'https://picsum.photos/300/500?random=101', author: 'AlexMedia', downloads: '12k', isPro: false },
  { id: '2', title: 'Cinematic Travel Reel', category: 'Travel', thumbnail: 'https://picsum.photos/300/500?random=102', author: 'WanderLust', downloads: '8.5k', isPro: true },
  { id: '3', title: 'Tech Review Minimal', category: 'Tech', thumbnail: 'https://picsum.photos/300/500?random=103', author: 'TechGuru', downloads: '22k', isPro: false },
  { id: '4', title: 'Fitness Challenge', category: 'Health', thumbnail: 'https://picsum.photos/300/500?random=104', author: 'FitFam', downloads: '5k', isPro: true },
  { id: '5', title: 'Product Showcase', category: 'Business', thumbnail: 'https://picsum.photos/300/500?random=105', author: 'PromoKing', downloads: '3k', isPro: true },
  { id: '6', title: 'Storytime Format', category: 'Education', thumbnail: 'https://picsum.photos/300/500?random=106', author: 'EduTok', downloads: '45k', isPro: false },
];

const TemplateMarketplace: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Template Marketplace</h2>
          <p className="text-slate-400">1,000+ Viral Templates for TikTok, Reels, and Shorts.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="bg-surface border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white outline-none focus:border-primary w-64"
            />
          </div>
          <button className="p-2 bg-surface border border-white/10 rounded-lg text-slate-300 hover:text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
        {['All', 'Trending', 'Lifestyle', 'Tech', 'Business', 'Travel', 'Education'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat ? 'bg-white text-black' : 'bg-surface border border-white/10 text-slate-300 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockTemplates.map(template => (
          <div key={template.id} className="group relative rounded-xl overflow-hidden aspect-[9/16] bg-surface border border-white/5 hover:border-primary/50 transition-all">
             <img src={template.thumbnail} alt={template.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
             
             <div className="absolute top-2 right-2">
               {template.isPro && <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-primary/50">PRO</span>}
             </div>

             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
               <h3 className="text-white font-bold text-sm mb-1">{template.title}</h3>
               <div className="flex justify-between items-center text-xs text-slate-300 mb-3">
                 <span>{template.author}</span>
                 <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {template.downloads}</span>
               </div>
               <button className="w-full py-2 bg-primary text-white text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <PlayCircle className="w-4 h-4" /> Use Template
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateMarketplace;