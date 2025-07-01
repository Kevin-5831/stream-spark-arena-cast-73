
import { Play, Search } from 'lucide-react';

interface VideoPreviewProps {
  isStreaming: boolean;
  activeSource: string;
}

const VideoPreview = ({ isStreaming, activeSource }: VideoPreviewProps) => {
  return (
    <div className="h-full bg-slate-800 rounded-lg relative overflow-hidden">
      {/* Preview Area with light cream background */}
      <div className="w-full h-full flex items-center justify-center relative" style={{ backgroundColor: '#f5f5dc' }}>
        {/* Basketball Court Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-teal-600 rounded-full"></div>
        </div>
        <div className="absolute bottom-4 left-4 w-24 h-16 border-4 border-teal-600 rounded-t-full"></div>
        <div className="absolute bottom-4 right-4 w-24 h-16 border-4 border-teal-600 rounded-t-full"></div>
        
        {/* Player Figure */}
        <div className="absolute bottom-8 right-12 w-4 h-4 bg-slate-800 rounded-full"></div>
        
        {/* Stream Status Overlay */}
        {isStreaming && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            AO VIVO
          </div>
        )}
        
        {/* Active Source Label */}
        <div className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded text-sm">
          {activeSource}
        </div>
        
        {/* Play Button (when not streaming) */}
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-green-400 ml-1" />
            </div>
          </div>
        )}
        
        {/* Zoom Slider - Right Edge */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-36">
          <div className="w-1 h-full bg-white rounded-full relative">
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
