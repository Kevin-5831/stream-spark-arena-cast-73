
import { useState } from 'react';
import { Camera, Clock, Menu, Download } from 'lucide-react';
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
        <div className="absolute bottom-5 left-5 w-48">
          <div className="mb-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="h-2 bg-slate-700 rounded-full mb-2">
            <div className="h-full w-3/4 bg-green-400 rounded-full"></div>
          </div>
          <div className="text-xs text-white space-y-1">
            <div>Monitoramento de taxa de upload: {stats.bitrate}</div>
            <div>Monitoramento de frames: {stats.fps}</div>
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
