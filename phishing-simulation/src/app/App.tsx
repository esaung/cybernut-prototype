import { useState } from 'react';
import { ReportCongratulations } from '@/app/components/report-congratulations';
import { MicroLesson } from '@/app/components/micro-lesson';
import { InteractiveAssessment } from '@/app/components/interactive-assessment';
import { RemediationVideo } from '@/app/components/remediation-video';
import { Leaderboard } from '@/app/components/leaderboard';

type Step = 'congratulations' | 'micro-lesson' | 'assessment' | 'remediation' | 'leaderboard';

interface MissedIndicator {
  id: string;
  type: string;
  label: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('congratulations');
  const [totalAcorns, setTotalAcorns] = useState(3); // Initial 3 acorns from reporting
  const [usedHints, setUsedHints] = useState(false);
  const [missedIndicators, setMissedIndicators] = useState<MissedIndicator[]>([]);

  const handleEarnMore = () => {
    setCurrentStep('micro-lesson');
  };

  const handleMicroLessonContinue = () => {
    setCurrentStep('assessment');
  };

  const handleGoToLeaderboard = () => {
    setCurrentStep('leaderboard');
  };

  const handleAssessmentComplete = (usedHintsInAssessment: boolean, missed: MissedIndicator[]) => {
    setUsedHints(usedHintsInAssessment);
    setMissedIndicators(missed);
    
    // Award acorns for indicators found without hints
    const indicatorsFoundBeforeHints = 3 - missed.length;
    const acornsEarned = indicatorsFoundBeforeHints;
    setTotalAcorns(prev => prev + acornsEarned);

    // If user used hints, go to remediation to watch videos for missed indicators
    if (usedHintsInAssessment && missed.length > 0) {
      setCurrentStep('remediation');
    } else {
      setCurrentStep('leaderboard');
    }
  };

  const handleRemediationComplete = () => {
    // Award acorns for each video watched
    const videosWatched = missedIndicators.length;
    setTotalAcorns(prev => prev + videosWatched);
    setCurrentStep('leaderboard');
  };

  const handleRestart = () => {
    setCurrentStep('congratulations');
    setTotalAcorns(3);
    setUsedHints(false);
    setMissedIndicators([]);
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'congratulations' && (
        <ReportCongratulations
          acornsEarned={3}
          totalAcorns={totalAcorns}
          onEarnMore={handleEarnMore}
          onGoToLeaderboard={handleGoToLeaderboard}
        />
      )}

      {currentStep === 'micro-lesson' && (
        <MicroLesson
          onContinue={handleMicroLessonContinue}
          totalAcorns={totalAcorns}
        />
      )}

      {currentStep === 'assessment' && (
        <InteractiveAssessment
          onComplete={handleAssessmentComplete}
          onSkipToLeaderboard={handleGoToLeaderboard}
          totalAcorns={totalAcorns}
        />
      )}

      {currentStep === 'remediation' && (
        <RemediationVideo
          missedIndicators={missedIndicators}
          onComplete={handleRemediationComplete}
          onSkipToLeaderboard={handleGoToLeaderboard}
          totalAcorns={totalAcorns}
        />
      )}

      {currentStep === 'leaderboard' && (
        <Leaderboard
          userAcorns={totalAcorns}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}