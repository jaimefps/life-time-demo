import { FC, useEffect, useMemo, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import "./App.css";

/**
 * This number determines how soon we cache the result
 * of a slice to preserve a fluid UI experience.
 * The larger this number, the slower the UI
 * will eventually become between renders.
 */
const MAX_PER_LIST = 100;

const getRound = (count: number) => {
  return Math.floor(count / MAX_PER_LIST);
};
const getLocalCount = (count: number, round: number) => {
  const currRound = getRound(count);
  if (currRound === round) return count % MAX_PER_LIST;
  if (currRound < round) return 0;
  return MAX_PER_LIST;
};
const getPosition = (round: number, sliceIndex: number) => {
  return round * MAX_PER_LIST + sliceIndex;
};
const getUnitType = (unitNum: number, ageInDays: number): UnitType => {
  if (unitNum < ageInDays) return "past";
  if (unitNum === ageInDays) return "present";
  return "future";
};
const useLifeDetails = () => {
  const daysInHealthyLife = 365 * 55;
  const ageInDays = useMemo(() => {
    return eachDayOfInterval({
      start: new Date(2010, 0, 17),
      end: new Date(),
    }).length;
  }, []);
  return {
    daysInHealthyLife,
    ageInDays,
  };
};
const useTimedCount = (max: number, interval?: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < max) {
        setCount(count + 1);
      }
    }, interval ?? 2);
    return () => {
      clearTimeout(timeout);
    };
  }, [count, setCount, interval, max]);
  return count;
};
type UnitType = "present" | "past" | "future";
type UnitProps = { type: UnitType };
const Unit: FC<UnitProps> = ({ type }) => {
  return <div className={`unit ${type || ""}`}></div>;
};
type UnitListType = ReturnType<typeof Unit>[];
type UnitListProps = { count: number; round: number };
const UnitList: FC<UnitListProps> = ({ count, round }) => {
  const { ageInDays } = useLifeDetails();
  const localCount = getLocalCount(count, round);
  const units = useMemo(() => {
    const result: UnitListType = [];
    for (let i = 0; i < localCount; i++) {
      const position = getPosition(round, i);
      const type = getUnitType(position, ageInDays);
      result.push(<Unit key={position} type={type} />);
    }
    return result;
  }, [localCount, round, ageInDays]);
  return <>{units}</>;
};
const App = () => {
  const { daysInHealthyLife } = useLifeDetails();
  const count = useTimedCount(daysInHealthyLife, 2);
  return (
    <div className="container">
      <UnitList round={0} count={count} />
      <UnitList round={1} count={count} />
      <UnitList round={2} count={count} />
      <UnitList round={3} count={count} />
    </div>
  );
};
export default App;
