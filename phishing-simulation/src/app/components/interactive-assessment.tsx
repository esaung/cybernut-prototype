import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface Indicator {
  id: string;
  type: 'domain' | 'urgency' | 'link';
  label: string;
  description: string;
  position: { top: string; left: string; width: string; height: string };
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
    position: { top: '19%', left: '8%', width: '50%', height: '5%' }
  },
  {
    id: 'urgency',
    type: 'urgency',
    label: 'Artificial Urgency',
    description: 'Creates false time pressure with phrases like "FINAL HOURS" and "expires soon"',
    position: { top: '32%', left: '8%', width: '84%', height: '6%' }
  },
  {
    id: 'link',
    type: 'link',
    label: 'Suspicious Call-to-Action',
    description: 'Pressures you to click immediately without verifying the legitimacy',
    position: { top: '75%', left: '8%', width: '40%', height: '6%' }
  }
];

const TACTIC_OPTIONS = [
  { 
    value: 'domain', 
    label: 'Suspicious Sender Domain',
    description: 'Email addresses that mimic legitimate companies but use fake or unusual domains'
  },
  { 
    value: 'urgency', 
    label: 'Artificial Urgency',
    description: 'Creates fake time pressure to rush you into making decisions without thinking'
  },
  { 
    value: 'link', 
    label: 'Suspicious Call-to-Action',
    description: 'Buttons or links that pressure you to act immediately without verification'
  },
  { 
    value: 'grammar', 
    label: 'Poor Grammar/Spelling',
    description: 'Obvious typos or awkward language that legitimate companies would avoid'
  },
  { 
    value: 'attachment', 
    label: 'Unexpected Attachment',
    description: 'Files you weren\'t expecting that could contain malware or viruses'
  },
];

