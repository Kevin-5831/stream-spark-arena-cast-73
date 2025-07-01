
interface StreamButtonProps {
  isStreaming: boolean;
  onToggle: () => void;
}

const StreamButton = ({ isStreaming, onToggle }: StreamButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 ${
        isStreaming
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-green-500 hover:bg-green-400 text-slate-900'
      }`}
    >
      {isStreaming ? 'PARAR TRANSMISSÃO' : 'INICIAR TRANSMISSÃO'}
    </button>
  );
};

export default StreamButton;
