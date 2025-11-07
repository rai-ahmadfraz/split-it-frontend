export interface UserBalance {
  userId: number;
  userName: string;
  userEmail: string;
  balance: number;
  status: string;
}

export interface BalanceSummary {
  netBalance: number;
  overallStatus: string;
}

export interface ExpenseSummary {
  summary: BalanceSummary;
  users: UserBalance[];
}

export interface Member {
  userId: number;
  name: string;
  amount: number;
}

export interface PaidBy {
  userId: number;
  name: string;
}

export interface Owes {
  userId: number;
  name: string;
  amount: number;
}

export interface Expense {
  expenseId: number;          // Unique ID of the expense
  title: string;              // Name/description of the expense
  totalAmount: number;        // Total amount of the expense
  paidBy: PaidBy;             // Who paid the expense
  owes: Owes;                 // Who owes what
  members: Member[];          // List of members and their share
  status: string;             // Status like "you owe" or "owes you"
  createdAt: string;          // ISO date string of creation
}
