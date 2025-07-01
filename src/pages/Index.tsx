
import { useState, useEffect } from 'react';
import { Camera, Clock, Menu, Download, Mic } from 'lucide-react';
import SourceCard from '../components/SourceCard';
import ShortcutButton from '../components/ShortcutButton';
import MonitoringIndicator from '../components/MonitoringIndicator';
import StreamButton from '../components/StreamButton';
import VideoPreview from '../components/VideoPreview';

const Index = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSource, setActiveSource] = useState(0);
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
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const sources = [
    { id: 0, name: 'CAMERA CELULAR', isActive: true },
    { id: 1, name: 'CAMERA USB', isActive: false },
    { id: 2, name: 'NAVEGADOR WEB - SINGULAR', isActive: false },
    { id: 3, name: 'XXXX', isActive: false }
  ];

  const handleSourceSelect = (sourceId: number) => {
    setActiveSource(sourceId);
  };

  const handleStreamToggle = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="text-center mb-4">
          <h2 className="text-sm text-gray-400 mb-3">
            Botões de atalho personalizáveis com informação se está no ar ou offline
          </h2>
          {/* Fixed Header Layout: 1 button left + 4 buttons right */}
          <div className="flex justify-between items-center">
            <div>
              <ShortcutButton
                icon={Camera}
                label="Profile"
                isActive={isStreaming}
              />
            </div>
            <div className="flex gap-4">
              <ShortcutButton
                icon={Clock}
                label="Timer"
                isActive={isStreaming}
              />
              <ShortcutButton
                icon={Menu}
                label="FX"
                isActive={isStreaming}
              />
              <ShortcutButton
                icon={Download}
                label="Download"
                isActive={isStreaming}
              />
              <ShortcutButton
                icon={Menu}
                label="Menu"
                isActive={isStreaming}
              />
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
    </div>
  );
};

export default Index;
