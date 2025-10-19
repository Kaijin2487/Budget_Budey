import React, { useState } from 'react';
import type { Account, Transaction } from '../types';
import { TransactionCategory, TransactionType } from '../types';
import type { Page } from '../App';

interface AddTransactionProps {
  accounts: Account[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  navigate: (page: Page) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ accounts, addTransaction, navigate }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>(TransactionCategory.FOOD);
  const [accountId, setAccountId] = useState<string>(accounts[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !accountId) {
      alert('Please fill all fields');
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      description,
      type,
      category,
      accountId,
    });
  };

  const expenseCategories = Object.values(TransactionCategory).filter(c => c !== TransactionCategory.SALARY && c !== TransactionCategory.FREELANCE);
  const incomeCategories = [TransactionCategory.SALARY, TransactionCategory.FREELANCE, TransactionCategory.OTHER];
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Add Transaction</h1>
        <button onClick={() => navigate('dashboard')} className="text-gray-500 font-semibold">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex bg-base-200 rounded-lg p-1">
            <button type="button" onClick={() => { setType(TransactionType.EXPENSE); setCategory(TransactionCategory.FOOD); }} className={`w-1/2 p-2 rounded-md font-semibold text-center ${type === TransactionType.EXPENSE ? 'bg-red-500 text-white shadow' : ''}`}>Expense</button>
            <button type="button" onClick={() => { setType(TransactionType.INCOME); setCategory(TransactionCategory.SALARY); }} className={`w-1/2 p-2 rounded-md font-semibold text-center ${type === TransactionType.INCOME ? 'bg-green-500 text-white shadow' : ''}`}>Income</button>
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
             <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <span className="text-gray-500 sm:text-lg font-bold">₹</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 text-2xl font-bold border-base-300 rounded-md"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-base-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="mt-1 block w-full border border-base-300 rounded-md shadow-sm py-2 px-3 bg-white"
          >
            {(type === TransactionType.EXPENSE ? expenseCategories : incomeCategories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account</label>
          <select
            id="account"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="mt-1 block w-full border border-base-300 rounded-md shadow-sm py-2 px-3 bg-white"
          >
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-secondary transition-colors">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
