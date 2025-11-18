'use client'
import React, { useState } from "react";
import Link from "next/link";
import AddExpense from "./AddExpense";   // ✅ Import modal

const BottomMenu: React.FC = () => {

  // state to show/hide modal
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Bottom Navigation */}
      <div className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #dee2e6',
          zIndex: 1000,
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingTop: '8px',
        }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-around align-items-center">
            <Link href={'/home'}>
              <button className="btn btn-link text-dark text-decoration-none p-1 d-flex flex-column align-items-center">
                <i className="bi bi-house fs-5 mb-1"></i>
                <small style={{ fontSize: '0.7rem' }}>Home</small>
              </button>
            </Link>

            <button className="btn btn-link text-dark text-decoration-none p-1 d-flex flex-column align-items-center">
              <i className="bi bi-receipt fs-5 mb-1"></i>
              <small style={{ fontSize: '0.7rem' }}>Expenses</small>
            </button>

            {/* PLUS BUTTON → Open Modal */}
            <button
              onClick={() => setShowModal(true)}  
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '56px',
                height: '56px',
                marginTop: '-24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <i className="bi bi-plus-lg fs-4 text-white"></i>
            </button>

            <Link href={'/home/friends'}>
              <button className="btn btn-link text-dark text-decoration-none p-1 d-flex flex-column align-items-center">
                <i className="bi bi-people fs-5 mb-1"></i>
                <small style={{ fontSize: '0.7rem' }}>Friends</small>
              </button>
            </Link>

            <button className="btn btn-link text-dark text-decoration-none p-1 d-flex flex-column align-items-center">
              <i className="bi bi-person fs-5 mb-1"></i>
              <small style={{ fontSize: '0.7rem' }}>Profile</small>
            </button>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <AddExpense 
          show={showModal} 
          onClose={() => setShowModal(false)}  
        />
      )}
    </>
  );
};
export default BottomMenu;
