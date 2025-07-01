
import { LucideIcon } from 'lucide-react';

interface ShortcutButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

const ShortcutButton = ({ icon: Icon, label, isActive }: ShortcutButtonProps) => {
  return (
    <button className="flex flex-col items-center gap-1 p-2 hover:bg-slate-800 rounded-lg transition-colors">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        isActive ? 'bg-green-400' : 'bg-green-500 hover:bg-green-400'
      }`}>
        <Icon className="w-6 h-6 text-slate-900" />
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </button>
  );
};

export default ShortcutButton;
