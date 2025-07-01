
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

  const shortcuts = [
    { icon: Camera, label: 'Profile' },
    { icon: Clock, label: 'Timer' },
    { icon: Menu, label: 'FX' },
    { icon: Download, label: 'Download' },
    { icon: Menu, label: 'Menu' }
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
          <div className="flex justify-center gap-4">
            {shortcuts.map((shortcut, index) => (
              <ShortcutButton
                key={index}
                icon={shortcut.icon}
                label={shortcut.label}
                isActive={isStreaming}
              />
            ))}
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
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center justify-between">
          {/* Monitoring Panel */}
          <div className="flex gap-8">
            <MonitoringIndicator
              label="Monitoramento de áudio"
              value={`${stats.audioLevel}%`}
              isActive={isStreaming}
            />
            <MonitoringIndicator
              label="Monitoramento de frames"
              value={stats.fps}
              isActive={isStreaming}
            />
            <MonitoringIndicator
              label="Monitoramento de taxa de upload"
              value={stats.bitrate}
              isActive={isStreaming}
            />
          </div>

          {/* Stream Control Button */}
          <div className="flex-1 max-w-md ml-8">
            <StreamButton
              isStreaming={isStreaming}
              onToggle={handleStreamToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
