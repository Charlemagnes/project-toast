import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toasts, handleDismiss }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toastData, idx) => <li key={toastData.key} className={styles.toastWrapper}>
        <Toast variant={toastData.variant} handleDismiss={() => handleDismiss(toastData.key)}>
          {toastData.message}
        </Toast>
      </li>)}
    </ol>
  );
}

export default ToastShelf;
