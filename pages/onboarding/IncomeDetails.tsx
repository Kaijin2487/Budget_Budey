import React from 'react';
import type { UserProfile } from '../../types';
import { UserType, IncomeFrequency } from '../../types';

interface OnboardingIncomeDetailsProps {
  onNext: () => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const OnboardingIncomeDetails: React.FC<OnboardingIncomeDetailsProps> = ({ onNext, userProfile, setUserProfile }) => {
    
  const handleUserTypeChange = (type: UserType) => {
    setUserProfile(prev => ({ ...prev, userType: type }));
  };

  const handleFrequencyChange = (freq: IncomeFrequency) => {
    setUserProfile(prev => ({ ...prev, incomeFrequency: freq }));
  };

  const isNextDisabled = !userProfile.userType || !userProfile.incomeFrequency;

  return (
    <div className="flex flex-col justify-between min-h-screen bg-base-100 p-6">
        <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Tell us about you</h1>
            <p className="text-content mb-8">This helps us personalize your financial coaching.</p>

            <div className="mb-8">
                <h2 className="font-semibold text-lg mb-3">What best describes you?</h2>
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(UserType).map(type => (
                        <button key={type} onClick={() => handleUserTypeChange(type)} className={`p-4 rounded-lg border-2 text-center font-semibold transition-colors ${userProfile.userType === type ? 'bg-primary border-primary text-white' : 'bg-white border-base-300'}`}>
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-lg mb-3">How often do you get paid?</h2>
                <div className="grid grid-cols-2 gap-3">
                     {Object.values(IncomeFrequency).map(freq => (
                        <button key={freq} onClick={() => handleFrequencyChange(freq)} className={`p-4 rounded-lg border-2 text-center font-semibold transition-colors ${userProfile.incomeFrequency === freq ? 'bg-primary border-primary text-white' : 'bg-white border-base-300'}`}>
                            {freq}
                        </button>
                    ))}
                </div>
            </div>
        </div>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="w-full bg-accent text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-secondary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default OnboardingIncomeDetails;
