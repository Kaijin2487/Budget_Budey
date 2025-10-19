import React, { useState, useEffect, useCallback } from 'react';
import type { Account, FixedExpense, Transaction, UserProfile } from './types';
import { TransactionCategory, TransactionType } from './types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, MOCK_FIXED_EXPENSES } from './constants';

import SplashScreen from './pages/SplashScreen';
import OnboardingWelcome from './pages/onboarding/Welcome';
import OnboardingIncomeDetails from './pages/onboarding/IncomeDetails';
import OnboardingConnectData from './pages/onboarding/ConnectData';
import Dashboard from './pages/Dashboard';
import TransactionsList from './pages/TransactionsList';
import AddTransaction from './pages/AddTransaction';
import Nudges from './pages/Nudges';
import Settings from './pages/Settings';
import BottomNav from './components/BottomNav';

export type Page = 'dashboard' | 'transactions' | 'add' | 'nudges' | 'settings';

const Header = () => (
  <header className="bg-primary text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-10">
    <div className="flex items-center space-x-2">
      <span className="text-2xl">💸</span>
      <h1 className="text-xl font-bold">FinCoach AI</h1>
    </div>
    <img src="https://i.pravatar.cc/40" alt="User Avatar" className="rounded-full" />
  </header>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // For splash screen
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({ userType: null, incomeFrequency: null });
  
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [accounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [fixedExpenses] = useState<FixedExpense[]>(MOCK_FIXED_EXPENSES);
  
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleNextOnboarding = () => setOnboardingStep(prev => prev + 1);
  
  const handleFinishOnboarding = () => {
    setIsOnboardingComplete(true);
  };
  
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transactionWithId: Transaction = {
      ...newTransaction,
      id: `t${transactions.length + 1}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [transactionWithId, ...prev]);
    navigate('transactions');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard transactions={transactions} navigate={navigate} />;
      case 'transactions':
        return <TransactionsList transactions={transactions} fixedExpenses={fixedExpenses} accounts={accounts} />;
      case 'add':
        return <AddTransaction accounts={accounts} addTransaction={handleAddTransaction} navigate={navigate} />;
      case 'nudges':
        return <Nudges transactions={transactions} fixedExpenses={fixedExpenses} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard transactions={transactions} navigate={navigate} />;
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isOnboardingComplete) {
    switch (onboardingStep) {
      case 0:
        return <OnboardingWelcome onNext={handleNextOnboarding} />;
      case 1:
        return <OnboardingIncomeDetails onNext={handleNextOnboarding} userProfile={userProfile} setUserProfile={setUserProfile} />;
      case 2:
        return <OnboardingConnectData onFinish={handleFinishOnboarding} />;
      default:
        return <OnboardingWelcome onNext={handleNextOnboarding} />;
    }
  }

  return (
    <div className="bg-base-100 min-h-screen font-sans text-content max-w-lg mx-auto shadow-2xl flex flex-col">
      <Header />
      <main className="flex-grow pb-20">
        {renderPage()}
      </main>
      <BottomNav activePage={currentPage} navigate={navigate} />
    </div>
  );
};

export default App;
