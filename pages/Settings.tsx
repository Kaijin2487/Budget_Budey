import React from 'react';

const Settings: React.FC = () => {
    
    const SettingItem: React.FC<{icon: string, label: string}> = ({icon, label}) => (
        <button className="flex items-center w-full p-4 bg-white rounded-lg shadow border-2 border-transparent hover:border-accent transition-all text-left">
            <span className="text-2xl mr-4">{icon}</span>
            <span className="font-semibold text-content flex-grow">{label}</span>
            <span className="ml-auto text-gray-400">→</span>
        </button>
    );

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold text-primary mb-6">Settings & Profile</h1>
        <div className="space-y-3">
            <SettingItem icon="👤" label="Profile Information" />
            <SettingItem icon="🔔" label="Notification Preferences" />
            <SettingItem icon="🔗" label="Connected Accounts" />
            <SettingItem icon="🔒" label="Privacy & Security" />
            <SettingItem icon="❓" label="Help & Support" />
        </div>
        <div className="mt-8 text-center">
            <button className="font-semibold text-red-600">
                Log Out
            </button>
            <p className="text-xs text-gray-400 mt-2">Version 1.0.0</p>
        </div>
    </div>
  );
};

export default Settings;
