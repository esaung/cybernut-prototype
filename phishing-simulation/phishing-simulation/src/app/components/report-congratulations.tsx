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
  onGoToLeaderboard,
}: ReportCongratulationsProps) {
  const MAX_ACORNS = 5;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'radial-gradient(ellipse at center, #FFE033 0%, #F5C800 60%, #E0A800 100%)' }}>
      <div
        className="w-full max-w-2xl rounded-3xl p-12 flex flex-col items-center text-center"
        style={{ background: 'radial-gradient(ellipse at center, #FFE84D 0%, #FFD700 100%)', boxShadow: 'inset 0 0 60px rgba(255,255,255,0.3), 0 8px 40px rgba(0,0,0,0.15)' }}
      >
        {/* Title */}
        <h1 className="text-6xl font-black mb-6" style={{ color: '#1A3DB5', fontFamily: 'system-ui, sans-serif', letterSpacing: '-1px' }}>
          Great Job! 🎉🐿️
        </h1>

        {/* Subtitle */}
        <p className="text-xl font-bold mb-2" style={{ color: '#1A3DB5' }}>
          You spotted a CyberNut phishing simulation!
        </p>
        <p className="text-xl font-bold mb-10" style={{ color: '#1A3DB5' }}>
          You just earned {acornsEarned} acorns!!
        </p>

        {/* Acorn cards */}
        <div className="flex gap-4 mb-12">
          {Array.from({ length: MAX_ACORNS }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: i < acornsEarned ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                boxShadow: i < acornsEarned ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                opacity: i < acornsEarned ? 1 : 0.5,
              }}
            >
              {i < acornsEarned ? '🌰' : '🪨'}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onEarnMore}
            className="px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: '#2B5FD9', boxShadow: '0 4px 16px rgba(43,95,217,0.4)' }}
          >
            Earn more acorns
          </button>
          <button
            onClick={onGoToLeaderboard}
            className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.5)', color: '#1A3DB5', border: '2px solid rgba(255,255,255,0.6)' }}
          >
            Go to Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
