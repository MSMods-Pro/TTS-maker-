import { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Square, Download, Settings2, Languages, Type, Clock, Info, Shield, Github, Sparkles, AlertCircle, User, Volume2, BookA, Plus, Trash2, Zap, FileText, Maximize2, Minimize2, Mic, Activity, ChevronDown, ChevronUp, Copy, CheckCircle2, Undo2, Redo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SUPPORTED_VOICES } from './voices';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

export default function App() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleTextChange = (newText: string) => {
    setText(newText);
    // Debounce or only save history occasionally? For simple use, save every edit.
    // To prevent huge memory, maybe only push if different and let's not worry about per-keystroke performance unless it lags.
    // A better approach for textareas is to push to history on blur, or specific actions (paste, template).
    // Let's just do a simple push for explicit actions, and keep `text` state updated on change.
  };

  const pushToHistory = (newText: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setText(newText);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
    }
  };
  const [language, setLanguage] = useState('en');
  const [voice, setVoice] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all'|'male'|'female'>('all');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [volume, setVolume] = useState(1);
  const [replacements, setReplacements] = useState<{from: string, to: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const availableVoices = useMemo(() => {
    return SUPPORTED_VOICES.filter(v => v.languageCode === language);
  }, [language]);

  // Set default voice when language changes
  useEffect(() => {
    if (availableVoices.length > 0) {
      // Try to select a natural male voice by default if available, otherwise first voice
      const defaultVoice = availableVoices.find(v => v.gender === 'male') || availableVoices[0];
      setVoice(defaultVoice.id);
    } else {
      setVoice('');
    }
  }, [language, availableVoices]);

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const processTextWithReplacements = (inputText: string) => {
    let result = inputText;
    replacements.forEach(r => {
      if (r.from.trim() && r.to.trim()) {
        // Simple global replacement (case-insensitive for convenience)
        try {
          const regex = new RegExp(`\\b${r.from.trim()}\\b`, 'gi');
          result = result.replace(regex, r.to.trim());
        } catch {
          // Fallback if invalid regex chars
          result = result.split(r.from.trim()).join(r.to.trim());
        }
      }
    });
    return result;
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate speech.');
      return;
    }

    if (charCount > 50000) {
      setError('Text exceeds the maximum length of 50000 characters for a single request.');
      return;
    }

    if (!voice) {
      setError('Please select a voice first.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      const finalText = processTextWithReplacements(text);
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: finalText, lang: language, voice, speed, pitch, volume }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.details ? `${data.error} (${data.details})` : (data?.error || 'Failed to generate audio. Please try again.'));
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("TTS provider returned empty audio data.");
      }
      
      const url = URL.createObjectURL(blob);
      
      // Validate audio duration
      const audio = new Audio(url);
      await new Promise((resolve, reject) => {
        audio.onloadedmetadata = () => {
          if (audio.duration > 0) {
            resolve(true);
          } else {
            reject(new Error("Generated audio is empty or has 0 duration."));
          }
        };
        audio.onerror = () => {
          reject(new Error("Generated audio could not be decoded."));
        };
      });

      setAudioUrl(url);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = async (previewVoiceId: string) => {
    if (previewingVoice) return; // Prevent multiple previews
    
    setPreviewingVoice(previewVoiceId);
    
    const sampleTexts: Record<string, string> = {
      'en': 'Hello! This is a VoiceForge AI voice preview.',
      'hi': 'नमस्ते! यह VoiceForge AI की आवाज़ का परीक्षण है।',
      'bn': 'হ্যালো! এটি VoiceForge AI ভয়েসের একটি পরীক্ষা।',
      'es': '¡Hola! Esta es una prueba de voz de VoiceForge AI.',
      'fr': 'Bonjour ! Ceci est un test vocal de VoiceForge AI.',
      'de': 'Hallo! Dies ist ein Sprachtest von VoiceForge AI.',
      'ja': 'こんにちは！これはVoiceForge AIの音声テストです。',
      'ko': '안녕하세요! 이것은 VoiceForge AI 음성 테스트입니다.',
    };

    const sampleText = sampleTexts[language] || 'Hello! This is a voice preview.';

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sampleText, lang: language, voice: previewVoiceId, speed, pitch, volume }),
      });

      if (!response.ok) throw new Error('Preview failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        URL.revokeObjectURL(previewAudioRef.current.src);
      }
      
      const audio = new Audio(url);
      previewAudioRef.current = audio;
      
      audio.onended = () => setPreviewingVoice(null);
      audio.onerror = () => setPreviewingVoice(null);
      
      await audio.play();
    } catch (err) {
      console.error('Preview error:', err);
      setPreviewingVoice(null);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `VoiceForge_${language}_${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    setText('');
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setError(null);
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="hidden sm:block absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Navigation */}
      <nav className="border-b border-neutral-800/80 bg-neutral-900/50 backdrop-blur-xl z-50 shrink-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.15)]">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">VoiceForge AI</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-neutral-900/50 p-1 rounded-xl border border-neutral-800/50">
            <button className="px-4 py-1.5 text-sm font-medium bg-neutral-800 text-white rounded-lg shadow-sm">Create</button>
            <button className="px-4 py-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800/50">Voice Library</button>
            <button className="px-4 py-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800/50">My Generations</button>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
              <Shield className="w-3.5 h-3.5" />
              100% Free • No Login Required
            </span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        <div className="max-w-[1600px] mx-auto w-full h-full p-3 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6">

          <div className={`flex flex-col gap-4 sm:gap-6 ${isFocusMode ? '' : 'lg:flex-row'}`}>
            
            {/* Left Column: Script Editor */}
            <motion.div 
              layout
              className={`flex-1 flex flex-col min-h-[55vh] bg-neutral-900/40 border border-neutral-800/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 ${isFocusMode ? 'min-h-[75vh]' : ''}`}
            >
              {/* Editor Top Bar */}
              <div className="bg-neutral-900/60 border-b border-neutral-800/60 p-3 sm:p-4 sm:px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white leading-tight">Script Studio</h2>
                    <p className="text-xs text-neutral-500">Write or paste your text and turn it into natural AI speech.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  
                  <button 
                    onClick={handleUndo}
                    disabled={historyIndex === 0}
                    className={`p-2 rounded-lg transition-colors ${historyIndex === 0 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                    title="Undo"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleRedo}
                    disabled={historyIndex === history.length - 1}
                    className={`p-2 rounded-lg transition-colors ${historyIndex === history.length - 1 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                    title="Redo"
                  >
                    <Redo2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        const clipText = await navigator.clipboard.readText();
                        pushToHistory(text + (text.endsWith(' ') || text === '' ? '' : ' ') + clipText);
                      } catch (err) {
                        console.error('Failed to read clipboard contents: ', err);
                      }
                    }}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Paste from Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      handleClear();
                      pushToHistory('');
                    }}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Clear Script"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-neutral-800 mx-1"></div>
                  <button 
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isFocusMode ? 'bg-indigo-500/20 text-indigo-300' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
                  </button>
                </div>
              </div>

              {/* Templates Bar */}
              <div className="px-6 py-3 border-b border-neutral-800/40 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0 bg-neutral-900/30">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mr-2 shrink-0">Script Templates:</span>
                <button 
                  onClick={() => pushToHistory("Welcome back to the channel! ...  Today, we're diving into something truly amazing. ...  Don't forget to like and subscribe.")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  YouTube
                </button>
                <button 
                  onClick={() => pushToHistory("In 1969, humanity achieved the impossible. ...  Apollo 11 landed on the moon. ...  But what happened next... might surprise you.")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Documentary
                </button>
                <button 
                  onClick={() => pushToHistory("Top 3 facts about space! ...  Number one: Space is completely silent. ...  Number two...")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Shorts / Reels
                </button>
                <button 
                  onClick={() => pushToHistory("Once upon a time, in a digital realm far away, ...  there lived an AI who wanted to tell stories.")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Storytelling
                </button>
                <button 
                  onClick={() => pushToHistory("Welcome to today's episode. ...  We have a fascinating topic to discuss.")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Podcast
                </button>
                <button 
                  onClick={() => pushToHistory("Let's explore the fundamental principles of physics. ...  First, we'll look at gravity.")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Educational
                </button>
                <button 
                  onClick={() => pushToHistory("In a world where magic is forbidden, ...  one young hero must discover their hidden power. ...  Will they survive?")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Anime Narration
                </button>
                <button 
                  onClick={() => pushToHistory("Breaking news this hour: ...  Global markets have responded unexpectedly to the latest economic reports.")}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  News
                </button>
              </div>

              {/* Text Area */}
              <div className="relative flex-1 flex flex-col bg-neutral-950/20 group">
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  onBlur={() => {
                    if (text !== history[historyIndex]) {
                      pushToHistory(text);
                    }
                  }}
                  placeholder="Paste or write your script here..."
                  className="w-full flex-1 bg-transparent hover:bg-neutral-950/40 focus:bg-neutral-950/60 transition-colors resize-none outline-none p-6 text-lg sm:text-xl leading-relaxed text-neutral-200 placeholder:text-neutral-600 custom-scrollbar border-2 border-transparent focus:border-indigo-500/20"
                  spellCheck={false}
                />
              </div>

              {/* Editor Bottom Stats */}
              <div className="bg-neutral-900/60 border-t border-neutral-800/60 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-4 shrink-0 text-xs font-medium text-neutral-500">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    {wordCount.toLocaleString()} words
                  </span>
                  <span className="flex items-center gap-1.5">
                    {charCount.toLocaleString()} characters
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Estimated Duration: {Math.floor(wordCount / 150 / speed)}:{(Math.ceil((wordCount / 150 / speed * 60) % 60)).toString().padStart(2, '0')}
                  </span>
                </div>
                {charCount > 50000 && (
                  <span className="text-red-400 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Limit Exceeded (50K max)
                  </span>
                )}
              </div>
            </motion.div>

            {/* Right Column: Settings & Generate */}
            <AnimatePresence>
              {!isFocusMode && (
                <motion.div 
                  initial={{ opacity: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, marginLeft: 0 }}
                  exit={{ opacity: 0, marginLeft: 0 }}
                  className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col gap-6"
                >
                  {/* Voice Settings Box */}
                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col">
                    <div className="p-5 border-b border-neutral-800/60 bg-neutral-900/60">
                      <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-400" />
                        Choose a Voice
                      </h3>
                    </div>
                    
                    <div className="p-5 space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-neutral-400">Language</label>
                          <div className="relative">
                            <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="w-full bg-neutral-950/50 border border-neutral-800/80 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-200 outline-none hover:border-neutral-700 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                            >
                              {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.code} value={lang.code} className="bg-neutral-900">{lang.name}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-neutral-400">Gender</label>
                          <div className="flex bg-neutral-950/50 p-1 rounded-xl border border-neutral-800/80">
                            {(['all', 'male', 'female'] as const).map(g => (
                              <button
                                key={g}
                                onClick={() => setGenderFilter(g)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                                  genderFilter === g ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                              >
                                {g === 'all' ? 'All' : g === 'male' ? 'M' : 'F'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-neutral-400 flex justify-between">
                          <span>Choose a Voice</span>
                          <span className="text-neutral-600">{availableVoices.filter(v => genderFilter === 'all' || v.gender === genderFilter).length}</span>
                        </label>
                        <div className="space-y-2 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
                          {availableVoices.filter(v => genderFilter === 'all' || v.gender === genderFilter).map((v) => (
                            <div 
                              key={v.id} 
                              onClick={() => v.isAvailable !== false && setVoice(v.id)}
                              className={`relative p-3 rounded-xl border transition-all ${v.isAvailable === false ? 'opacity-50 cursor-not-allowed bg-neutral-950/20 border-neutral-800/30' : voice === v.id ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[inset_0_0_20px_rgba(79,70,229,0.05)] cursor-pointer' : 'bg-neutral-950/40 border-neutral-800/50 hover:border-neutral-700 cursor-pointer'}`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-white">{v.gender === 'female' ? '👩' : '👨'} {v.name}</span>
                                  {v.isAvailable === false && <span className="text-[10px] uppercase font-bold bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">Coming Soon</span>}
                                </div>
                                {v.isAvailable !== false && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handlePreview(v.id); }}
                                    className={`p-1.5 rounded-lg transition-colors ${previewingVoice === v.id ? 'bg-indigo-500/20 text-indigo-400' : 'text-neutral-500 hover:text-indigo-400 hover:bg-indigo-500/10'}`}
                                    title="Preview Voice"
                                  >
                                    {previewingVoice === v.id ? <div className="w-4 h-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" /> : <Volume2 className="w-4 h-4" />}
                                  </button>
                                )}
                              </div>
                              <div className="text-xs text-neutral-400 font-medium">
                                {v.gender === 'male' ? 'Male' : 'Female'} • {v.character || 'Clear • Standard'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Advanced Controls Toggle */}
                      <button 
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="w-full py-3 px-4 bg-neutral-950/30 border border-neutral-800/50 rounded-xl flex items-center justify-between text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Settings2 className="w-4 h-4 text-indigo-400" />
                          Voice Controls
                        </span>
                        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* Expandable Advanced Controls */}
                      <AnimatePresence>
                        {showAdvanced && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pb-2 space-y-5 border-t border-neutral-800/50">
                              
                              {/* Speed Slider */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-neutral-400">Speed</span>
                                  <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">{speed.toFixed(2)}x</span>
                                </div>
                                <input type="range" min="0.5" max="2.0" step="0.05" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer" />
                              </div>

                              {/* Pitch Slider */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-neutral-400">Pitch</span>
                                  <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">{pitch > 0 ? '+' : ''}{pitch}Hz</span>
                                </div>
                                <input type="range" min="-50" max="50" step="1" value={pitch} onChange={(e) => setPitch(parseInt(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer" />
                              </div>

                              {/* Volume Slider */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-neutral-400">Volume</span>
                                  <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">{Math.round(volume * 100)}%</span>
                                </div>
                                <input type="range" min="0.1" max="2.0" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer" />
                              </div>

                              {/* Pronunciation Dictionary Mini */}
                              <div className="pt-3 border-t border-neutral-800/50 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-medium text-neutral-400 flex items-center gap-2">
                                    <BookA className="w-4 h-4" />
                                    Pronunciation Fixes
                                  </span>
                                  <button onClick={() => setReplacements([...replacements, { from: '', to: '' }])} className="text-indigo-400 hover:text-indigo-300 p-1 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-md transition-colors"><Plus className="w-4 h-4" /></button>
                                </div>
                                
                                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                                  {replacements.map((r, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <input type="text" placeholder="Word" value={r.from} onChange={e => { const newR = [...replacements]; newR[i].from = e.target.value; setReplacements(newR); }} className="w-1/2 bg-neutral-950/50 text-xs text-neutral-200 border border-neutral-800/80 rounded-lg px-2 py-1.5 outline-none" />
                                      <span className="text-neutral-600">→</span>
                                      <input type="text" placeholder="Sounds like" value={r.to} onChange={e => { const newR = [...replacements]; newR[i].to = e.target.value; setReplacements(newR); }} className="w-1/2 bg-neutral-950/50 text-xs text-indigo-300 border border-neutral-800/80 rounded-lg px-2 py-1.5 outline-none" />
                                      <button onClick={() => { const newR = [...replacements]; newR.splice(i, 1); setReplacements(newR); }} className="text-neutral-500 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                  ))}
                                  {replacements.length === 0 && (
                                    <p className="text-xs text-neutral-500 text-center py-2">No custom pronunciations.</p>
                                  )}
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Error Notification inside side panel */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3 shadow-lg"
                      >
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-300 leading-relaxed">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Generate Button Box */}
                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-5 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-1">
                      <span>Ready to generate</span>
                      <span className="text-indigo-400">{wordCount} words</span>
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !text.trim() || charCount > 50000}
                      className={`relative overflow-hidden group flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl ${
                        isGenerating || !text.trim() || charCount > 50000
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
                          : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-400 hover:to-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] border border-indigo-400/20'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span className="tracking-wide">Generating Speech...</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          <span className="tracking-wide">Generate Speech</span>
                        </>
                      )}
                      
                      {/* Button shine effect */}
                      {!isGenerating && text.trim() && charCount <= 50000 && (
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>

          {/* Generated Audio Player */}
          <AnimatePresence>
            {audioUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-neutral-900/60 border border-neutral-800/60 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-6 mt-auto"
              >
                <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
                  <div className="bg-green-500/10 p-3 rounded-2xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Audio Result</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{availableVoices.find(v => v.id === voice)?.name} • {speed}x Speed</p>
                  </div>
                </div>

                <div className="flex-1 w-full bg-neutral-950/50 p-2 pr-4 rounded-xl border border-neutral-800/50 flex items-center">
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    controls
                    className="w-full h-12 filter invert grayscale opacity-80"
                    controlsList="nodownload noplaybackrate"
                  />
                </div>

                <div className="w-full md:w-auto flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleDownload}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 text-sm font-medium bg-neutral-800 text-white px-6 py-3 rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700/50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Audio</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </main>
    </div>
  );
}
