
interface MonitoringIndicatorProps {
  label: string;
  value: string;
  isActive: boolean;
}

const MonitoringIndicator = ({ label, value, isActive }: MonitoringIndicatorProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-3 h-0.5 rounded transition-colors ${
          isActive ? 'bg-green-400' : 'bg-gray-600'
        }`} />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="text-lg font-mono text-white">
        {value}
      </div>
    </div>
  );
};

export default MonitoringIndicator;
