'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="share-bill-landing">
      {/* Navigation */}
      <nav className="share-bill-nav navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container-fluid px-3 px-md-4">
          <a className="navbar-brand fw-bold text-primary fs-4" href="#">
            Split Bill
          </a>
          
          {/* Mobile menu button */}
          <button 
            className="share-bill-nav-toggler navbar-toggler border-0"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation items */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <div className="navbar-nav ms-auto align-items-lg-center">
              <a className="nav-link text-dark mx-lg-3 my-2 my-lg-0" href="#features" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a className="nav-link text-dark mx-lg-3 my-2 my-lg-0" href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
                Workflow
              </a>
                <Link className="share-bill-cta btn btn-primary mt-2 mt-lg-0 ms-lg-3 w-100 w-lg-auto" href="/login">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="share-bill-hero bg-light py-4 py-md-5">
        <div className="container-fluid px-3 px-md-4">
          <div className="row align-items-center min-vh-100">
            <div className="col-12 col-lg-6 order-2 order-lg-1 mt-4 mt-lg-0">
              <h1 className="share-bill-hero-title display-6 display-lg-4 fw-bold mb-3 text-center text-lg-start">
                Split Bills <br className="d-none d-lg-block" />
                <span className="text-primary">Without The Stress</span>
              </h1>
              <p className="share-bill-hero-text lead mb-4 text-muted text-center text-lg-start">
                Split Bill makes splitting expenses with friends, roommates, and family effortless. 
                Track shared costs, settle balances instantly, and enjoy your time together.
              </p>
              <div className="share-bill-hero-buttons d-flex flex-column flex-sm-row gap-2 gap-md-3 justify-content-center justify-content-lg-start">
                <button className="share-bill-primary-btn btn btn-primary btn-lg px-3 px-md-4 py-3">
                  Start Splitting Now
                </button>
                <button className="share-bill-secondary-btn btn btn-outline-secondary btn-lg px-3 px-md-4 py-3">
                  Watch Demo
                </button>
              </div>
              <div className="share-bill-hero-subtext mt-3 text-center text-lg-start">
                <small className="text-muted">No credit card required • Free forever</small>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="share-bill-hero-card card shadow-lg border-0 mx-auto" style={{ maxWidth: '100%', borderRadius: '16px' }}>
                <div className="card-body p-3 p-md-4">
                  <div className="text-center mb-3">
                    <div className="share-bill-hero-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3">
                      <i className="bi bi-receipt text-primary fs-2"></i>
                    </div>
                  </div>
                  
                  <div className="share-bill-balance-card bg-gradient-primary text-white p-3 rounded-3 mb-3">
                    <h6 className="mb-2 small fw-semibold">Overall Balance</h6>
                    <h4 className="fw-bold mb-1">-$786.67</h4>
                    <small className="opacity-90">You owe $786.67 in total</small>
                  </div>

                  <div className="share-bill-user-balances">
                    <div className="d-flex justify-content-between align-items-center p-2 p-md-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="share-bill-user-avatar bg-danger bg-opacity-10 rounded-circle p-2 me-2">
                          <i className="bi bi-person text-danger"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 small fw-semibold">Fraz</h6>
                          <small className="text-muted">you owe</small>
                        </div>
                      </div>
                      <span className="text-danger fw-bold small">-$1,026.67</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center p-2 p-md-3">
                      <div className="d-flex align-items-center">
                        <div className="share-bill-user-avatar bg-success bg-opacity-10 rounded-circle p-2 me-2">
                          <i className="bi bi-person text-success"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 small fw-semibold">Ahmad</h6>
                          <small className="text-muted">owes you</small>
                        </div>
                      </div>
                      <span className="text-success fw-bold small">$240.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="share-bill-features py-4 py-md-5 bg-white">
        <div className="container-fluid px-3 px-md-4">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="share-bill-section-title h2 fw-bold mb-3">Why Choose Split Bill?</h2>
            <p className="share-bill-section-subtitle lead text-muted">Everything you need to manage shared expenses effortlessly</p>
          </div>

          <div className="row g-2 g-md-4 justify-content-center">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="share-bill-feature-card card border-0 shadow-sm h-100">
                <div className="card-body text-center p-3 p-md-4">
                  <div className="share-bill-feature-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <i className="bi bi-lightning-fill text-primary fs-2"></i>
                  </div>
                  <h5 className="share-bill-feature-title fw-bold mb-2">Instant Settlements</h5>
                  <p className="share-bill-feature-text text-muted small mb-0">
                    Quickly split bills and see who owes what in real-time. No more messy calculations or forgotten debts.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="share-bill-feature-card card border-0 shadow-sm h-100">
                <div className="card-body text-center p-3 p-md-4">
                  <div className="share-bill-feature-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <i className="bi bi-phone text-success fs-2"></i>
                  </div>
                  <h5 className="share-bill-feature-title fw-bold mb-2">Mobile First</h5>
                  <p className="share-bill-feature-text text-muted small mb-0">
                    Designed specifically for mobile. Manage expenses anywhere with our optimized interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="share-bill-feature-card card border-0 shadow-sm h-100">
                <div className="card-body text-center p-3 p-md-4">
                  <div className="share-bill-feature-icon bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                    <i className="bi bi-shield-check text-warning fs-2"></i>
                  </div>
                  <h5 className="share-bill-feature-title fw-bold mb-2">Secure & Private</h5>
                  <p className="share-bill-feature-text text-muted small mb-0">
                    Your financial data stays private. We use bank-level encryption to protect your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="share-bill-how-it-works py-4 py-md-5 bg-light">
        <div className="container-fluid px-3 px-md-4">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="share-bill-section-title h2 fw-bold mb-3">How It Works</h2>
            <p className="share-bill-section-subtitle lead text-muted">Get started in just 3 simple steps</p>
          </div>

          <div className="row g-3 g-md-4 justify-content-center">
            <div className="col-12 col-md-4 text-center">
              <div className="share-bill-step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-3">
                1
              </div>
              <h5 className="share-bill-step-title fw-bold mb-2">Create a Group</h5>
              <p className="share-bill-step-text text-muted small mb-0">
                Add your friends, roommates, or trip buddies to a shared group in seconds.
              </p>
            </div>

            <div className="col-12 col-md-4 text-center">
              <div className="share-bill-step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-3">
                2
              </div>
              <h5 className="share-bill-step-title fw-bold mb-2">Add Expenses</h5>
              <p className="share-bill-step-text text-muted small mb-0">
                Record shared expenses and specify who paid and how to split the cost.
              </p>
            </div>

            <div className="col-12 col-md-4 text-center">
              <div className="share-bill-step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-3">
                3
              </div>
              <h5 className="share-bill-step-title fw-bold mb-2">Settle Up</h5>
              <p className="share-bill-step-text text-muted small mb-0">
                See clear balances and settle up with built-in payment tracking and reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="share-bill-testimonials py-4 py-md-5 bg-white">
        <div className="container-fluid px-3 px-md-4">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="share-bill-section-title h2 fw-bold mb-3">Loved by Thousands</h2>
            <p className="share-bill-section-subtitle lead text-muted">See what our users are saying</p>
          </div>

          <div className="row g-2 g-md-3 justify-content-center">
            <div className="col-12 col-md-4">
              <div className="share-bill-testimonial-card card border-0 shadow-sm h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="share-bill-testimonial-stars text-warning mb-3">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="share-bill-testimonial-text mb-3 small">
                    "Split Bill saved our roommate relationships! No more awkward money conversations or forgotten payments."
                  </p>
                  <div className="share-bill-testimonial-author d-flex align-items-center">
                    <div className="share-bill-author-avatar bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-person text-primary"></i>
                    </div>
                    <div>
                      <h6 className="share-bill-author-name mb-0 small fw-semibold">Sarah M.</h6>
                      <small className="share-bill-author-role text-muted">College Student</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="share-bill-testimonial-card card border-0 shadow-sm h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="share-bill-testimonial-stars text-warning mb-3">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="share-bill-testimonial-text mb-3 small">
                    "Perfect for group trips! We used Split Bill for our vacation and it made everything so smooth and fair."
                  </p>
                  <div className="share-bill-testimonial-author d-flex align-items-center">
                    <div className="share-bill-author-avatar bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-person text-success"></i>
                    </div>
                    <div>
                      <h6 className="share-bill-author-name mb-0 small fw-semibold">Mike R.</h6>
                      <small className="share-bill-author-role text-muted">Travel Enthusiast</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="share-bill-testimonial-card card border-0 shadow-sm h-100">
                <div className="card-body p-3 p-md-4">
                  <div className="share-bill-testimonial-stars text-warning mb-3">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="share-bill-testimonial-text mb-3 small">
                    "As someone who shares expenses with multiple friends, Split Bill has been an absolute game-changer."
                  </p>
                  <div className="share-bill-testimonial-author d-flex align-items-center">
                    <div className="share-bill-author-avatar bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-person text-warning"></i>
                    </div>
                    <div>
                      <h6 className="share-bill-author-name mb-0 small fw-semibold">Jessica L.</h6>
                      <small className="share-bill-author-role text-muted">Freelancer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="share-bill-cta-section py-4 py-md-5 bg-primary text-white">
        <div className="container-fluid px-3 px-md-4">
          <div className="row justify-content-center text-center">
            <div className="col-12 col-lg-8">
              <h2 className="share-bill-cta-title h2 fw-bold mb-3">Ready to Simplify Your Shared Expenses?</h2>
              <p className="share-bill-cta-text lead mb-4">
                Join thousands of users who trust Split Bill to manage their shared finances fairly and easily.
              </p>
              <button className="share-bill-cta-button btn btn-light btn-lg px-4 px-md-5 py-3 fw-bold mb-2">
                Get Started Free
              </button>
              <div className="share-bill-cta-subtext mt-2">
                <small>No credit card required • Setup in 2 minutes</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="share-bill-footer  text-white py-4">
        <div className="container-fluid px-3 px-md-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
              <h5 className="share-bill-footer-brand text-black fw-bold mb-1">Split Bill</h5>
              <p className="share-bill-footer-text text-muted mb-0 small">Making shared expenses fair and simple.</p>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end">
              <div className="share-bill-footer-links d-flex justify-content-center justify-content-md-end gap-3 gap-md-4">
                <a href="#" className="share-bill-footer-link text-muted text-decoration-none small">Privacy</a>
                <a href="#" className="share-bill-footer-link text-muted text-decoration-none small">Terms</a>
                <a href="#" className="share-bill-footer-link text-muted text-decoration-none small">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;