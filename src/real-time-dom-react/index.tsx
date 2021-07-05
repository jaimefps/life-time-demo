import create from "zustand";
import { combine } from "zustand/middleware";
import { FC, ReactElement, useEffect, useRef } from "react";
import { useLifeData, useTimedCount } from "../hooks";
import { MAX_PER_LIST } from "../config";

console.log("___real-time-dom-react___");

type UnitStyle = "present" | "past" | "future";
type UnitListProps = { round: number; ageInDays: number };
type UnitProps = { styleType: UnitStyle };

const getLocalCount = (count: number, round: number) => {
  const currRound = Math.floor(count / MAX_PER_LIST);
  if (currRound === round) return count % MAX_PER_LIST;
  if (currRound < round) return 0;
  return MAX_PER_LIST;
};

const getUnitStyle = (absPosition: number, ageInDays: number) => {
  if (absPosition < ageInDays) return "past";
  if (absPosition === ageInDays) return "present";
  return "future";
};

const getAbsPosition = (round: number, idx: number) => {
  return round * MAX_PER_LIST + idx;
};

const getRoundsTotal = (daysInLife: number) => {
  return Math.ceil(daysInLife / MAX_PER_LIST);
};

const useStore = create(
  // "combine" for typescript inference:
  combine({ count: 0 }, (set) => ({
    setCount: (count: number) => {
      set(() => ({ count }));
    },
  }))
);

const useLocalCount = (round: number) => {
  return useStore((state) => getLocalCount(state.count, round));
};

const Unit: FC<UnitProps> = ({ styleType }) => {
  return <div className={`unit ${styleType ?? ""}`} />;
};

// Only re-renders when its "localCount" changes.
const UnitList: FC<UnitListProps> = ({ round, ageInDays }) => {
  const localCount = useLocalCount(round);
  const result: ReactElement<typeof Unit>[] = [];
  for (let i = 0; i < localCount; i++) {
    const absPosition = getAbsPosition(round, i);
    const untilStyle = getUnitStyle(absPosition, ageInDays);
    result.push(<Unit key={absPosition} styleType={untilStyle} />);
  }
  return <>{result}</>;
};

// Handles time updates as a separate component to
// avoid inducing re-renders in <UnitListGroup />.
const Ticker = () => {
  const { daysInLife } = useLifeData();
  const count = useTimedCount(daysInLife);
  const setCount = useStore((state) => state.setCount);
  const ref = useRef(setCount);
  useEffect(() => {
    ref.current(count);
  }, [count]);
  return null;
};

// Should render once.
const UnitListGroup = () => {
  const { daysInLife, ageInDays } = useLifeData();
  const rounds = getRoundsTotal(daysInLife);
  const collection: ReactElement<typeof UnitList>[] = [];
  for (let i = 0; i < rounds; i++) {
    collection.push(<UnitList key={i} round={i} ageInDays={ageInDays} />);
  }
  return <>{collection}</>;
};

const App = () => {
  return (
    <div className="container">
      <Ticker />
      <UnitListGroup />
    </div>
  );
};

export default App;
