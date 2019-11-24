import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

export function Header(props) {
  const { details, clickBack } = props;
  return (
    <div className={styles.header}>
        <Link to={'/'}>
            <div onClick={clickBack} className={styles.backButton} />
        </Link>
        <div className={styles.chatInfo}>
            <Link to={`/profile/${details.id}`}>
                <div className={styles.avatar} />
            </Link>
                <div className={styles.senderInfo}>
                <div>{details.title}</div>
                <div>status placeholder</div>
            </div>
        </div>
        <div className={styles.searchButton} />
        <div className={styles.settingsButton} />
    </div>
  );
}
