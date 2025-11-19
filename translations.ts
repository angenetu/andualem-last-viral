
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'am';

const translations = {
  en: {
    // Sidebar
    dashboard: 'Dashboard',
    scriptGen: 'Script Gen',
    aiVideo: 'Vo3 Video Studio', // Updated for emphasis
    thumbnails: 'Thumbnails',
    editor: 'Studio Editor',
    growthEngine: 'Growth Engine',
    liveCoach: 'Live Coach',
    strategyAgent: 'Strategy Agent',
    autoPilot: 'AI Auto-Pilot (24/7)',
    templates: 'Templates',
    profile: 'My Profile',
    admin: 'Admin',
    upgrade: 'Upgrade Now',
    proPlan: 'Pro Plan',
    create: 'Create',
    grow: 'Grow',
    platform: 'Platform',
    unlockPro: 'Unlock Vo3 & Gemini 3 Pro',
    
    // Header
    searchPlaceholder: 'Search projects, templates, or assets...',
    proCreator: 'Pro Creator',
    
    // Dashboard
    hello: 'Hello',
    viralPotential: 'Your viral potential is looking high today.',
    viewAnalytics: 'View Analytics',
    createNew: 'Create New',
    totalViews: 'Total Views',
    subscribers: 'Subscribers',
    viralScore: 'Viral Score',
    last30Days: 'Last 30 days',
    newProject: 'New Project',
    startNew: 'Start from scratch or AI',
    recentProjects: 'Recent Projects',
    viewAll: 'View All',
    startNewProject: 'Start new project',
    growthAnalytics: 'Growth Analytics',
    
    // Landing
    heroTitle: 'Dominate the Algorithm',
    heroTitleHighlight: 'With AI Precision',
    heroSubtitle: 'The comprehensive platform for creators. Generate scripts, create videos, and predict viral trends using the world\'s most advanced AI models.',
    launchApp: 'Launch App',
    seeAction: 'See It In Action',
    poweredBy: 'Powered by Gemini 2.5 Flash & Vo3',
    featuresTitle: 'Superpowers for Creators',
    featuresSubtitle: 'Replace your entire production studio with one intelligent interface.',
    
    // Features
    feature1Title: 'Instant Viral Scripts',
    feature1Desc: 'Gemini 2.5 Flash generates hooks, bodies, and CTAs that are mathematically proven to retain attention.',
    feature2Title: 'Vo3 Video Generation',
    feature2Desc: 'Text-to-video that looks indistinguishable from reality. Create B-roll without a camera.',
    feature3Title: 'Growth Prediction',
    feature3Desc: 'Real-time Google Search grounding tells you exactly what topics are spiking right now.',
    feature4Title: 'AI Auto-Edit',
    feature4Desc: 'Upload raw chaos, get a polished masterpiece. Silence removed, music synced, captions added.',
    feature5Title: 'Interactive Coach',
    feature5Desc: 'Talk to your strategy agent in real-time. Brainstorm ideas while you drive or cook.',
    feature6Title: 'Thumbnail Magic',
    feature6Desc: 'Generate high-CTR thumbnails with Imagen 3 and edit them with natural language.',

    // AutoPilot
    autoPilotTitle: '24/7 Content Auto-Pilot',
    autoPilotDesc: 'Automatically generate and schedule 24 videos per day to dominate all platforms.',
    generatePlan: 'Generate 24h Plan',
    activateAutoPilot: 'Activate Auto-Posting',
    
    footerRights: 'All rights reserved.',
    designedBy: 'Designed & Built by'
  },
  am: {
    // Sidebar
    dashboard: 'ዳሽቦርድ',
    scriptGen: 'ስክሪፕት ጄኔሬተር',
    aiVideo: 'Vo3 ቪዲዮ ስቱዲዮ', // Updated
    thumbnails: 'ተምኔሎች',
    editor: 'ስቱዲዮ ኤዲተር',
    growthEngine: 'የእድገት ሞተር',
    liveCoach: 'ቀጥታ አሰልጣኝ',
    strategyAgent: 'ስትራቴጂ ወኪል',
    autoPilot: 'AI ራስ-ሰር አብራሪ (24/7)',
    templates: 'ቴምፕሌቶች',
    profile: 'የእኔ መገለጫ',
    admin: 'አስተዳዳሪ',
    upgrade: 'አሁን ያሻሽሉ',
    proPlan: 'ፕሮ ዕቅድ',
    create: 'ፍጠር',
    grow: 'አሳድግ',
    platform: 'መድረክ',
    unlockPro: 'Vo3 እና Gemini 3 Proን ይክፈቱ',
    
    // Header
    searchPlaceholder: 'ፕሮጀክቶችን፣ ቴምፕሌቶችን ወይም ንብረቶችን ይፈልጉ...',
    proCreator: 'ፕሮ ፈጣሪ',
    
    // Dashboard
    hello: 'ሰላም',
    viralPotential: 'የቫይራል የመሆን እድልዎ ዛሬ ከፍተኛ ይመስላል።',
    viewAnalytics: 'ትንታኔዎችን ይመልከቱ',
    createNew: 'አዲስ ይፍጠሩ',
    totalViews: 'ጠቅላላ ዕይታዎች',
    subscribers: 'ተመዝጋቢዎች',
    viralScore: 'ቫይራል ውጤት',
    last30Days: 'ባለፉት 30 ቀናት',
    newProject: 'አዲስ ፕሮጀክት',
    startNew: 'ከመጀመሪያው ወይም በ AI ይጀምሩ',
    recentProjects: 'የቅርብ ጊዜ ፕሮጀክቶች',
    viewAll: 'ሁሉንም ይመልከቱ',
    startNewProject: 'አዲስ ፕሮጀክት ይጀምሩ',
    growthAnalytics: 'የእድገት ትንታኔ',
    
    // Landing
    heroTitle: 'አልጎሪዝሙን ይቆጣጠሩ',
    heroTitleHighlight: 'በ AI ትክክለኛነት',
    heroSubtitle: 'ለፈጣሪዎች የተሟላ መድረክ። ስክሪፕቶችን ይፍጠሩ፣ ቪዲዮዎችን ያዘጋጁ እና የቫይራል አዝማሚያዎችን ይተንብዩ።',
    launchApp: 'መተግበሪያውን ይጀምሩ',
    seeAction: 'በተግባር ይመልከቱት',
    poweredBy: 'በ Gemini 2.5 Flash እና Vo3 የተጎላበተ',
    featuresTitle: 'ለፈጣሪዎች ልዕለ ኃያላን',
    featuresSubtitle: 'ሙሉ የማምረቻ ስቱዲዮዎን በአንድ ብልህ በይነገጽ ይተኩ።',
    
    // Features
    feature1Title: 'ፈጣን ቫይራል ስክሪፕቶች',
    feature1Desc: 'Gemini 2.5 Flash ትኩረትን ለመሳብ በሂሳብ የተረጋገጡ መንጠቆዎችን፣ ዋና አካልን እና ጥሪዎችን ያመነጫል።',
    feature2Title: 'Vo3 ቪዲዮ አመንጪ',
    feature2Desc: 'ከእውነታው የማይለይ ጽሑፍ-ወደ-ቪዲዮ። ያለ ካሜራ B-roll ይፍጠሩ።',
    feature3Title: 'የእድገት ትንበያ',
    feature3Desc: 'የእውነተኛ ጊዜ የGoogle ፍለጋ መረጃ ምን ርዕሶች አሁን እንደሆኑ በትክክል ይነግርዎታል።',
    feature4Title: 'AI ራስ-አርትዖት',
    feature4Desc: 'ጥሬ ቀረጻ ይስቀሉ፣ የተስተካከለ ድንቅ ስራ ያግኙ። ዝምታ ተወግዷል፣ ሙዚቃ ተቀናጅቷል፣ መግለጫ ጽሑፎች ታክለዋል።',
    feature5Title: 'በይነተገናኝ አሰልጣኝ',
    feature5Desc: 'ከእርስዎ ስትራቴጂ ወኪል ጋር በእውነተኛ ጊዜ ይነጋገሩ። በሚያሽከረክሩበት ወይም በሚያበስሉበት ጊዜ ሀሳቦችን ያፈልቁ።',
    feature6Title: 'የተምኔል ምጂክ',
    feature6Desc: 'በ Imagen 3 ከፍተኛ-CTR ተምኔሎችን ይፍጠሩ እና በተፈጥሮ ቋንቋ ያርትዑዋቸው።',
    
    // AutoPilot
    autoPilotTitle: '24/7 የይዘት አውቶ ፓይለት',
    autoPilotDesc: 'ለሁሉም መድረኮች በቀን 24 ቪዲዮዎችን በራስ-ሰር ያመንጩ እና ያቅዱ።',
    generatePlan: 'የ24 ሰዓት ዕቅድ አውጣ',
    activateAutoPilot: 'ራስ-ሰር መለጠፍን ያግብሩ',

    footerRights: 'መብቱ በህግ የተጠበቀ ነው።',
    designedBy: 'የተነደፈው እና የተገነባው በ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
