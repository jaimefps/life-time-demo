import create from "zustand";
import { combine } from "zustand/middleware";
import React, { FC, ReactElement, useEffect, useRef } from "react";
import { useLifeData, useTimedCount } from "../hooks";

console.log("___css-illusion-react___");

type UnitStyle = "present" | "past" | "future";
type UnitProps = { idx: number; ageInDays: number };

const getUnitStyle = (absPosition: number, ageInDays: number): UnitStyle => {
  if (absPosition < ageInDays) return "past";
  if (absPosition === ageInDays) return "present";
  return "future";
};

const getIsVisible = (absPosition: number, count: number) => {
  return absPosition >= count;
};

const useStore = create(
  // "combine" for typescript inference:
  combine({ count: 0 }, (set) => ({
    setCount: (count: number) => {
      set(() => ({ count }));
    },
  }))
);

// Handles time updates as a separate component to
// avoid inducing re-renders in <UnitList />.
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

const Unit: FC<UnitProps> = ({ idx, ageInDays }) => {
  const isVisible = useStore((state) => getIsVisible(idx, state.count));
  const visibilityStyle = isVisible ? "hidden" : "";
  const unitStyle = getUnitStyle(idx, ageInDays);
  return <div className={`unit ${unitStyle} ${visibilityStyle}`} />;
};

const UnitList: React.FC = () => {
  const { daysInLife, ageInDays } = useLifeData();
  const list: ReactElement<typeof Unit>[] = [];
  for (let i = 0; i < daysInLife; i++) {
    list.push(<Unit key={i} idx={i} ageInDays={ageInDays} />);
  }
  return <>{list}</>;
};

const App = () => {
  return (
    <div className="container">
      <Ticker />
      <UnitList />
    </div>
  );
};

export default App;
