'use client';

import { useEffect, useRef, FormEvent } from 'react';
import styles from './page.module.css';

export default function Home() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser && usernameRef.current && rememberRef.current) {
      usernameRef.current.value = rememberedUser;
      rememberRef.current.checked = true;
    }
  }, []);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const remember = rememberRef.current?.checked || false;
    
    if (remember) {
      localStorage.setItem('rememberedUser', username);
    } else {
      localStorage.removeItem('rememberedUser');
    }
    
    if (username && password) {
      window.location.href = '/dashboard';
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <>
      <div className={styles.pageBackground}></div>
      <header className={styles.header}>
        <div className={styles.logo}>AGROVISION</div>
      </header>
      <main className={styles.mainContent}>
        <h1 className={styles.tagline}>From Farm to Final Mile</h1>
        <div className={styles.loginContainer}>
          <div className={styles.berryTop}></div>
          <div className={styles.berryFalling}></div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input 
                ref={usernameRef}
                type="text" 
                id="username" 
                name="username" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input 
                ref={passwordRef}
                type="password" 
                id="password" 
                name="password" 
                required 
              />
            </div>
            <div className={`${styles.formGroup} ${styles.checkbox}`}>
              <input 
                ref={rememberRef}
                type="checkbox" 
                id="remember" 
                name="remember" 
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className={styles.loginBtn}>Login</button>
          </form>
        </div>
      </main>
    </>
  );
}
