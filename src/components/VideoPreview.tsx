
import { Play, Search } from 'lucide-react';
import { useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import basketballCourtImage from '../assets/basketball-court.jpg';

interface VideoPreviewProps {
  isStreaming: boolean;
  activeSource: string;
}

const VideoPreview = ({ isStreaming, activeSource }: VideoPreviewProps) => {
  const [zoom, setZoom] = useState(1);
  const [sliderPosition, setSliderPosition] = useState(0.5); // 0 to 1
  const sliderRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef(0.5);

  const bind = useDrag(
    ({ movement: [, my], first }) => {
      if (first) {
        initialPositionRef.current = sliderPosition;
      }
      
      const sliderHeight = 120;
      const newPosition = Math.max(0, Math.min(1, initialPositionRef.current + my / sliderHeight));
      
      setSliderPosition(newPosition);
      
      // Convert slider position to zoom (inverted: top = zoom in, bottom = zoom out)
      const newZoom = 0.5 + (1 - newPosition) * 1.5; // Range from 0.5x to 2x
      setZoom(newZoom);
    },
    {
      axis: 'y',
      bounds: { top: -60, bottom: 60 }
    }
  );

  return (
    <div className="h-full bg-slate-800 rounded-lg relative overflow-hidden">
      {/* Preview Area with Basketball Court Background */}
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Basketball Court Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-out"
          style={{ 
            backgroundImage: `url(${basketballCourtImage})`,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        />
        
        {/* Stream Status Overlay */}
        {isStreaming && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 z-10">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            AO VIVO
          </div>
        )}
        
        {/* Active Source Label */}
        <div className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded text-sm z-10">
          {activeSource}
        </div>
        
        {/* Play Button (when not streaming) */}
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-green-400 ml-1" />
            </div>
          </div>
        )}
        
        {/* Draggable Zoom Slider - Right Edge */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <div 
            ref={sliderRef}
            className="bg-white rounded-sm relative"
            style={{ height: '120px', width: '6px', borderRadius: '3px' }}
          >
            {/* Black Center Line */}
            <div 
              className="absolute bg-black left-1/2 transform -translate-x-1/2"
              style={{ 
                width: '1px', 
                height: '120px',
                top: '0'
              }}
            />
            
            {/* Draggable Search Icon */}
            <div
              {...bind()}
              className="absolute bg-black/60 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing left-1/2 transform -translate-x-1/2 touch-none"
              style={{ 
                top: `${sliderPosition * 100}%`, 
                transform: 'translateX(-50%) translateY(-50%)',
                width: '24px',
                height: '24px'
              }}
            >
              <Search className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
