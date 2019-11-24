import React from 'react';
import styles from '../styles/AddDialogueButton.module.css';


export function AddDialogueButton(props) {
  const { createHandler } = props;
  return (
    <button
        onClick={createHandler} className={styles.createDialogueButton}
    />
  );
}
