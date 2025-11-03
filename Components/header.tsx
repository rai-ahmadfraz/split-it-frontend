"use client";

import Link from "next/link";
import { useState } from "react";
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const linkItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
    ];
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo">
          Split Bill {isOpen}
        </Link>

        <button onClick={() => setIsOpen(!isOpen)}
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <span className="hamburger"></span>
        </button>

        <nav className={isOpen ? 'nav show':'nav'} id="main-nav">
          <ul className="nav-list">
           {linkItems.map((item) => (
            <Link href={item.href} key={item.href} className="nav-link">{item.label}</Link>
           ))}
          </ul>
        </nav>

        <div className="auth">
          <Link href="/login" className="btn btn-outline">
            Login
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}