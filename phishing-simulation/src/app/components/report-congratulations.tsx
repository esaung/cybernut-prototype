import { useEffect, useState } from 'react';

interface ReportCongratulationsProps {
  acornsEarned: number;
  totalAcorns: number;
  onEarnMore: () => void;
  onGoToLeaderboard: () => void;
}

export function ReportCongratulations({
  acornsEarned,
  totalAcorns,
  onEarnMore,
  onGoToLeaderboard
}: ReportCongratulationsProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onEarnMore();
    }
  }, [countdown, onEarnMore]);

  return (
    <div className="min-h-screen bg-[#F5E16D] flex flex-col items-center justify-center p-8 relative">
      {/* CyberNut Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-2">
          <span className="text-[#2B5FD9] font-bold text-xl">CyberNut</span>
          <span className="text-2xl">🐿️</span>
        </div>
      </div>

      {/* Timer in bottom right */}
      <div className="absolute bottom-8 right-8">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <div className="w-8 h-8 rounded-full border-3 border-[#2B5FD9] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#2B5FD9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2"/>
            </svg>
          </div>
          <span className="text-[#2B5FD9] font-bold text-xl">{countdown}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Title with emoji */}
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-[#2B5FD9] flex items-center justify-center gap-3">
            Yikes!<span className="text-6xl">🤦</span>
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p className="text-2xl text-[#2B5FD9] font-bold">
            You accidentally clicked on a phishing simulation.
          </p>
          <p className="text-2xl text-[#2B5FD9] font-bold">
            But don't worry! CyberNut is going to help you improve!
          </p>
        </div>

        {/* Acorns Display */}
        <div className="flex justify-center gap-6 py-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="text-7xl opacity-40"
            >
              🌰
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="space-y-2">
          <p className="text-xl text-[#2B5FD9] font-bold">
            Earn acorns by understanding what you clicked ➡️
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-8">
          <button
            onClick={onEarnMore}
            className="bg-[#2B5FD9] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#1e4bb8] transition-colors text-lg shadow-lg"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}