import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

import ToastShelf from '../ToastShelf/index';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');

  const [toasts, setToasts] = React.useState([]);


  function handleDismiss(key) {
    setToasts(toasts.filter((el) => el.key !== key));
  }

  function newToast() {
    // it was suggested i use crypto.randomUUID(),
    // instead of random
    const key = Math.random() * 100;
    const newToasts = [...toasts, {
      'message': message,
      'variant': variant,
      'key': key,
    }];
    setMessage('');
    setToasts(newToasts);
  }


  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form className={styles.controlsWrapper} onSubmit={(val) => {
        val.preventDefault();
        newToast();
      }}>
        <div className={styles.row}>
          <label
            htmlFor="message-text"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message-text" className={styles.messageInput} value={message}
              onChange={(ev) => setMessage(ev.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((el) => {
              const id = `variant-${el}`;
              return <label key={id} htmlFor={id}>
                <input
                  id={id}
                  type="radio"
                  name="variant"
                  value={el}
                  checked={el === variant}
                  onChange={(e) => setVariant(e.target.value)}
                />
                {el}
              </label>
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>

      {
        toasts.length > 0 && <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
      }
    </div >
  );
}

export default ToastPlayground;
