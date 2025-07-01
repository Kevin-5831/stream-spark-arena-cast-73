
import { Camera } from 'lucide-react';

interface SourceCardProps {
  name: string;
  isOnAir: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const SourceCard = ({ name, isOnAir, isSelected, onClick }: SourceCardProps) => {
  return (
    <div 
      className={`relative bg-slate-800 border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-slate-700 ${
        isSelected ? 'border-green-400 bg-slate-700' : 'border-slate-600'
      }`}
      onClick={onClick}
    >
      {/* Status Badge */}
      {isOnAir && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          NO AR
        </div>
      )}
      
      {/* Camera Icon */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mb-2">
          <Camera className="w-6 h-6 text-white" />
        </div>
        
        {/* Source Name */}
        <div className="text-center">
          <p className="text-xs font-medium text-white leading-tight">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SourceCard;
