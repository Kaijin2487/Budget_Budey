import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white animate-pulse">
      <span className="text-8xl mb-4">💸</span>
      <h1 className="text-4xl font-bold">FinCoach AI</h1>
      <p className="mt-2 text-lg">Your Personal Financial Guide</p>
    </div>
  );
};

export default SplashScreen;
