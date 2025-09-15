// frontend/src/components/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';

function WelcomePage() {
  return (
    <div className={styles.welcomePage}>
      <div className={styles.leftContent}>
        <h1 className={styles.title}>Medical Data Synthesizer</h1>
        <Link to="/diseases" className={styles.getStartedButton}>
          Let's Get Started
        </Link>
      </div>
      <div className={styles.rightContent}>
        <ul className={styles.points}>
          <li>Generate Synthetic Datasets.</li>
          <li>Enhance Research Data.</li>
          <li>Improve Data Privacy.</li>
        </ul>
      </div>
    </div>
  );
}

export default WelcomePage;