import React from 'react';

interface OnboardingConnectDataProps {
  onFinish: () => void;
}

const ConnectOption: React.FC<{ icon: string, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 bg-white rounded-lg shadow border-2 border-transparent hover:border-accent transition-all text-left">
        <span className="text-4xl mr-4">{icon}</span>
        <div>
            <h3 className="font-bold text-lg text-content">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
        <span className="ml-auto text-gray-400">→</span>
    </button>
);

const OnboardingConnectData: React.FC<OnboardingConnectDataProps> = ({ onFinish }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-base-100 p-6">
        <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Connect your data</h1>
            <p className="text-content mb-8">Automate tracking for the clearest financial picture. You can always add transactions manually.</p>

            <div className="space-y-4">
                <ConnectOption
                    icon="🏦"
                    title="Connect a Bank"
                    description="Securely link your bank for automatic updates."
                    onClick={onFinish} // Mock: finishes onboarding
                />
                 <ConnectOption
                    icon="💬"
                    title="Read SMS"
                    description="Allow access to transaction messages."
                    onClick={onFinish} // Mock: finishes onboarding
                />
                 <ConnectOption
                    icon="✍️"
                    title="Start Manually"
                    description="Add your income and expenses yourself."
                    onClick={onFinish}
                />
            </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
            By connecting, you agree to our Terms of Service and Privacy Policy.
        </p>
    </div>
  );
};

export default OnboardingConnectData;
