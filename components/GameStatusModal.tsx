
import React from 'react';

interface GameStatusModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

const GameStatusModal: React.FC<GameStatusModalProps> = ({ isOpen, onRestart }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full text-center transform transition-all animate-fade-in-up">
        <div className="text-yellow-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M5 3l14 18" />
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 4c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7-7-3.134-7-7z" transform="rotate(-45 12 12)" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">You Win!</h2>
        <p className="text-gray-600 mb-6">Congratulations! You cleared the board.</p>
        <button
          onClick={onRestart}
          className="w-full px-6 py-3 bg-rose-400 text-white font-semibold rounded-lg shadow-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default GameStatusModal;
