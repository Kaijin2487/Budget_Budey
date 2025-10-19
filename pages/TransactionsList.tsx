import React, { useState } from 'react';
import type { Account, FixedExpense, Transaction } from '../types';
import { TransactionCategory, TransactionType } from '../types';

const categoryIcons: Record<TransactionCategory, string> = {
  [TransactionCategory.FOOD]: '🍔',
  [TransactionCategory.TRANSPORT]: '🚗',
  [TransactionCategory.BILLS]: '💡',
  [TransactionCategory.ENTERTAINMENT]: '🎬',
  [TransactionCategory.HEALTH]: '❤️',
  [TransactionCategory.SHOPPING]: '🛍️',
  [TransactionCategory.SALARY]: '💼',
  [TransactionCategory.FREELANCE]: '💻',
  [TransactionCategory.OTHER]: '❓',
};

const TransactionItem: React.FC<{ transaction: Transaction, account?: Account }> = ({ transaction, account }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  return (
    <div className="flex items-center p-3 border-b border-base-200">
      <div className="text-2xl p-3 bg-base-200 rounded-lg mr-4">{categoryIcons[transaction.category]}</div>
      <div className="flex-grow">
        <p className="font-semibold text-content">{transaction.description}</p>
        <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()} | {account?.name}</p>
      </div>
      <div className={`font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
        {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
      </div>
    </div>
  );
};

const FixedExpenseItem: React.FC<{ expense: FixedExpense, account?: Account }> = ({ expense, account }) => (
    <div className="flex items-center p-3 border-b border-base-200">
        <div className="text-2xl p-3 bg-base-200 rounded-lg mr-4">🗓️</div>
        <div className="flex-grow">
            <p className="font-semibold text-content">{expense.description}</p>
            <p className="text-sm text-gray-500">Due on day {expense.dueDate} | {account?.name}</p>
        </div>
        <div className="font-bold text-red-600">
            -₹{expense.amount.toLocaleString()}
        </div>
    </div>
);


interface TransactionsListProps {
  transactions: Transaction[];
  fixedExpenses: FixedExpense[];
  accounts: Account[];
}

type ActiveTab = 'recent' | 'fixed';

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, fixedExpenses, accounts }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('recent');
  const getAccountById = (id: string) => accounts.find(acc => acc.id === id);

  return (
    <div className="p-4">
      <div className="flex justify-around bg-base-200 rounded-lg p-1 mb-4">
        <button 
          onClick={() => setActiveTab('recent')}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'recent' ? 'bg-primary text-white shadow' : 'text-gray-600'}`}
        >
          Recent Activity
        </button>
        <button 
          onClick={() => setActiveTab('fixed')}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'fixed' ? 'bg-primary text-white shadow' : 'text-gray-600'}`}
        >
          Fixed Expenses
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {activeTab === 'recent' && (
          <div>
            {transactions.length > 0 ? transactions.map(t => (
              <TransactionItem key={t.id} transaction={t} account={getAccountById(t.accountId)} />
            )) : <p className="p-4 text-center text-gray-500">No recent transactions.</p>}
          </div>
        )}
        {activeTab === 'fixed' && (
          <div>
            {fixedExpenses.length > 0 ? fixedExpenses.map(fe => (
              <FixedExpenseItem key={fe.id} expense={fe} account={getAccountById(fe.accountId)} />
            )) : <p className="p-4 text-center text-gray-500">No fixed expenses added.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
