//   const getCategoryIcon = (category: string): string => {
//     const iconMap: { [key: string]: string } = {
//       housing: "house-door",
//       electronics: "tv",
//       utilities: "lightning-charge",
//       food: "cup-straw",
//       transportation: "car-front",
//       entertainment: "film"
//     };
//     return iconMap[category] || "receipt";
//   };

//   const getCategoryColor = (category: string): string => {
//     const colorMap: { [key: string]: string } = {
//       housing: "primary",
//       electronics: "success",
//       utilities: "warning",
//       food: "danger",
//       transportation: "info",
//       entertainment: "secondary"
//     };
//     return colorMap[category] || "dark";
//   };


// const expenseData: ExpenseSummary = {
//     summary: {
//       netBalance: -786.67,
//       overallStatus: "You owe 786.67"
//     },
//     users: [
//       {
//         userId: 2,
//         userName: "Fraz",
//         userEmail:'apple@gmail.com',
//         balance: -1026.67,
//         status: "you owe"
//       },
//       {
//         userId: 3,
//         userName: "ahmad",
//         userEmail:'bb@gmail.com',
//         balance: 240,
//         status: "owes you"
//       }
//     ],
//     recentExpenses: [
//       {
//         id: 1,
//         description: "Apartment Rent",
//         paidBy: "You",
//         amount: 1200.00,
//         date: "Mar 1, 2023",
//         category: "housing",
//         notes: "Monthly payment"
//       },
//       {
//         id: 2,
//         description: "New TV",
//         paidBy: "Fraz",
//         amount: 600.00,
//         date: "Feb 25, 2023",
//         category: "electronics",
//         notes: "Living room"
//       },
//       {
//         id: 3,
//         description: "Electricity Bill",
//         paidBy: "Ahmad",
//         amount: 120.00,
//         date: "Feb 20, 2023",
//         category: "utilities",
//         notes: "February"
//       }
//     ]
//   };

// <div className="row">
//           <div className="col-12">
//             <div className="card shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
//               <div className="card-header bg-white border-0 py-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h4 className="h5 mb-0">Recent Expenses</h4>
//                   <a href="#" className="small text-primary">View All</a>
//                 </div>
//               </div>
//               <div className="card-body p-0">
//                 {expenseData.recentExpenses.map((expense, index) => (
//                   <div 
//                     key={expense.id}
//                     className={index < expenseData.recentExpenses.length - 1 ? 'border-bottom' : ''}
//                   >
//                     <div className="p-3">
//                       <div className="d-flex align-items-start">
//                         <div className="flex-shrink-0">
//                           <div 
//                             className={`bg-${getCategoryColor(expense.category)} bg-opacity-10 text-${getCategoryColor(expense.category)} rounded p-2 me-3`}
//                           >
//                             <i className={`bi bi-${getCategoryIcon(expense.category)}`}></i>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1">
//                           <h6 className="mb-1">{expense.description}</h6>
//                           <p className="small text-muted mb-1">
//                             {expense.notes} • {expense.date}
//                           </p>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <span className="small">Paid by {expense.paidBy}</span>
//                             <span className="fw-bold">{formatCurrency(expense.amount)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div> 