export function InteractiveAssessment({
  onComplete,
  onSkipToLeaderboard,
  totalAcorns
}: InteractiveAssessmentProps) {
  const [identifiedIndicators, setIdentifiedIndicators] = useState<Map<string, string>>(new Map());
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [lives, setLives] = useState(3);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleIndicatorClick = (indicator: Indicator) => {
    if (!identifiedIndicators.has(indicator.id) && lives > 0) {
      setSelectedIndicator(indicator);
      setShowModal(true);
      setWrongAnswer(false);
    }
  };

  const handleTacticSelect = (tacticValue: string) => {
    if (!selectedIndicator) return;

    if (tacticValue === selectedIndicator.type) {
      const newIdentified = new Map(identifiedIndicators);
      newIdentified.set(selectedIndicator.id, tacticValue);
      setIdentifiedIndicators(newIdentified);
      setShowModal(false);
      setSelectedIndicator(null);
      setWrongAnswer(false);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setWrongAnswer(true);
      
      if (newLives === 0) {
        setShowModal(false);
        setSelectedIndicator(null);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedIndicator(null);
    setWrongAnswer(false);
  };

  const handleContinue = () => {
    const missedIndicators = INDICATORS.filter(ind => !identifiedIndicators.has(ind.id));
    onComplete(false, missedIndicators);
  };

  const allIdentified = identifiedIndicators.size === INDICATORS.length;
  const progress = identifiedIndicators.size;

  return (
    <div className="min-h-screen bg-[#2B5FD9] flex flex-col">
      {/* Header */}
      <div className="bg-[#2B5FD9] p-6 border-b border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-xl">CyberNut 🐿️</span>
              <div className="ml-8">
                <div className="text-white text-sm font-semibold">Interactive Assessment</div>
                <div className="text-white/80 text-xs">Click on the highlighted areas and identify the phishing tactic</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                <div className="text-white text-sm">Progress</div>
                <div className="text-white font-bold text-2xl">{progress}/{INDICATORS.length}</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                <div className="text-white text-sm">Lives</div>
                <div className="text-white font-bold text-2xl flex gap-1">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <span key={index} className={index < lives ? 'opacity-100' : 'opacity-30'}>
                      ❤️
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gray-100 p-3 border-b flex items-center gap-2">
              <button className="p-1 hover:bg-gray-200 rounded">←</button>
              <button className="p-1 hover:bg-gray-200 rounded">📄</button>
              <button className="p-1 hover:bg-gray-200 rounded">🗑️</button>
              <div className="flex-1"></div>
              <button className="p-1 hover:bg-gray-200 rounded">⋮</button>
            </div>

            <div className="relative bg-white p-8">
              <div className="mb-6 border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2B5FD9] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">TechZone Deals</div>
                    <div className="relative inline-block">
                      <div className="text-sm text-gray-600">&lt;deals@techzone-summer-clearance.net&gt;</div>
                      <div
                        className={`absolute inset-0 rounded transition-all cursor-pointer ${
                          identifiedIndicators.has('domain')
                            ? 'bg-green-400/30 border-2 border-green-500'
                            : 'bg-yellow-300/40 border-2 border-yellow-500 animate-pulse'
                        }`}
                        onClick={() => handleIndicatorClick(INDICATORS[0])}
                        style={{
                          top: '-4px',
                          left: '-4px',
                          right: '-4px',
                          bottom: '-4px'
                        }}
                      >
                        {identifiedIndicators.has('domain') && (
                          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {!identifiedIndicators.has('domain') && (
                          <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">to me ▼</div>
                  </div>
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-semibold">
                    External
                  </div>
                </div>
                
                <div className="mt-4 relative inline-block">
                  <h2 className="text-2xl font-bold">
                    🔥 FINAL HOURS: 80% off Electronics - Exclusive access expires soon!
                  </h2>
                  <div
                    className={`absolute inset-0 rounded transition-all cursor-pointer ${
                      identifiedIndicators.has('urgency')
                        ? 'bg-green-400/30 border-2 border-green-500'
                        : 'bg-yellow-300/40 border-2 border-yellow-500 animate-pulse'
                    }`}
                    onClick={() => handleIndicatorClick(INDICATORS[1])}
                    style={{
                      top: '-4px',
                      left: '-4px',
                      right: '-4px',
                      bottom: '-4px'
                    }}
                  >
                    {identifiedIndicators.has('urgency') && (
                      <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {!identifiedIndicators.has('urgency') && (
                      <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-[#1a2456] text-white p-12 rounded-lg text-center mb-8">
                  <div className="text-gray-400 text-sm mb-2">TechZone</div>
                  <div className="bg-orange-500 inline-block px-4 py-1 rounded-full text-xs font-bold mb-4">
                    SUMMER CLEARANCE
                  </div>
                  <div className="text-8xl font-bold mb-2">80<span className="text-5xl">%</span></div>
                  <div className="text-2xl">off everything</div>
                </div>

                <div className="space-y-4 text-gray-700 text-lg">
                  <p className="font-semibold text-xl">Your tech. Your way.</p>
                  <p className="font-semibold">Your savings.</p>
                  <p>
                    Every season calls for an upgrade: new laptops for back-to-school, smart home devices for summer, gaming gear for the holidays...
                  </p>

                  <div className="pt-4 relative inline-block">
                    <div className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg inline-block">
                      Claim Your 80% Discount Now →
                    </div>
                    <div
                      className={`absolute inset-0 rounded-lg transition-all cursor-pointer ${
                        identifiedIndicators.has('link')
                          ? 'bg-green-400/30 border-2 border-green-500'
                          : 'bg-yellow-300/40 border-2 border-yellow-500 animate-pulse'
                      }`}
                      onClick={() => handleIndicatorClick(INDICATORS[2])}
                      style={{
                        top: '-8px',
                        left: '-8px',
                        right: '-8px',
                        bottom: '-8px'
                      }}
                    >
                      {identifiedIndicators.has('link') && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {!identifiedIndicators.has('link') && (
                        <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t text-xs text-gray-500">
                  <p>TechZone Inc. | 123 Tech Street, Silicon Valley, CA 94000</p>
                  <p className="mt-1">Unsubscribe | Privacy Policy | Terms of Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t shadow-lg p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-600">Your Progress</div>
              <div className="text-2xl font-bold text-[#2B5FD9]">
                {progress}/{INDICATORS.length} Indicators Identified
              </div>
            </div>
            <div className="text-4xl">
              {progress === 0 && '🎯'}
              {progress === 1 && '👍'}
              {progress === 2 && '🔥'}
              {progress === 3 && '🎉'}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onSkipToLeaderboard}
              className="bg-white text-[#2B5FD9] font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors border-2 border-[#2B5FD9]"
            >
              Skip to Leaderboard
            </button>
            <button
              onClick={handleContinue}
              disabled={!allIdentified}
              className={`font-bold px-8 py-3 rounded-lg transition-colors ${
                allIdentified
                  ? 'bg-[#2B5FD9] text-white hover:bg-[#1e4bb8]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allIdentified ? 'Continue →' : `Identify ${INDICATORS.length - progress} more`}
            </button>
          </div>
        </div>
      </div>

      {/* Tactic Selection Modal */}
      {selectedIndicator && showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCancel}
          />
          
          <div
            className="fixed z-50 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="p-6">
              <h3 className="font-bold text-gray-900 text-xl mb-5">
                What tactic is this?
              </h3>
              
              <div className="space-y-3">
                {TACTIC_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTacticSelect(option.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-[#2B5FD9] hover:bg-blue-50 transition-all bg-white"
                  >
                    <div className="font-semibold text-gray-900 mb-1">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
              
              {wrongAnswer && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-semibold">
                    ❌ Incorrect answer. Try again!
                  </p>
                  <p className="text-red-500 text-xs mt-1">
                    Lives remaining: {lives}
                  </p>
                </div>
              )}
              
              <button
                onClick={handleCancel}
                className="w-full mt-4 text-gray-600 hover:text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
            <div className="bg-gradient-to-r from-[#2B5FD9] to-[#1e4bb8] p-8 rounded-t-2xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🎯</span>
                <h2 className="text-3xl font-bold">How to Play</h2>
              </div>
              <p className="text-white/90 text-lg">
                Test your phishing detection skills and earn more acorns!
              </p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Find the Yellow Highlighted Areas
                    </h3>
                    <p className="text-gray-600">
                      The email below contains <strong>3 phishing indicators</strong> marked with pulsing yellow highlights. Each has a numbered badge.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Click and Identify the Tactic
                    </h3>
                    <p className="text-gray-600">
                      Click on each highlighted area and select the correct phishing tactic from the list. Each tactic has a description to help you learn.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold text-white">
                    ❤️
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      You Have 3 Lives
                    </h3>
                    <p className="text-gray-600">
                      Choose carefully! Each wrong answer loses a life. Don't worry - you can try again if you get it wrong.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Complete All 3 to Continue
                    </h3>
                    <p className="text-gray-600">
                      Correctly identify all indicators to unlock the continue button. Highlights turn green when you get them right!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> Look carefully at sender addresses, urgent language, and suspicious links. These are common signs of phishing!
                </p>
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full bg-[#2B5FD9] text-white font-bold py-4 rounded-lg hover:bg-[#1e4bb8] transition-colors text-lg"
              >
                Got it! Let's Start 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {lives === 0 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 rounded-t-2xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">💔</span>
                <h2 className="text-3xl font-bold">Out of Lives!</h2>
              </div>
              <p className="text-white/90 text-lg">
                Don't worry - learning takes practice! You can try again in your next training email.
              </p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span>📚</span>
                  Here are the correct answers:
                </h3>
                
                <div className="space-y-4">
                  {INDICATORS.map((indicator, index) => (
                    <div key={indicator.id} className="bg-white rounded-lg p-4 border-2 border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#2B5FD9] text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 mb-1">
                            {indicator.label}
                          </div>
                          <div className="text-sm text-gray-600">
                            {indicator.description}
                          </div>
                          {identifiedIndicators.has(indicator.id) && (
                            <div className="mt-2 flex items-center gap-1 text-green-600 text-sm font-semibold">
                              <CheckCircle2 className="w-4 h-4" />
                              You got this one correct!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Remember:</strong> Always verify sender addresses, be cautious of urgent language, and never click suspicious links. These skills will help you spot phishing attempts in real emails!
                </p>
              </div>

              <button
                onClick={onSkipToLeaderboard}
                className="w-full bg-[#2B5FD9] text-white font-bold py-4 rounded-lg hover:bg-[#1e4bb8] transition-colors text-lg"
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