import { useState } from 'react';
import { Play, CheckCircle2, ChevronRight } from 'lucide-react';

interface MissedIndicator {
  id: string;
  type: string;
  label: string;
}

interface RemediationVideoProps {
  missedIndicators: MissedIndicator[];
  onComplete: () => void;
  onSkipToLeaderboard: () => void;
  totalAcorns: number;
}

const VIDEO_CONTENT: Record<string, { title: string; duration: string; description: string; tips: string[] }> = {
  domain: {
    title: 'Identifying Suspicious Sender Domains',
    duration: '1:45',
    description: 'Learn how attackers craft fake email addresses that look almost identical to real company domains.',
    tips: [
      'Always hover over the sender name to reveal the actual email address',
      'Look for extra words or hyphens in the domain (e.g. techzone-clearance.net vs techzone.com)',
      'Legitimate companies use their primary domain — never a subdomain for marketing blasts',
    ],
  },
  urgency: {
    title: 'Recognizing Artificial Urgency',
    duration: '1:30',
    description: 'Phishing emails manufacture false deadlines to stop you from thinking critically before clicking.',
    tips: [
      'Phrases like "FINAL HOURS", "Act now", or "Expires today" are classic pressure tactics',
      'Real promotions don\'t require you to act in seconds — take your time',
      'When in doubt, navigate directly to the company website rather than clicking the link',
    ],
  },
  link: {
    title: 'Spotting Suspicious Calls-to-Action',
    duration: '1:20',
    description: 'Deceptive buttons and links are designed to look legitimate while redirecting you to malicious sites.',
    tips: [
      'Hover over any link before clicking to preview the real destination URL',
      'Legitimate sites use HTTPS — but HTTPS alone does not guarantee safety',
      'If the button creates pressure to act immediately, treat it as a red flag',
    ],
  },
};

function VideoPlayer({ indicator, onWatched, watched }: {
  indicator: MissedIndicator;
  onWatched: (id: string) => void;
  watched: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const content = VIDEO_CONTENT[indicator.type] ?? {
    title: indicator.label,
    duration: '1:30',
    description: 'Learn how to identify this phishing tactic.',
    tips: ['Pay close attention to details in emails before clicking any links.'],
  };

  const handlePlay = () => {
    if (watched) return;
    setPlaying(true);
    setProgress(0);

    // Simulate video progress over 3 seconds
    const steps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.round((step / steps) * 100));
      if (step >= steps) {
        clearInterval(interval);
        setPlaying(false);
        onWatched(indicator.id);
      }
    }, 100);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-colors ${watched ? 'border-green-400' : 'border-gray-200'}`}>
      {/* Video thumbnail */}
      <div className="relative bg-[#1a2456] aspect-video flex items-center justify-center">
        {watched ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">Watched! +1 🌰</span>
          </div>
        ) : playing ? (
          <div className="w-full px-12 space-y-4">
            <div className="flex justify-between text-white/80 text-sm">
              <span>Playing…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-[#2B5FD9] h-3 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={handlePlay}
            className="w-20 h-20 bg-[#2B5FD9] hover:bg-[#1e4bb8] rounded-full flex items-center justify-center shadow-lg transition-colors group"
          >
            <Play className="w-9 h-9 text-white ml-1 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Duration badge */}
        {!playing && !watched && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {content.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-bold text-gray-900 text-lg">{content.title}</h3>
          {watched && (
            <span className="flex-shrink-0 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              ✓ Complete
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{content.description}</p>
        <div className="space-y-2">
          {content.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-[#2B5FD9] font-bold mt-0.5">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
        {!watched && !playing && (
          <button
            onClick={handlePlay}
            className="mt-5 w-full bg-[#2B5FD9] text-white font-semibold py-3 rounded-xl hover:bg-[#1e4bb8] transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Watch to earn 1 🌰
          </button>
        )}
      </div>
    </div>
  );
}

export function RemediationVideo({
  missedIndicators,
  onComplete,
  onSkipToLeaderboard,
  totalAcorns,
}: RemediationVideoProps) {
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set());

  const handleWatched = (id: string) => {
    setWatchedIds(prev => new Set([...prev, id]));
  };

  const allWatched = missedIndicators.length > 0 && watchedIds.size === missedIndicators.length;
  const acornsToEarn = missedIndicators.length - watchedIds.size;

  if (missedIndicators.length === 0) {
    return (
      <div className="min-h-screen bg-[#2B5FD9] flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-12 max-w-md text-center shadow-2xl">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Perfect Score!</h2>
          <p className="text-gray-600 mb-6">You identified all phishing indicators correctly. No remediation needed!</p>
          <button
            onClick={onComplete}
            className="w-full bg-[#2B5FD9] text-white font-bold py-4 rounded-xl hover:bg-[#1e4bb8] transition-colors"
          >
            Go to Leaderboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2B5FD9] flex flex-col">
      {/* Header */}
      <div className="bg-[#2B5FD9] p-6 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-xl">CyberNut 🐿️</span>
            <div className="ml-8">
              <div className="text-white text-sm font-semibold">📹 Remediation Training</div>
              <div className="text-white/80 text-xs">Watch these short videos to earn back your acorns</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <div className="text-white text-sm">Watched</div>
              <div className="text-white font-bold text-2xl">{watchedIds.size}/{missedIndicators.length}</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <div className="text-white text-sm">Acorns</div>
              <div className="text-white font-bold text-2xl">🌰 {totalAcorns}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white/10 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              You missed {missedIndicators.length} indicator{missedIndicators.length > 1 ? 's' : ''} in the assessment
            </h2>
            <p className="text-white/80">
              Watch the training videos below to understand each tactic you missed.
              {acornsToEarn > 0 && ` Earn ${acornsToEarn} more acorn${acornsToEarn > 1 ? 's' : ''} by completing them.`}
            </p>
          </div>

          <div className={`grid gap-6 ${missedIndicators.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {missedIndicators.map(indicator => (
              <VideoPlayer
                key={indicator.id}
                indicator={indicator}
                onWatched={handleWatched}
                watched={watchedIds.has(indicator.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t shadow-lg p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            {allWatched ? (
              <p className="text-green-600 font-semibold text-lg">
                🎉 All videos watched! You earned {missedIndicators.length} bonus acorn{missedIndicators.length > 1 ? 's' : ''}.
              </p>
            ) : (
              <p className="text-gray-600">
                Watch all {missedIndicators.length} video{missedIndicators.length > 1 ? 's' : ''} to unlock the continue button
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onSkipToLeaderboard}
              className="bg-white text-[#2B5FD9] font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 border-2 border-[#2B5FD9] transition-colors"
            >
              Skip to Leaderboard
            </button>
            <button
              onClick={onComplete}
              disabled={!allWatched}
              className={`font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                allWatched
                  ? 'bg-[#2B5FD9] text-white hover:bg-[#1e4bb8]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Leaderboard
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
