import React, { FC, useEffect, useMemo, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import "./App.css";

const getUnitType = (num: number, ageInDays: number): UnitType => {
  if (num < ageInDays) return "past";
  if (num === ageInDays) return "present";
  return "future";
};

type UnitType = "present" | "past" | "future";
type UnitProps = { type: UnitType };
const Unit: FC<UnitProps> = ({ type }) => {
  return <div className={`unit ${type || ""}`}></div>;
};

const useTimedCount = (max: number, interval?: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < max) {
        setCount(count + 1);
      }
    }, interval ?? 5);
    return () => {
      clearTimeout(timeout);
    };
  }, [count, setCount, interval, max]);
  return count;
};

const useTimedList = (
  ageInDays: number,
  daysInLifeExpectancy: number,
  interval?: number
) => {
  const count = useTimedCount(daysInLifeExpectancy, interval);
  const [list, setList] = useState<ReturnType<typeof Unit>[]>([]);
  useEffect(() => {
    setList((list) => {
      return list.concat(
        <Unit key={count} type={getUnitType(count, ageInDays)} />
      );
    });
  }, [count, ageInDays]);
  return list;
};

const useLifeTime = () => {
  const daysInLifeExpectancy = 365 * 75;
  const ageInDays = useMemo(() => {
    return eachDayOfInterval({
      start: new Date(2010, 0, 17),
      end: new Date(),
    }).length;
  }, []);
  return { daysInLifeExpectancy, ageInDays };
};

const App = () => {
  const { ageInDays, daysInLifeExpectancy } = useLifeTime();
  const timedList = useTimedList(ageInDays, daysInLifeExpectancy);
  return <div className="container">{timedList}</div>;
};

export default App;
