import { ChevronRight } from 'lucide-react';
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
                        style={{
                          top: '-4px',
                          left: '-4px',
                          right: '-4px',
                          bottom: '-4px'
                        }}
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
                    style={{
                      top: '-4px',
                      left: '-4px',
                      right: '-4px',
                      bottom: '-4px'
                    }}
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
                      style={{
                        top: '-8px',
                        left: '-8px',
                        right: '-8px',
                        bottom: '-8px'
                      }}
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

      {/* Complete Screen */}
      {showComplete && (
        <div className="bg-white border-t shadow-lg p-8 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Great! You've learned all 3 phishing tactics!
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Now let's put your knowledge to the test. Can you identify these tactics on your own?
            </p>
            <button
              onClick={onContinue}
              className="bg-[#2B5FD9] text-white font-bold px-12 py-5 rounded-xl hover:bg-[#1e4bb8] transition-colors text-xl shadow-lg inline-flex items-center gap-3"
            >
              Ready for the Assessment
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}