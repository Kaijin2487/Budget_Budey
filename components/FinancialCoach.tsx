
import React, { useState, useCallback, useEffect } from 'react';
import { getFinancialAdvice } from '../services/geminiService';
import type { Transaction, FixedExpense } from '../types';

interface FinancialCoachProps {
  transactions: Transaction[];
  fixedExpenses: FixedExpense[];
}

const FinancialCoach: React.FC<FinancialCoachProps> = ({ transactions, fixedExpenses }) => {
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getFinancialAdvice(transactions, fixedExpenses);
      setAdvice(result);
    } catch (err) {
      setError('Failed to fetch advice.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [transactions, fixedExpenses]);

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatAdvice = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
          return <p key={index} className="mt-4 mb-2 font-bold text-lg text-secondary">{line}</p>;
        }
        if (line.startsWith('* ')) {
          return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        }
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">Your AI Financial Coach</h2>
        <button
          onClick={fetchAdvice}
          disabled={isLoading}
          className="p-2 rounded-full bg-accent text-white hover:bg-secondary disabled:bg-gray-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 10a1 1 0 011-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-base-200 rounded w-3/4"></div>
          <div className="h-4 bg-base-200 rounded w-full"></div>
          <div className="h-4 bg-base-200 rounded w-5/6"></div>
          <div className="h-4 bg-base-200 rounded w-1/2 mt-4"></div>
           <div className="h-4 bg-base-200 rounded w-full"></div>
          <div className="h-4 bg-base-200 rounded w-full"></div>
        </div>
      )}
      
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && advice && (
        <div className="text-content prose prose-sm max-w-none">
          {formatAdvice(advice)}
        </div>
      )}
    </div>
  );
};

export default FinancialCoach;
