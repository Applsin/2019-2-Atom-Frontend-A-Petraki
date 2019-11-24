import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';

export function Profile(props) {
  const { style } = props;

  return (
    <div className={styles.wrapper} style={style}>
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'unset' }}>
                    <div className={styles.back} />
                </Link>
                <div className={styles.edit}>Edit Profile</div>
                <div className={styles.submit} />
            </div>
        </div>
        <div className={styles.profile}>
            <div className={styles.avatar} />
            <div className={styles.form}>
                <div className={styles.formLabel}>Full name</div>
                <input className={styles.inputForm} placeholder='Name Placeholder'/>
            </div>
            <div className={styles.form}>
                <div className={styles.formLabel}>Username</div>
                <input className={styles.inputForm} placeholder='@test'/>
            </div>
            <div className={styles.form}>
                <div className={styles.formLabel}>Info</div>
                <input className={styles.inputForm} placeholder='Info Placeholder'/>
            </div>
        </div>
    </div>
  );
}