
import type { Account, FixedExpense, Transaction } from './types';
import { TransactionCategory, TransactionType } from './types';

export const MOCK_ACCOUNTS: Account[] = [
  { id: 'acc1', name: 'Main Bank Account', type: 'Bank', balance: 45200 },
  { id: 'acc2', name: 'GPay UPI', type: 'UPI', balance: 0 },
  { id: 'acc3', name: 'Visa Credit Card', type: 'Credit Card', balance: -12500 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-07-28', description: 'Freelance Project', amount: 15000, type: TransactionType.INCOME, category: TransactionCategory.FREELANCE, accountId: 'acc1' },
  { id: 't2', date: '2024-07-27', description: 'Groceries', amount: 2300, type: TransactionType.EXPENSE, category: TransactionCategory.FOOD, accountId: 'acc2' },
  { id: 't3', date: '2024-07-26', description: 'Movie Tickets', amount: 750, type: TransactionType.EXPENSE, category: TransactionCategory.ENTERTAINMENT, accountId: 'acc3' },
  { id: 't4', date: '2024-07-25', description: 'Electricity Bill', amount: 1200, type: TransactionType.EXPENSE, category: TransactionCategory.BILLS, accountId: 'acc1' },
  { id: 't5', date: '2024-07-24', description: 'Uber Ride', amount: 350, type: TransactionType.EXPENSE, category: TransactionCategory.TRANSPORT, accountId: 'acc2' },
  { id: 't6', date: '2024-07-22', description: 'Client Payment', amount: 25000, type: TransactionType.INCOME, category: TransactionCategory.FREELANCE, accountId: 'acc1' },
  { id: 't7', date: '2024-07-20', description: 'Online Shopping', amount: 3500, type: TransactionType.EXPENSE, category: TransactionCategory.SHOPPING, accountId: 'acc3' },
  { id: 't8', date: '2024-07-18', description: 'Dinner Out', amount: 1800, type: TransactionType.EXPENSE, category: TransactionCategory.FOOD, accountId: 'acc3' },
  { id: 't9', date: '2024-07-15', description: 'Salary', amount: 50000, type: TransactionType.INCOME, category: TransactionCategory.SALARY, accountId: 'acc1' },
  { id: 't10', date: '2024-07-10', description: 'Pharmacy', amount: 500, type: TransactionType.EXPENSE, category: TransactionCategory.HEALTH, accountId: 'acc2' },
];

export const MOCK_FIXED_EXPENSES: FixedExpense[] = [
    { id: 'fe1', description: 'Home Loan EMI', amount: 18000, dueDate: 5, accountId: 'acc1' },
    { id: 'fe2', description: 'Phone Bill', amount: 800, dueDate: 10, accountId: 'acc3' },
    { id: 'fe3', description: 'Netflix Subscription', amount: 499, dueDate: 15, accountId: 'acc3' },
];
