import { useState, useEffect, useRef } from 'react';

interface Indicator {
  id: string;
  type: 'domain' | 'urgency' | 'link';
  label: string;
  description: string;
  position: { top: string; left: string; width: string; height: string };
}

interface MicroLessonProps {
  onContinue: () => void;
  totalAcorns: number;
}

const INDICATORS: Indicator[] = [
  {
    id: 'domain',
    type: 'domain',
    label: 'Suspicious Sender Domain',
    description: 'The email address uses a suspicious domain that mimics a legitimate company',
    position: { top: '8%', left: '5%', width: '52%', height: '8%' }
  },
  {
    id: 'urgency',
    type: 'urgency',
    label: 'Artificial Urgency',
    description: 'Creates false time pressure with phrases like "FINAL HOURS" and "expires soon"',
    position: { top: '42%', left: '5%', width: '90%', height: '18%' }
  },
  {
    id: 'link',
    type: 'link',
    label: 'Suspicious Call-to-Action',
    description: 'Pressures you to click immediately without verifying the legitimacy',
    position: { top: '75%', left: '5%', width: '42%', height: '10%' }
  }
];

export function MicroLesson({ onContinue, totalAcorns }: MicroLessonProps) {
  const [currentIndicator, setCurrentIndicator] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const indicator1Ref = useRef<HTMLDivElement>(null);
  const indicator2Ref = useRef<HTMLDivElement>(null);
  const indicator3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [indicator1Ref, indicator2Ref, indicator3Ref];
    const currentRef = refs[currentIndicator];
    if (currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [currentIndicator]);

  const handleNext = () => {
    if (currentIndicator < INDICATORS.length - 1) {
      setCurrentIndicator(prev => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndicator > 0) {
      setCurrentIndicator(prev => prev - 1);
    }
  };

  const currentIndicatorData = INDICATORS[currentIndicator];

  return (
    <div className="min-h-screen bg-[#2B5FD9] flex flex-col">
      {/* Header */}
      <div className="bg-[#2B5FD9] p-6 border-b border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-xl">CyberNut 🐿️</span>
              <div className="ml-8">
                <div className="text-white text-sm font-semibold">📚 Learn the Phishing Tactics</div>
                <div className="text-white/80 text-xs">Understanding what makes this email suspicious</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                <div className="text-white text-sm">Progress</div>
                <div className="text-white font-bold text-2xl">{currentIndicator + 1}/{INDICATORS.length}</div>
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
                    <div className="relative inline-block" ref={indicator1Ref}>
                      <div className="text-sm text-gray-600">&lt;deals@techzone-summer-clearance.net&gt;</div>
                      <div
                        className={`absolute inset-0 rounded transition-all ${
                          currentIndicator === 0
                            ? 'bg-yellow-300/40 border-4 border-yellow-500 animate-pulse'
                            : 'bg-gray-300/20 border-2 border-gray-400'
                        }`}
                        style={{ top: '-4px', left: '-4px', right: '-4px', bottom: '-4px' }}
                      >
                        {currentIndicator === 0 && (
                          <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#2B5FD9] text-white rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
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
                <div className="mt-4 relative inline-block" ref={indicator2Ref}>
                  <h2 className="text-2xl font-bold">
                    🔥 FINAL HOURS: 80% off Electronics - Exclusive access expires soon!
                  </h2>
                  <div
                    className={`absolute inset-0 rounded transition-all ${
                      currentIndicator === 1
                        ? 'bg-yellow-300/40 border-4 border-yellow-500 animate-pulse'
                        : 'bg-gray-300/20 border-2 border-gray-400'
                    }`}
                    style={{ top: '-4px', left: '-4px', right: '-4px', bottom: '-4px' }}
                  >
                    {currentIndicator === 1 && (
                      <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#2B5FD9] text-white rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
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
                  <div className="pt-4 relative inline-block" ref={indicator3Ref}>
                    <div className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg inline-block">
                      Claim Your 80% Discount Now →
                    </div>
                    <div
                      className={`absolute inset-0 rounded-lg transition-all ${
                        currentIndicator === 2
                          ? 'bg-yellow-300/40 border-4 border-yellow-500 animate-pulse'
                          : 'bg-gray-300/20 border-2 border-gray-400'
                      }`}
                      style={{ top: '-8px', left: '-8px', right: '-8px', bottom: '-8px' }}
                    >
                      {currentIndicator === 2 && (
                        <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#2B5FD9] text-white rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
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

      {/* Bottom Info Panel */}
      {!showComplete && (
        <div className="sticky bottom-0 bg-white border-t shadow-lg p-8 animate-in slide-in-from-bottom duration-500 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#2B5FD9] text-white rounded-full flex items-center justify-center font-bold text-3xl shadow-lg">
                {currentIndicator + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {currentIndicatorData.label}
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  {currentIndicatorData.description}
                </p>
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-yellow-900">
                    {currentIndicator === 0 && '🔍 Notice: "techzone-summer-clearance.net" is NOT TechZone\'s real domain'}
                    {currentIndicator === 1 && '⏰ Red Flag: "FINAL HOURS" and "expires soon" create fake urgency'}
                    {currentIndicator === 2 && '⚠️ Warning: Pressuring you to click without thinking'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndicator === 0}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    currentIndicator === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-[#2B5FD9] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1e4bb8] transition-colors shadow-lg"
                >
                  {currentIndicator < INDICATORS.length - 1 ? 'Next →' : 'Continue →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal Overlay */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Green header */}
            <div className="relative p-6 pb-5" style={{ background: 'linear-gradient(135deg, #4CAF7D 0%, #3DA86E 100%)' }}>
              <div className="pr-24">
                <h2 className="text-2xl font-black text-white leading-tight mb-2">
                  Great! You've learned all<br />3 phishing tactics
                </h2>
                <p className="text-white/90 text-sm">
                  Now let's put your knowledge to the test. Can you identify these tactics on your own?
                </p>
              </div>
              <div className="absolute right-4 top-4 text-6xl select-none">🎓🐿️</div>
            </div>

            {/* What you learned */}
            <div className="p-6 space-y-3">
              <p className="font-bold text-gray-900 text-sm mb-3">What you learned</p>

              {/* Indicator 1 */}
              <div>
                <div className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-lg mb-1.5 inline-block">
                  1 &nbsp; &lt;deals@techzone-summer-clearance.net&gt;
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-xl mt-0.5">⚠️</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Suspicious Sender Domain</p>
                    <p className="text-gray-500 text-xs">The email address uses a suspicious domain that mimics a legitimate company</p>
                  </div>
                </div>
              </div>

              {/* Indicator 2 */}
              <div>
                <div className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-lg mb-1.5 inline-block">
                  2 &nbsp; 🔥 FINAL HOURS: 80% off Electronics - Exclusive access expires soon!
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-xl mt-0.5">🔔</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Artificial Urgency</p>
                    <p className="text-gray-500 text-xs">Creates false time pressure with phrases like "FINAL HOURS" and "expires soon"</p>
                  </div>
                </div>
              </div>

              {/* Indicator 3 */}
              <div>
                <div className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-lg mb-1.5 inline-block">
                  3 &nbsp; Claim Your 80% Discount Now
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-xl mt-0.5">🖱️</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Suspicious Call-to-Action</p>
                    <p className="text-gray-500 text-xs">Pressures you to click immediately without verifying the legitimacy</p>
                  </div>
                </div>
              </div>

              {/* Remember tip */}
              <div className="bg-blue-50 rounded-xl p-3 mt-1">
                <p className="text-xs text-blue-800">
                  <span className="font-bold">🔵 Remember:</span> Always verify sender addresses, be cautious of urgent language, and never click suspicious links. These skills will help you spot phishing attempts in real emails!
                </p>
              </div>

              <button
                onClick={onContinue}
                className="w-full bg-[#2B5FD9] text-white font-bold py-4 rounded-2xl hover:bg-[#1e4bb8] transition-colors text-base shadow-lg mt-2"
              >
                Ready for Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
