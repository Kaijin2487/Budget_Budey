import React from 'react';
import type { Transaction, FixedExpense } from '../types';
import FinancialCoach from '../components/FinancialCoach';

interface NudgesProps {
  transactions: Transaction[];
  fixedExpenses: FixedExpense[];
}

const Nudges: React.FC<NudgesProps> = ({ transactions, fixedExpenses }) => {
  return (
    <div className="p-4">
      <FinancialCoach transactions={transactions} fixedExpenses={fixedExpenses} />
    </div>
  );
};

export default Nudges;
