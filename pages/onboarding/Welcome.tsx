import React from 'react';

interface OnboardingWelcomeProps {
  onNext: () => void;
}

const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-base-100 p-8 text-center">
        <div className="flex-grow flex flex-col items-center justify-center">
            <span className="text-8xl mb-6">👋</span>
            <h1 className="text-3xl font-bold text-primary mb-4">Welcome to FinCoach AI!</h1>
            <p className="text-content text-lg max-w-md">
                Take control of your finances. We'll help you track spending, manage irregular income, and build savings with smart, personalized insights.
            </p>
        </div>
        <button
            onClick={onNext}
            className="w-full max-w-md bg-accent text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-secondary transition-transform transform hover:scale-105"
        >
            Let's Get Started
        </button>
    </div>
  );
};

export default OnboardingWelcome;
