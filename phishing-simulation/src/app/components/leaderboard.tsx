import { RotateCcw, Trophy } from 'lucide-react';

interface LeaderboardProps {
  userAcorns: number;
  onRestart: () => void;
}

const LEADERBOARD_DATA = [
  { name: 'Sofia M.', acorns: 9, avatar: 'S', streak: 7 },
  { name: 'Marcus R.', acorns: 8, avatar: 'M', streak: 5 },
  { name: 'Priya K.', acorns: 8, avatar: 'P', streak: 4 },
  { name: 'Aisha W.', acorns: 7, avatar: 'A', streak: 6 },
  { name: 'Devon L.', acorns: 6, avatar: 'D', streak: 3 },
  { name: 'Jordan T.', acorns: 5, avatar: 'J', streak: 2 },
  { name: 'Mia P.', acorns: 4, avatar: 'M', streak: 1 },
  { name: 'Sam L.', acorns: 3, avatar: 'S', streak: 0 },
];

const MEDAL = ['🥇', '🥈', '🥉'];

function getRankMessage(rank: number, total: number): string {
  const pct = rank / total;
  if (rank === 1) return 'You\'re at the top! Outstanding security awareness!';
  if (rank <= 3) return 'Top 3! Excellent phishing detection skills!';
  if (pct <= 0.5) return 'Above average — keep sharpening your skills!';
  return 'Keep practicing — every training makes you stronger!';
}

export function Leaderboard({ userAcorns, onRestart }: LeaderboardProps) {
  const YOU = { name: 'You', acorns: userAcorns, avatar: '🐿', streak: 1 };

  // Merge and sort
  const entries = [...LEADERBOARD_DATA, YOU].sort((a, b) => b.acorns - a.acorns);
  const userRank = entries.findIndex(e => e.name === 'You') + 1;

  const topThree = entries.slice(0, 3);
  const rest = entries.slice(3);

  const acornLevels = [
    { min: 9, label: 'Security Expert', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { min: 7, label: 'Phishing Pro', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { min: 5, label: 'Sharp Eye', color: 'text-green-600 bg-green-50 border-green-200' },
    { min: 3, label: 'Learning', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { min: 0, label: 'Just Starting', color: 'text-gray-600 bg-gray-50 border-gray-200' },
  ];
  const userLevel = acornLevels.find(l => userAcorns >= l.min) ?? acornLevels[acornLevels.length - 1];

  return (
    <div className="min-h-screen bg-[#2B5FD9] flex flex-col">
      {/* Header */}
      <div className="bg-[#2B5FD9] p-6 border-b border-white/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-xl">CyberNut 🐿️</span>
            <div className="ml-8">
              <div className="text-white text-sm font-semibold">🏆 Class Leaderboard</div>
              <div className="text-white/80 text-xs">Ms. Chen's 6th Grade · Lincoln Middle School</div>
            </div>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Your Result Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-[#F5E16D] rounded-full flex items-center justify-center text-4xl shadow-md">
                  🐿️
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium mb-1">Your result</div>
                  <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    🌰 {userAcorns} acorns
                  </div>
                  <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold border ${userLevel.color}`}>
                    {userLevel.label}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-[#2B5FD9]">#{userRank}</div>
                <div className="text-gray-500 text-sm mt-1">of {entries.length} students</div>
                <p className="text-gray-600 text-sm mt-2 max-w-xs">{getRankMessage(userRank, entries.length)}</p>
              </div>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4">
            {[topThree[1], topThree[0], topThree[2]].map((entry, podiumIndex) => {
              if (!entry) return <div key={podiumIndex} />;
              const actualRank = podiumIndex === 0 ? 2 : podiumIndex === 1 ? 1 : 3;
              const isYou = entry.name === 'You';
              const heights = ['h-28', 'h-36', 'h-24'];
              return (
                <div key={entry.name} className="flex flex-col items-center gap-3">
                  <div className={`w-full bg-white rounded-2xl shadow-lg flex flex-col items-center justify-end pb-5 pt-4 ${heights[podiumIndex]} ${isYou ? 'ring-4 ring-[#F5E16D]' : ''}`}>
                    <div className="text-3xl mb-1">{MEDAL[actualRank - 1]}</div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow ${isYou ? 'bg-[#F5E16D] text-[#2B5FD9]' : 'bg-[#2B5FD9] text-white'}`}>
                      {isYou ? '🐿️' : entry.avatar}
                    </div>
                    <div className="text-xs font-semibold text-gray-700 mt-1">{isYou ? 'You' : entry.name.split(' ')[0]}</div>
                    <div className="text-sm font-bold text-gray-900">🌰 {entry.acorns}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Rankings Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#2B5FD9]" />
                All Rankings
              </h3>
            </div>
            <div className="divide-y">
              {entries.map((entry, index) => {
                const isYou = entry.name === 'You';
                const rank = index + 1;
                return (
                  <div
                    key={`${entry.name}-${index}`}
                    className={`flex items-center gap-4 px-6 py-4 ${isYou ? 'bg-[#F5E16D]/20' : 'hover:bg-gray-50'}`}
                  >
                    <div className="w-8 text-center">
                      {rank <= 3 ? (
                        <span className="text-xl">{MEDAL[rank - 1]}</span>
                      ) : (
                        <span className="text-gray-500 font-bold text-sm">#{rank}</span>
                      )}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${isYou ? 'bg-[#F5E16D] text-[#2B5FD9]' : 'bg-[#2B5FD9] text-white'}`}>
                      {isYou ? '🐿️' : entry.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold truncate ${isYou ? 'text-[#2B5FD9]' : 'text-gray-900'}`}>
                        {isYou ? 'You' : entry.name}
                        {isYou && <span className="ml-2 text-xs bg-[#2B5FD9] text-white px-2 py-0.5 rounded-full">You</span>}
                      </div>
                      {entry.streak > 0 && (
                        <div className="text-xs text-gray-500">🔥 {entry.streak}-day streak</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">🌰 {entry.acorns}</div>
                      <div className="text-xs text-gray-500">acorns</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white/10 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-3">Keep Building Your Skills 🚀</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-semibold mb-1">More Simulations</div>
                <div className="text-white/70">New phishing scenarios arrive weekly in your inbox</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold mb-1">Security Lessons</div>
                <div className="text-white/70">Short lessons covering passwords, social engineering & more</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">🏅</div>
                <div className="font-semibold mb-1">Earn Badges</div>
                <div className="text-white/70">Complete challenges to unlock special achievement badges</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
