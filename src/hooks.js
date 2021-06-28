import { useEffect, useRef } from "react";

/**
 * React Lifecycle hooks experiments.
 * Unrelated to "lifetime" code.
 */

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useComponentDidMount = (callback) => {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current();
  }, []);
};

export const useComponentWillUnmount = (callback) => {
  const refCallback = useRef(callback);
  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    return () => {
      refCallback.current();
    };
  }, []);
};
