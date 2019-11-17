import React from 'react';
import styles from '../styles/DialogueHeader.module.css';

export function DialogueHeader() {
    return (
        <div className = {styles.header}>
            <div className = {styles.menuButton} />
            <div className = {styles.messenger}>Messenger</div>
            <div className = {styles.searchButton} />
        </div>
    );
}