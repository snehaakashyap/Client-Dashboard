'use client';

import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>AGROVISION</h1>
        <img 
          src="/agnext-logo.png" 
          alt="AGNEXT Logo" 
          className={styles.logo}
        />
      </header>

      <main className={styles.main}>
        <h2 className={styles.tagline}>From Farm to Final Mile</h2>
        
        <div className={styles.loginCard}>
          <h3>Login</h3>
          <form className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className={styles.rememberMe}>
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 