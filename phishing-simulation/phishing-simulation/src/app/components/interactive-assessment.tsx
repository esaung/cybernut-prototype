import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Indicator {
  id: string;
  type: 'domain' | 'urgency' | 'link';
  label: string;
  description: string;
  snippet: string;
}

interface InteractiveAssessmentProps {
  onComplete: (usedHints: boolean, missedIndicators: Indicator[]) => void;
  onSkipToLeaderboard: () => void;
  totalAcorns: number;
}

const INDICATORS: Indicator[] = [
  {
    id: 'domain',
    type: 'domain',
    label: 'Suspicious Sender Domain',
    description: 'The email address uses a suspicious domain that mimics a legitimate company',
    snippet: '<deals@techzone-summer-clearance.net>',
  },
  {
    id: 'urgency',
    type: 'urgency',
    label: 'Artificial Urgency',
    description: 'Creates false time pressure with phrases like "FINAL HOURS" and "expires soon"',
    snippet: '🔥 FINAL HOURS: 80% off Electronics...',
  },
  {
    id: 'link',
    type: 'link',
    label: 'Suspicious Call-to-Action',
    description: 'Pressures you to click immediately without verifying the legitimacy',
    snippet: 'Claim Your 80% Discount Now →',
  },
];

const TACTIC_OPTIONS = [
  { value: 'domain', label: 'Suspicious Sender Domain',   icon: '🌐' },
  { value: 'urgency', label: 'Artificial Urgency',         icon: '🔔' },
  { value: 'link',   label: 'Suspicious Call-to-Action',  icon: '🔗' },
  { value: 'grammar', label: 'Poor Grammar/Spelling',     icon: '✏️' },
  { value: 'attachment', label: 'Unexpected Attachment',  icon: '📎' },
];

