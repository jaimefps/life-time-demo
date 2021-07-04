import create from "zustand";
import { combine } from "zustand/middleware";
import { eachDayOfInterval } from "date-fns";
import React, {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
console.log("___css-illusion___");
/**********************************************
 * Play with these numbers to change the
 * performance and size of the UI.
 **********************************************/

const LIFE_EXPECTANCY = 75;
const DATE_OF_BIRTH = new Date(1989, 0, 17);

/**********************************************
 * Implementation details.
 * No need to change code below.
 **********************************************/

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
