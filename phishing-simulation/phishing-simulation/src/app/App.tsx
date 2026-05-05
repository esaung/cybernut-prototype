import { useState } from 'react';
import { ReportCongratulations } from '@/app/components/report-congratulations';
import { MicroLesson } from '@/app/components/micro-lesson';
import { InteractiveAssessment } from '@/app/components/interactive-assessment';
import { RemediationVideo } from '@/app/components/remediation-video';
type Step = 'congratulations' | 'micro-lesson' | 'assessment' | 'remediation';

interface MissedIndicator {
  id: string;
  type: string;
  label: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('congratulations');
  const [totalAcorns, setTotalAcorns] = useState(3);
  const [usedHints, setUsedHints] = useState(false);
  const [missedIndicators, setMissedIndicators] = useState<MissedIndicator[]>([]);

  const handleEarnMore = () => {
    setCurrentStep('micro-lesson');
  };

  const handleMicroLessonContinue = () => {
    setCurrentStep('assessment');
  };

  const handleGoToLeaderboard = () => {
    handleRestart();
  };

  const handleAssessmentComplete = (usedHintsInAssessment: boolean, missed: MissedIndicator[]) => {
    setUsedHints(usedHintsInAssessment);
    setMissedIndicators(missed);

    const indicatorsFoundBeforeHints = 3 - missed.length;
    const acornsEarned = indicatorsFoundBeforeHints;
    setTotalAcorns(prev => prev + acornsEarned);

    if (usedHintsInAssessment && missed.length > 0) {
      setCurrentStep('remediation');
    } else {
      handleRestart();
    }
  };

  const handleRemediationComplete = () => {
    const videosWatched = missedIndicators.length;
    setTotalAcorns(prev => prev + videosWatched);
    handleRestart();
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
    </div>
  );
}