export function InteractiveAssessment({ onComplete, onSkipToLeaderboard, totalAcorns }: InteractiveAssessmentProps) {
  const [identifiedIndicators, setIdentifiedIndicators] = useState<Map<string, string>>(new Map());
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [lives, setLives] = useState(3);

  // 2-step tactic selection state
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [wrongOptions, setWrongOptions] = useState<Set<string>>(new Set());

  const handleIndicatorClick = (indicator: Indicator) => {
    if (!identifiedIndicators.has(indicator.id) && lives > 0) {
      setSelectedIndicator(indicator);
      setPendingSelection(null);
      setWrongOptions(new Set());
      setShowModal(true);
    }
  };

  const handleOptionSelect = (value: string) => {
    if (wrongOptions.has(value)) return;
    setPendingSelection(value);
  };

  const handleSubmit = () => {
    if (!selectedIndicator || !pendingSelection) return;
    if (pendingSelection === selectedIndicator.type) {
      // Correct
      const newIdentified = new Map(identifiedIndicators);
      newIdentified.set(selectedIndicator.id, pendingSelection);
      setIdentifiedIndicators(newIdentified);
      setShowModal(false);
      setSelectedIndicator(null);
      setPendingSelection(null);
      setWrongOptions(new Set());
    } else {
      // Wrong — mark option as wrong, lose a life
      const newWrong = new Set(wrongOptions);
      newWrong.add(pendingSelection);
      setWrongOptions(newWrong);
      setPendingSelection(null);
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setShowModal(false);
        setSelectedIndicator(null);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedIndicator(null);
    setPendingSelection(null);
    setWrongOptions(new Set());
  };

  const handleContinue = () => {
    const missedIndicators = INDICATORS.filter(ind => !identifiedIndicators.has(ind.id));
    onComplete(false, missedIndicators);
  };

  const allIdentified = identifiedIndicators.size === INDICATORS.length;
  const progress = identifiedIndicators.size;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#2B5FD9' }}>

      {/* ── Header ── */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">CyberNut</span>
            <span className="text-xl">🐿️</span>
          </div>
          <div>
            <div className="text-white font-bold text-lg">Interactive Assessment</div>
            <div
              className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs mt-0.5"
              style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
            >
              ↗ Click on the highlighted areas and identify the phishing tactic
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress badge */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow">
            <span className="text-[#2B5FD9] text-sm font-semibold">Progress</span>
            <span className="text-[#2B5FD9] font-black text-lg">{progress}/3</span>
          </div>
          {/* Lives badge */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow">
            <span className="text-[#2B5FD9] text-sm font-semibold">Lives</span>
            <div className="bg-red-500 rounded-lg px-2 py-0.5 flex items-center gap-1">
              <span className="text-sm">❤️</span>
              <span className="text-white font-black text-lg leading-none">{lives}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Email Card ── */}
      <div className="flex-1 px-6 pb-4 overflow-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200 rounded text-sm">←</button>
            <button className="p-1 hover:bg-gray-200 rounded text-sm">📄</button>
            <button className="p-1 hover:bg-gray-200 rounded text-sm">🗑️</button>
            <div className="flex-1" />
            <button className="p-1 hover:bg-gray-200 rounded text-sm">⋮</button>
          </div>

          <div className="p-8">
            {/* Sender */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2B5FD9] flex items-center justify-center text-white font-bold flex-shrink-0">T</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">TechZone Deals</div>

                {/* Indicator 1 — domain */}
                <div className="relative inline-block">
                  <span
                    className={`text-sm px-1 py-0.5 rounded cursor-pointer ${identifiedIndicators.has('domain') ? 'text-gray-400' : 'text-[#2B5FD9]'}`}
                    onClick={() => handleIndicatorClick(INDICATORS[0])}
                  >
                    &lt;deals@techzone-summer-clearance.net&gt;
                  </span>
                  {!identifiedIndicators.has('domain') && (
                    <div
                      className="absolute rounded border-2 border-yellow-400 cursor-pointer"
                      style={{ top: '-3px', bottom: '-3px', left: '-3px', right: '-3px' }}
                      onClick={() => handleIndicatorClick(INDICATORS[0])}
                    >
                      <span className="absolute -top-3 -right-3 w-5 h-5 bg-[#2B5FD9] text-white rounded-full text-xs flex items-center justify-center font-bold z-10 shadow">1</span>
                    </div>
                  )}
                  {identifiedIndicators.has('domain') && (
                    <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 z-10">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-400 mt-1">to me ▼</div>
              </div>
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded flex-shrink-0">External</span>
            </div>

            {/* Indicator 2 — urgency (subject line) */}
            <div className="relative inline-block mb-6">
              <h2
                className={`text-xl font-bold cursor-pointer pr-2 ${identifiedIndicators.has('urgency') ? 'text-gray-400' : 'text-gray-900'}`}
                onClick={() => handleIndicatorClick(INDICATORS[1])}
              >
                🔥 FINAL HOURS: 80% off Electronics - Exclusive access expires soon!
              </h2>
              {!identifiedIndicators.has('urgency') && (
                <div
                  className="absolute rounded border-2 border-yellow-400 cursor-pointer"
                  style={{ top: '-4px', bottom: '-4px', left: '-4px', right: '-4px' }}
                  onClick={() => handleIndicatorClick(INDICATORS[1])}
                >
                  <span className="absolute -top-3 -right-3 w-5 h-5 bg-[#2B5FD9] text-white rounded-full text-xs flex items-center justify-center font-bold z-10 shadow">2</span>
                </div>
              )}
              {identifiedIndicators.has('urgency') && (
                <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 z-10">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </span>
              )}
            </div>

            {/* Promo block */}
            <div className="bg-[#1a2456] text-white rounded-xl p-10 text-center mb-6">
              <div className="text-gray-400 text-xs mb-2">TechZone</div>
              <div className="bg-orange-500 inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-3">SUMMER CLEARANCE</div>
              <div className="text-7xl font-black">80<span className="text-4xl">%</span></div>
              <div className="text-xl mt-1">off everything</div>
            </div>

            {/* Body */}
            <div className="space-y-2 text-gray-700 mb-6">
              <p className="font-semibold">Your tech. Your way.</p>
              <p className="font-semibold">Your savings.</p>
              <p className="text-sm">Every season calls for an upgrade: new laptops for back-to-school, smart home devices for summer, gaming gear for the holidays...</p>
            </div>

            {/* Indicator 3 — link (CTA button) */}
            <div className="relative inline-block mb-8">
              <button
                className={`px-8 py-3 rounded-lg font-semibold text-white ${identifiedIndicators.has('link') ? 'bg-gray-400' : 'bg-[#2B5FD9] hover:bg-[#1e4bb8] cursor-pointer'}`}
                onClick={() => handleIndicatorClick(INDICATORS[2])}
              >
                Claim Your 80% Discount Now →
              </button>
              {!identifiedIndicators.has('link') && (
                <div
                  className="absolute rounded-lg border-2 border-yellow-400 pointer-events-none"
                  style={{ top: '-4px', bottom: '-4px', left: '-4px', right: '-4px' }}
                >
                  <span className="absolute -top-3 -right-3 w-5 h-5 bg-[#2B5FD9] text-white rounded-full text-xs flex items-center justify-center font-bold z-10 shadow pointer-events-none">3</span>
                </div>
              )}
              {identifiedIndicators.has('link') && (
                <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 z-10">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </span>
              )}
            </div>

            <div className="border-t pt-4 text-xs text-gray-400">
              <p>TechZone Inc. | 123 Tech Street, Silicon Valley, CA 94000</p>
              <p className="mt-1">Unsubscribe | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-3xl mx-auto mt-4 flex items-center justify-between">
          <div className="text-white/70 text-sm">
            {allIdentified
              ? <span className="text-green-300 font-semibold">🎉 All indicators found!</span>
              : <span>Find {INDICATORS.length - progress} more indicator{INDICATORS.length - progress !== 1 ? 's' : ''}</span>
            }
          </div>
          <div className="flex gap-3">
            <button
              onClick={onSkipToLeaderboard}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 border border-white/20 transition-colors"
            >
              Skip to Leaderboard
            </button>
            <button
              onClick={handleContinue}
              disabled={!allIdentified}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${
                allIdentified ? 'bg-white text-[#2B5FD9] hover:bg-gray-100' : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>

      {/* ── Tactic Selection Modal ── */}
      {selectedIndicator && showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={handleCancel} />
          <div
            className="fixed z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#2B5FD9' }}
          >
            {/* Modal top */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-black text-2xl mb-3">What tactic is this?</h3>
                <div
                  className="inline-block px-3 py-1.5 rounded-lg text-xs text-white font-mono"
                  style={{ background: 'rgba(0,0,0,0.2)' }}
                >
                  {selectedIndicator.snippet}
                </div>
              </div>
              {/* Squirrel + lives */}
              <div className="relative flex-shrink-0">
                <span className="text-5xl">🐿️</span>
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-black border-2 border-white shadow">
                  {lives}
                </div>
              </div>
            </div>

            {/* Option rows */}
            <div className="px-4 pb-2 space-y-2">
              {TACTIC_OPTIONS.map((option) => {
                const isWrong = wrongOptions.has(option.value);
                const isSelected = pendingSelection === option.value;

                if (isWrong) {
                  return (
                    <div key={option.value} className="rounded-2xl bg-white px-5 py-4 flex items-center gap-3">
                      <span className="text-2xl opacity-30 flex-shrink-0">{option.icon}</span>
                      <p className="text-sm">
                        <span className="font-black text-orange-500">Not quite,</span>
                        <span className="text-gray-500"> this option doesn't apply here.</span>
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={option.value}
                    className="rounded-2xl flex items-center gap-4 px-5 py-4 transition-all"
                    style={{ background: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)' }}
                  >
                    <span className="text-2xl flex-shrink-0">{option.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm">{option.label}</div>
                      <div className="text-white/50 text-xs mt-0.5 flex items-center gap-1">
                        <span>⏱</span> Tap to learn more
                      </div>
                    </div>
                    <button
                      onClick={() => handleOptionSelect(option.value)}
                      className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                        isSelected
                          ? 'text-[#2B5FD9] font-black'
                          : 'text-white border border-white/50 hover:bg-white/10'
                      }`}
                      style={isSelected ? { background: '#FFD700' } : {}}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-5 flex gap-3 justify-center">
              <button
                onClick={handleCancel}
                className="px-8 py-3 rounded-full text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              {(pendingSelection || wrongOptions.size > 0) && (
                <button
                  onClick={handleSubmit}
                  disabled={!pendingSelection}
                  className={`px-8 py-3 rounded-full text-sm font-black transition-colors ${
                    pendingSelection ? 'text-[#1A3DB5]' : 'text-[#1A3DB5]/40 cursor-not-allowed'
                  }`}
                  style={{ background: pendingSelection ? '#FFD700' : '#FFD70066' }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── How to Play Modal ── */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden">
            <div
              className="px-8 py-7 flex items-center gap-4"
              style={{ background: 'linear-gradient(135deg, #3b4fd4 0%, #6b35c4 100%)' }}
            >
              <span className="text-5xl">🏆</span>
              <div>
                <h2 className="text-white font-black text-3xl">How to Play</h2>
                <p className="text-white/80 text-sm mt-1">Test your phishing detection skills and earn more acorns!</p>
              </div>
            </div>
            <div className="px-8 py-8 grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: '#FF8C00' }}>👁️</div>
                <div className="font-bold text-gray-900 text-sm">Identify Suspicious Areas</div>
                <p className="text-gray-500 text-xs">Look for suspicious areas in the content that may contain phishing tricks</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: '#2B5FD9' }}>🖱️</div>
                <div className="font-bold text-gray-900 text-sm">Match the Trick</div>
                <p className="text-gray-500 text-xs">Click each suspicious area and select which type of trick is being used</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: '#E53935' }}>❤️</div>
                <div className="font-bold text-gray-900 text-sm">Find Them All</div>
                <p className="text-gray-500 text-xs">Identify all the suspicious areas correctly before you run out of lives!</p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full py-4 rounded-full text-white font-bold text-lg transition-all hover:scale-[1.02]"
                style={{ background: '#2B5FD9', boxShadow: '0 4px 16px rgba(43,95,217,0.35)' }}
              >
                Got it! Let's Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Game Over Modal ── */}
      {lives === 0 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="px-8 py-7" style={{ background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)' }}>
              <div className="text-5xl mb-3">💔</div>
              <h2 className="text-white font-black text-2xl">Out of Lives!</h2>
              <p className="text-white/80 text-sm mt-1">Don't worry — learning takes practice!</p>
            </div>
            <div className="p-8">
              <div className="space-y-3 mb-6">
                {INDICATORS.map((ind, i) => (
                  <div key={ind.id} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-[#2B5FD9] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{ind.label}</div>
                      <div className="text-xs text-gray-500">{ind.description}</div>
                    </div>
                    {identifiedIndicators.has(ind.id) && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <button
                onClick={onSkipToLeaderboard}
                className="w-full py-4 rounded-full text-white font-bold transition-colors"
                style={{ background: '#2B5FD9' }}
              >
                View Leaderboard →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
