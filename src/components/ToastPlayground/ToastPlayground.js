import React, { useContext } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import ToastShelf from "../ToastShelf/index";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const { toasts, newToast, handleDismiss } = useContext(ToastContext);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form
        className={styles.controlsWrapper}
        onSubmit={(val) => {
          val.preventDefault();
          newToast(message, variant);
          setMessage("");
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message-text"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message-text"
              className={styles.messageInput}
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((el) => {
              const id = `variant-${el}`;
              return (
                <label key={id} htmlFor={id}>
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
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>

      {toasts.length > 0 && (
        <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
      )}
    </div>
  );
}

export default ToastPlayground;
