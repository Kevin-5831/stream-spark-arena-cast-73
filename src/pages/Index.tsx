import { useState, useEffect } from 'react';
import { Camera, Menu, ReplyIcon, Mic } from 'lucide-react';
import SourceCard from '../components/SourceCard';
import ShortcutButton from '../components/ShortcutButton';
import StreamButton from '../components/StreamButton';
import VideoPreview from '../components/VideoPreview';
import QuickAccessMenu from '../components/QuickAccessMenu';
import ProModeMenu from '../components/ProModeMenu';

const Index = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSource, setActiveSource] = useState(0);
  const [isQuickAccessOpen, setIsQuickAccessOpen] = useState(false);
  const [isProModeOpen, setIsProModeOpen] = useState(false);
  const [stats, setStats] = useState({
    bitrate: '6000kbps',
    fps: '30fps',
    audioLevel: 75
  });

  // Realistic audio level animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        audioLevel: Math.floor(Math.random() * 40) + 50 // Random between 50-90%
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const sources = [
    { id: 0, name: 'CAMERA CELULAR', isActive: true },
    { id: 1, name: 'CAMERA USB', isActive: true },
    { id: 2, name: 'NAVEGADOR WEB - SINGULAR', isActive: true },
    { id: 3, name: 'XXXX', isActive: true }
  ];

  const handleSourceSelect = (sourceId: number) => {
    setActiveSource(sourceId);
  };

  const handleStreamToggle = () => {
    setIsStreaming(!isStreaming);
  };

  const handleQuickAccessToggle = () => {
    setIsQuickAccessOpen(!isQuickAccessOpen);
    setIsProModeOpen(false);
  };

  const handleProModeOpen = () => {
    setIsQuickAccessOpen(false);
    setIsProModeOpen(true);
  };

  const handleProModeClose = () => {
    setIsProModeOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="text-center mb-4">
          
          {/* Updated Header Layout: 50% width for left section, 50% width for right section */}
          <div className="flex">
            {/* Left Section - 50% width */}
            <div className="w-1/2 flex justify-start">
              <ShortcutButton
                icon={Camera}
                label="User"
                isActive={isStreaming}
              />
            </div>
            
            {/* Right Section - 50% width */}
            <div className="w-1/2 flex justify-between gap-2">
              <ShortcutButton
                icon={ReplyIcon}
                label="Replay"
                isActive={isStreaming}
              />
              <ShortcutButton
                icon={Mic}
                label="Fx"
                isActive={isStreaming}
              />
              <ShortcutButton
                icon={Mic}
                label="Standard"
                isActive={isStreaming}
              />
              <ShortcutButton
                icon={Camera}
                label="Standard"
                isActive={isStreaming}
              />
              <button
                onClick={handleQuickAccessToggle}
                className="flex flex-col items-center gap-1 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isQuickAccessOpen ? 'bg-green-400' : 'bg-green-500 hover:bg-green-400'
                }`}>
                  <Menu className="w-6 h-6 text-slate-900" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Source Panel */}
        <div className="w-48 p-4 border-r border-slate-700">
          <div className="space-y-3">
            {sources.map((source) => (
              <SourceCard
                key={source.id}
                name={source.name}
                isOnAir={source.id === activeSource && isStreaming}
                isSelected={source.id === activeSource}
                onClick={() => handleSourceSelect(source.id)}
              />
            ))}
          </div>
        </div>

        {/* Central Video Preview */}
        <div className="flex-1 p-4">
          <VideoPreview 
            isStreaming={isStreaming}
            activeSource={sources[activeSource].name}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700 p-4 relative">
        {/* Audio Monitoring Widget - Left Side */}
        <div className="absolute bottom-5 left-5">
          {/* Microphone Icon and Audio Bar on Same Line */}
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-green-400" />
            <div 
              className="rounded-full relative overflow-hidden"
              style={{ 
                width: '120px', 
                height: '6px',
                background: 'linear-gradient(to right, #ef4444, #eab308, #22c55e)'
              }}
            >
              <div 
                className="h-full bg-slate-700 absolute right-0"
                style={{ 
                  width: `${100 - stats.audioLevel}%`,
                  transition: 'width 0.1s ease-out'
                }}
              />
            </div>
          </div>
          
          {/* Stats on Same Line */}
          <div className="flex justify-between text-white" style={{ fontSize: '10px', width: '120px', marginLeft: '24px' }}>
            <span>{stats.bitrate}</span>
            <span>{stats.fps}</span>
          </div>
        </div>

        {/* Centered Stream Control Button */}
        <div className="flex justify-center">
          <StreamButton
            isStreaming={isStreaming}
            onToggle={handleStreamToggle}
          />
        </div>
      </div>

      {/* Overlay Components */}
      <QuickAccessMenu
        isOpen={isQuickAccessOpen}
        onClose={() => setIsQuickAccessOpen(false)}
        onProModeClick={handleProModeOpen}
      />
      
      <ProModeMenu
        isOpen={isProModeOpen}
        onClose={handleProModeClose}
      />
    </div>
  );
};

export default Index;