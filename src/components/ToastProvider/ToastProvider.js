import React, { createContext, useCallback } from "react";
import ToastShelf from "../ToastShelf/index";
import { useEscapeKey } from "../../hooks/useEscapeKey";
export const ToastContext = createContext(() => {});

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

  useEscapeKey(useCallback(() => setToasts([]), []));

  return (
    <ToastContext.Provider value={{ newToast }}>
      {children}
      {toasts.length > 0 && (
        <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
