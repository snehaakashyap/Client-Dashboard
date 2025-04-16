'use client';

import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  showCustomerService?: boolean;
  showLoginButton?: boolean;
}

export default function Header({ 
  showCustomerService = false,
  showLoginButton = true
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>AGROVISION</div>
        {showCustomerService && (
          <Link href="/customer-service" className={styles.customerService}>
            Contact Customer Service
          </Link>
        )}
      </div>
    </header>
  );
}