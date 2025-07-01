
import { Play, ZoomIn, ZoomOut } from 'lucide-react';

interface VideoPreviewProps {
  isStreaming: boolean;
  activeSource: string;
}

const VideoPreview = ({ isStreaming, activeSource }: VideoPreviewProps) => {
  return (
    <div className="h-full bg-slate-800 rounded-lg relative overflow-hidden">
      {/* Preview Area */}
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Placeholder Basketball Court */}
        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg relative">
          {/* Basketball Court Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-teal-600 rounded-full"></div>
          </div>
          <div className="absolute bottom-4 left-4 w-24 h-16 border-4 border-teal-600 rounded-t-full"></div>
          <div className="absolute bottom-4 right-4 w-24 h-16 border-4 border-teal-600 rounded-t-full"></div>
          
          {/* Player Figure */}
          <div className="absolute bottom-8 right-12 w-4 h-4 bg-slate-800 rounded-full"></div>
        </div>
        
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
      </div>
      
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button className="w-8 h-8 bg-slate-900/80 rounded flex items-center justify-center text-white hover:bg-slate-800 transition-colors">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 bg-slate-900/80 rounded flex items-center justify-center text-white hover:bg-slate-800 transition-colors">
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;
