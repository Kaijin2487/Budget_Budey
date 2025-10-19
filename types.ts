export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export enum TransactionCategory {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  BILLS = 'Bills',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SHOPPING = 'Shopping',
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  OTHER = 'Other',
}

export enum UserType {
  GIG_WORKER = 'Gig Worker',
  SALARIED = 'Salaried',
  STUDENT = 'Student',
  OTHER = 'Other',
}

export enum IncomeFrequency {
  WEEKLY = 'Weekly',
  BI_WEEKLY = 'Bi-Weekly',
  MONTHLY = 'Monthly',
  IRREGULAR = 'Irregular',
}

export interface UserProfile {
  userType: UserType | null;
  incomeFrequency: IncomeFrequency | null;
}

export interface Account {
  id: string;
  name: string;
  type: 'Bank' | 'Credit Card' | 'UPI';
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  accountId: string;
}

export interface FixedExpense {
  id: string;
  description: string;
  amount: number;
  dueDate: number; // Day of the month
  accountId: string;
}
