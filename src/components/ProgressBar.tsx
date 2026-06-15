type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-area">
      <div className="progress-info">
        <span>
          Etapa {currentStep} de {totalSteps}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;