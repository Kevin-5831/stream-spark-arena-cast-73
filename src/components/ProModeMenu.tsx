import { X, Camera, Globe, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoundIcon, ZoomIcon, PlusMinusIcon, RunIcon, ResetIcon, ISOIcon, WBIcon } from "./icons";

interface ProModeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProModeMenu = ({ isOpen, onClose }: ProModeMenuProps) => {
  if (!isOpen) return null;

  const proModeItems = [
    {
      icon: <RoundIcon/>,
      label: "0,33m",
      onClick: () => console.log("Camera Cellular"),
    },
    { icon: <ZoomIcon/>, label: "1x", onClick: () => console.log("Zoom") },
    { icon: <ISOIcon/>, label: "622", onClick: () => console.log("ISO") },
    { icon: <PlusMinusIcon/>, label: "0", onClick: () => console.log("Revert") },
    { icon: <RunIcon/>, label: "1/125", onClick: () => console.log("Speed Controls") },
    {
      icon: <WBIcon/>,
      label: "AWB",
      onClick: () => console.log("WS Control"),
    },
    { icon: <ResetIcon/>, label: "Reset", onClick: () => console.log("Reset") },
  ];

  return (
    <div className="fixed inset-5 z-50 flex items-center justify-start">
      <div
        className={cn(
          "bg-slate-800 rounded-lg shadow-lg p-3 w-22 ml-52",
          "animate-in slide-in-from-left-5 duration-300"
        )}
      >
        {/* Menu Items */}
        <div className=" flex flex-col space-y-1 items-cente">
          {proModeItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center rounded-lg hover:bg-dark transition-colors group pb-4"
            >
              {item.icon}
              <span className="text-xs text-white font-medium text-center">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-3 pt-2 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full p-2 text-xs text-gray-400 hover:text-white transition-colors text-center"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProModeMenu;
