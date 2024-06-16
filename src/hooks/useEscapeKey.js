import { useEffect } from "react";

export function useEscapeKey(actionFunction) {
  return useEffect(() => {
    console.log("RUN ONCE PLEASE");
    const onKeyUp = (e) => {
      if (e.key === "Escape") {
        actionFunction();
      }
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [actionFunction]);
}
