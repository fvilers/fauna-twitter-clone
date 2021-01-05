import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    callback();

    const tick = () => {
      savedCallback.current();
    };
    const handle = setInterval(tick, delay);

    return () => clearInterval(handle);
  }, [callback, delay]);
}

export default useInterval;
