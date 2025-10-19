import React, { useMemo } from 'react';
import type { Transaction } from '../types';
import { TransactionType } from '../types';
import ExpenseChart from '../components/ExpenseChart';
import type { Page } from '../App';

const DashboardSummary: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center shadow">
        <div className="text-sm">Income</div>
        <div className="font-bold text-lg">₹{income.toLocaleString()}</div>
      </div>
      <div className="bg-red-100 text-red-800 p-3 rounded-lg text-center shadow">
        <div className="text-sm">Expenses</div>
        <div className="font-bold text-lg">₹{expenses.toLocaleString()}</div>
      </div>
      <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center shadow">
        <div className="text-sm">Balance</div>
        <div className={`font-bold text-lg ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
          ₹{balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

interface DashboardProps {
  transactions: Transaction[];
  navigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, navigate }) => {
  return (
    <div className="p-4 space-y-6">
      <DashboardSummary transactions={transactions} />
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2 text-primary">Spending Breakdown</h2>
        <ExpenseChart transactions={transactions} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2 text-primary">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate('add')} className="p-4 bg-accent text-white rounded-lg shadow text-center font-semibold">Add Transaction</button>
          <button onClick={() => navigate('transactions')} className="p-4 bg-base-200 text-content rounded-lg shadow text-center font-semibold">View Activity</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
