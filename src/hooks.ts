import { eachDayOfInterval } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { LIFE_EXPECTANCY, DATE_OF_BIRTH } from "./config";

export function useLifeData() {
  return useMemo(() => {
    return {
      daysInLife: 365 * LIFE_EXPECTANCY,
      // meant to account for leap years:
      ageInDays: eachDayOfInterval({
        start: DATE_OF_BIRTH,
        end: new Date(),
      }).length,
    };
  }, []);
}

export function useTimedCount(max: number, interval?: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < max) {
        setCount(count + 1);
      }
    }, interval ?? 1);
    return () => {
      clearTimeout(timeout);
    };
  }, [count, setCount, interval, max]);
  return count;
}

/**
 * Below hooks are for fun, unrelated
 * from performance experiments.
 */
type Noop = () => void;

export function usePrevious<V = any>(value: V): V | undefined {
  const ref = useRef();
  useEffect(() => {
    ref.current = value as any;
  }, [value]);
  return ref.current;
}

export const useComponentDidMount = (callback: Noop) => {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current();
  }, []);
};

export const useComponentWillUnmount = (callback: Noop) => {
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
