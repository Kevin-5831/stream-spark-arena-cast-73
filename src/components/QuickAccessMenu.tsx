import { X, Clock, Download, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GridIcon, TorchIcon, VideoIcon, CropIcon, AudioIcon, SettingIcon } from './icons';

interface QuickAccessMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onProModeClick: () => void;
}

const QuickAccessMenu = ({ isOpen, onClose, onProModeClick }: QuickAccessMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: <GridIcon/>, label: 'Grade', onClick: () => console.log('grade clicked') },
    { icon: <TorchIcon/>, label: 'Fashlight', onClick: () => console.log('flash light clicked') },
    { icon: <VideoIcon/>, label: 'Pro Mode', onClick: onProModeClick, isProMode: true },
    { icon: <CropIcon/>, label: 'Home Fabric', onClick: () => console.log('home clicked') },
    { icon: <AudioIcon/>, label: 'Tum', onClick: () => console.log('audio clicked') },
    { icon: <SettingIcon/>, label: 'Settings', onClick: () => console.log('Settings clicked') },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end items-start top-20 pt-4 pr-4">
      <div 
        className={cn(
          "bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 w-80",
          "animate-in slide-in-from-top-5 duration-300"
        )}
      >
        {/* Header with Close Button */}
        <div className="flex justify-end items-center">
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Menu Grid - 2 rows x 3 columns */}
        <div className="grid grid-cols-3 gap-5">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg hover:bg-slate-100 transition-colors group",
                item.isProMode && "border-2 border-green-400"
              )}
            >
              {item.icon}
              <span className="text-xs text-slate-700 font-medium text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccessMenu;