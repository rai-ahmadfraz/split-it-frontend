"use client";
import React from 'react';
import { useRequireAuth } from '@/hooks/authHooks';
import { userService } from '@/services/userService';
import { useState,useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { Capitalize } from '@/lib/commonFilter';
import { ExpenseSummary,Expense } from '@/interfaces/expense';

// Main component
const SplitBill: React.FC = () => {

    useRequireAuth('/login');
    const {user } = useUserStore();

  const [expenseSummary, setexpenseSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userExpenses, setUserExpenses] = useState<Record<number, Expense[]>>({});
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const fetchMemberExpenses = async (userId: number) => {
    // Toggle if already expanded
    if (expandedUserId === userId) {
      setExpandedUserId(null);
      return;
    }

    setLoading(true);
    try {
      const data: Expense[] = await userService.getExpensesByMemberId(userId);
      setUserExpenses((prev) => ({ ...prev, [userId]: data }));
      setExpandedUserId(userId);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data: ExpenseSummary = await userService.getExpenseSummary();
        setexpenseSummary(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch expense summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  
  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
      <div className="container-fluid py-3 bg-light" style={{ minHeight: '100vh', paddingBottom: '80px',}}>
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 mb-0">Split Bill</h1>
              <button className="btn btn-sm btn-outline-primary">
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            <p className="text-muted small mt-1">Track expenses and balances with friends</p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="card shadow text-white"
              style={{ 
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                border: 'none',
                borderRadius: '12px'
              }}
            >
              <div className="card-body py-3">
                <h5 className="mb-3 text-center" style={{ fontWeight: 500 }}>
                    👋 Welcome back, <span style={{ fontWeight: 700 }}>{Capitalize(user?.name)}</span>
                </h5>
                <h2 className="h5 card-title mb-2">Overall Balance</h2>
                <div className="h2 fw-bold mb-1">
                  {Number(expenseSummary?.summary.netBalance) < 0 ? '-' : ''}{formatCurrency(Number(expenseSummary?.summary.netBalance))}
                  
                </div>
                <p className="card-text small mb-0">{expenseSummary?.summary.overallStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Balances */}
        <div className="row mb-3">
          <div className="col-12">
            <h3 className="h5 mb-3">Users</h3>
          </div>
          
            {expenseSummary?.users.map((user) => (
                <div key={user.userId} className="col-12 mb-3">
                <div className="card shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
                    <div className="card-body p-3">
                    {/* User Info */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                        <div 
                            className={`rounded-circle d-flex align-items-center justify-content-center ${
                            user.balance < 0 ? 'bg-danger bg-opacity-10' : 'bg-success bg-opacity-10'
                            }`}
                            style={{ width: '45px', height: '45px' }}
                        >
                            <i className={`bi ${
                            user.balance < 0 ? 'bi-arrow-up-right text-danger' : 'bi-arrow-down-left text-success'
                            }`}></i>
                        </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                        <h5 className="card-title h6 mb-0">{user.userName}</h5>
                        <p className="text-muted small mb-0">{user.userEmail}</p>
                        </div>
                        <div className="flex-shrink-0">
                        <span 
                            className={`badge ${
                            user.balance < 0 
                                ? 'bg-danger bg-opacity-10 text-danger' 
                                : 'bg-success bg-opacity-10 text-success'
                            }`}
                        >
                            {user.status}
                        </span>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="text-muted small">Balance:</span>
                        <span 
                        className={`h5 fw-bold ${
                            user.balance < 0 ? 'text-danger' : 'text-success'
                        }`}
                        >
                        {user.balance < 0 ? '-' : ''}{formatCurrency(user.balance)}
                        </span>
                    </div>

                    {/* Button to toggle */}
                    <div className="mt-3 pt-2 border-top">
                        <button 
                        className={`btn w-100 btn-sm ${
                            user.balance < 0 ? 'btn-outline-danger' : 'btn-outline-success'
                        }`}
                        style={{ borderRadius: '8px' }}
                        >
                        <i className="bi bi-cash-coin me-1"></i>
                        {user.balance < 0 ? 'Settle Up' : 'Request Payment'}
                        </button>
                    </div>
                    <div className="mt-3 pt-2 border-top">
                        <button 
                        className={`btn w-100 btn-sm ${
                            user.balance < 0 ? 'btn-outline-danger' : 'btn-outline-success'
                        }`}
                        style={{ borderRadius: '8px' }}
                        onClick={() => fetchMemberExpenses(user.userId)}
                        >
                        <i className="bi bi-cash-coin me-1"></i>
                        See Expenses
                        </button>
                    </div>

                    {/* Expanded Section */}
                    {expandedUserId === user.userId && (
                        <div className="mt-2">
                            {userExpenses[user.userId]?.length > 0 ? (
                            userExpenses[user.userId].map((exp) => (
                                <div key={exp.expenseId} className="card mb-1 shadow-sm" style={{ borderRadius: '10px', fontSize: '0.85rem' }}>
                                <div className="card-body p-2">
                                    {/* Expense title */}
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                    <h6 className="mb-0" style={{ fontWeight: 600, color: "#2C3E50" }}>
                                        {exp.title}
                                    </h6>
                                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        {/* {new Date(exp.createdAt).toLocaleDateString()} */}
                                    </span>
                                    </div>

                                    {/* Paid by and total */}
                                    <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted">Paid by:</span>
                                    <span className="fw-bold">{exp.paidBy.name}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted">Total:</span>
                                    <span className="fw-bold">{formatCurrency(exp.totalAmount)}</span>
                                    </div>

                                    {/* Members as tags */}
                                    <div className="mt-1 d-flex flex-wrap gap-1">
                                    {exp.members.map((member) => (
                                        <span
                                        key={member.userId}
                                        style={{
                                            fontSize: '0.75rem',
                                            backgroundColor: '#f0f0f0',
                                            color: '#34495E',
                                            padding: '2px 6px',
                                            borderRadius: '12px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                        }}
                                        >
                                        {member.name}: {formatCurrency(member.amount)}
                                        </span>
                                    ))}
                                    </div>

                                    {/* Expense status */}
                                    <div className="mt-2">
                                    <span
                                        className={`badge ${
                                        exp.status === "you owe" ? "bg-danger bg-opacity-10 text-danger" : "bg-success bg-opacity-10 text-success"
                                        }`}
                                        style={{ borderRadius: '6px', fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
                                    >
                                        {exp.status}
                                    </span>
                                    </div>
                                </div>
                                </div>
                            ))
                            ) : (
                            <div className="text-muted small py-1">No expenses found</div>
                            )}
                        </div>
                    )}
                    </div>
                </div>
                </div>
            ))}
        </div>
      </div>
  );
};

export default SplitBill;