import { FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { combine } from "zustand/middleware";
import create from "zustand";
import "./App.css";

/**********************************************
 * Play with these numbers to change the
 * performance and size of the UI.
 **********************************************/

// MAX_PER_LIST affects the performance speed.
// It determines how many UnitGroups we need to
// create enough Units to reach the LIFE_EXPECTANCY.
const MAX_PER_LIST = 50;
const LIFE_EXPECTANCY = 75;
const DATE_OF_BIRTH = new Date(2010, 0, 17);

/**********************************************
 * Implementation details.
 * No need to change code below.
 **********************************************/

type UnitStyle = "present" | "past" | "future";
type UnitProps = { styleType: UnitStyle };
type UnitGroupProps = { round: number; ageInDays: number };

const getLocalCount = (count: number, round: number) => {
  const currRound = Math.floor(count / MAX_PER_LIST);
  if (currRound === round) return count % MAX_PER_LIST;
  if (currRound < round) return 0;
  return MAX_PER_LIST;
};

const getUnitStyle = (unitNum: number, ageInDays: number) => {
  if (unitNum < ageInDays) return "past";
  if (unitNum === ageInDays) return "present";
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

const useLifeData = () => {
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
};

const useTimedCount = (max: number, interval?: number) => {
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
};

const Unit: FC<UnitProps> = ({ styleType }) => {
  return <div className={`unit ${styleType ?? ""}`} />;
};

// Only re-renders when its "localCount" changes.
const UnitGroup: FC<UnitGroupProps> = ({ round, ageInDays }) => {
  const localCount = useStore((state) => getLocalCount(state.count, round));
  const result: ReactElement<typeof Unit>[] = [];
  for (let i = 0; i < localCount; i++) {
    const absPosition = getAbsPosition(round, i);
    const unitType = getUnitStyle(absPosition, ageInDays);
    result.push(<Unit key={absPosition} styleType={unitType} />);
  }
  return <>{result}</>;
};

// Handles timer as a separate component to avoid
// inducing re-renders in <App /> and <Collection />.
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

// Should render as
// a whole only once.
const Collection = () => {
  const { daysInLife, ageInDays } = useLifeData();
  const rounds = getRoundsTotal(daysInLife);
  const collection: ReactElement<typeof UnitGroup>[] = [];
  for (let i = 0; i < rounds; i++) {
    collection.push(<UnitGroup key={i} round={i} ageInDays={ageInDays} />);
  }
  return <>{collection}</>;
};

const App = () => {
  return (
    <div className="container">
      <Ticker />
      <Collection />
    </div>
  );
};

export default App;
