import { useEffect, useRef } from "react";

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useComponentDidUpdate = (callback, dependencies) => {
  const prevDependencies = usePrevious(dependencies);
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, []);
  useEffect(() => {
    callbackRef.current(prevDependencies, dependencies);
  }, dependencies);
};

export const useConditionalState = () => {
  const [state, setState] = useState({ a: "string", b: 0, c: [] });
};

export const useComponentDidMount = (callback) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current();
  }, []);
};

export const useComponentWillUnmount = (callback) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    return () => callbackRef.current();
  }, []);
};
