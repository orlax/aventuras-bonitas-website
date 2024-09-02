import React, { ForwardedRef } from "react";

export const useOutsideClick = (callback: () => void, escapeKey = false) => {
  const ref: ForwardedRef<any> = React.useRef();

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.key === "Escape"
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);
    if (escapeKey) {
      document.addEventListener("keyup", handleEscapeKey, true);
    }

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (escapeKey) {
        document.removeEventListener("keyup", handleEscapeKey, true);
      }
    };
  }, [ref]);

  return ref;
};
