import React, { createContext, useCallback } from "react";
export const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleDismiss = useCallback((key) => {
    setToasts((toasts) => toasts.filter((el) => el.key !== key));
  }, []);

  const newToast = useCallback((message, variant) => {
    const key = Math.random() * 100;
    const newToast = {
      message: message,
      variant: variant,
      key: key,
    };
    setToasts((oldToasts) => [...oldToasts, newToast]);
  }, []);

  // function handleDismiss(key) {
  //   setToasts(toasts.filter((el) => el.key !== key));
  // }

  // function newToast() {
  //   // it was suggested i use crypto.randomUUID(),
  //   // instead of random
  //   const key = Math.random() * 100;
  //   const newToasts = [...toasts, {
  //     'message': message,
  //     'variant': variant,
  //     'key': key,
  //   }];
  //   setMessage('');
  //   setToasts(newToasts);
  // }

  return (
    <ToastContext.Provider value={{ toasts, newToast, handleDismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
