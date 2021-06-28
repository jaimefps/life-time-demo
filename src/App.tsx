import { FC, useEffect, useMemo, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import "./App.css";

type UnitClass = "present" | "past" | "future";
type UnitProps = { classType: UnitClass };
type UnitListOutput = ReturnType<typeof Unit>[];
type UnitListProps = { count: number; round: number };

/**
 * This number determines how soon we cache the result
 * of a slice to preserve a fluid UI experience.
 * The larger this number, the slower the UI
 * will eventually become between renders.
 */
const MAX_PER_LIST = 100;

// const getRounds = (daysInHealthyLife: number) => {
//   return Math.ceil(daysInHealthyLife / MAX_PER_LIST);
// };

const getLocalCount = (count: number, round: number) => {
  const currRound = Math.floor(count / MAX_PER_LIST);
  if (currRound === round) return count % MAX_PER_LIST;
  if (currRound < round) return 0;
  return MAX_PER_LIST;
};

const getAbsolutePosition = (round: number, sliceIndex: number) => {
  return round * MAX_PER_LIST + sliceIndex;
};

const getUnitType = (unitNum: number, ageInDays: number): UnitClass => {
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

const Unit: FC<UnitProps> = ({ classType }) => {
  return <div className={`unit ${classType ?? ""}`} />;
};

const UnitList: FC<UnitListProps> = ({ count, round }) => {
  const { ageInDays } = useLifeDetails();
  const localCount = getLocalCount(count, round);
  const units = useMemo(() => {
    const result: UnitListOutput = [];
    for (let i = 0; i < localCount; i++) {
      const position = getAbsolutePosition(round, i);
      const unitType = getUnitType(position, ageInDays);
      result.push(<Unit key={position} classType={unitType} />);
    }
    return result;
  }, [localCount, round, ageInDays]);
  return <>{units}</>;
};

const App = () => {
  const { daysInHealthyLife } = useLifeDetails();
  const count = useTimedCount(daysInHealthyLife, 1);
  return (
    <div className="container">
      <UnitList round={0} count={count} />
      <UnitList round={1} count={count} />
      <UnitList round={2} count={count} />
      <UnitList round={3} count={count} />
      <UnitList round={4} count={count} />
      <UnitList round={5} count={count} />
      <UnitList round={6} count={count} />
      <UnitList round={7} count={count} />
      <UnitList round={8} count={count} />
      <UnitList round={9} count={count} />
      <UnitList round={10} count={count} />
      <UnitList round={11} count={count} />
      <UnitList round={12} count={count} />
      <UnitList round={13} count={count} />
      <UnitList round={14} count={count} />
      <UnitList round={15} count={count} />
      <UnitList round={16} count={count} />
      <UnitList round={17} count={count} />
      <UnitList round={18} count={count} />
      <UnitList round={19} count={count} />
      <UnitList round={20} count={count} />
      <UnitList round={21} count={count} />
      <UnitList round={22} count={count} />
      <UnitList round={23} count={count} />
      <UnitList round={24} count={count} />
      <UnitList round={25} count={count} />
      <UnitList round={26} count={count} />
      <UnitList round={27} count={count} />
      <UnitList round={28} count={count} />
      <UnitList round={29} count={count} />
      <UnitList round={30} count={count} />
      <UnitList round={31} count={count} />
      <UnitList round={32} count={count} />
      <UnitList round={33} count={count} />
      <UnitList round={34} count={count} />
      <UnitList round={35} count={count} />
      <UnitList round={36} count={count} />
      <UnitList round={37} count={count} />
      <UnitList round={38} count={count} />
      <UnitList round={39} count={count} />
      <UnitList round={40} count={count} />
      <UnitList round={41} count={count} />
      <UnitList round={42} count={count} />
      <UnitList round={43} count={count} />
      <UnitList round={44} count={count} />
      <UnitList round={45} count={count} />
      <UnitList round={46} count={count} />
      <UnitList round={47} count={count} />
      <UnitList round={48} count={count} />
      <UnitList round={49} count={count} />
      <UnitList round={50} count={count} />
      <UnitList round={51} count={count} />
      <UnitList round={52} count={count} />
      <UnitList round={53} count={count} />
      <UnitList round={54} count={count} />
      <UnitList round={55} count={count} />
      <UnitList round={56} count={count} />
      <UnitList round={57} count={count} />
      <UnitList round={58} count={count} />
      <UnitList round={59} count={count} />
      <UnitList round={60} count={count} />
      <UnitList round={61} count={count} />
      <UnitList round={62} count={count} />
      <UnitList round={63} count={count} />
      <UnitList round={64} count={count} />
      <UnitList round={65} count={count} />
      <UnitList round={66} count={count} />
      <UnitList round={67} count={count} />
      <UnitList round={68} count={count} />
      <UnitList round={69} count={count} />
      <UnitList round={70} count={count} />
      <UnitList round={71} count={count} />
      <UnitList round={72} count={count} />
      <UnitList round={73} count={count} />
      <UnitList round={74} count={count} />
      <UnitList round={75} count={count} />
      <UnitList round={76} count={count} />
      <UnitList round={77} count={count} />
      <UnitList round={78} count={count} />
      <UnitList round={79} count={count} />
      <UnitList round={80} count={count} />
      <UnitList round={81} count={count} />
      <UnitList round={82} count={count} />
      <UnitList round={83} count={count} />
      <UnitList round={84} count={count} />
      <UnitList round={85} count={count} />
      <UnitList round={86} count={count} />
      <UnitList round={87} count={count} />
      <UnitList round={88} count={count} />
      <UnitList round={89} count={count} />
      <UnitList round={90} count={count} />
      <UnitList round={91} count={count} />
      <UnitList round={92} count={count} />
      <UnitList round={93} count={count} />
      <UnitList round={94} count={count} />
      <UnitList round={95} count={count} />
      <UnitList round={96} count={count} />
      <UnitList round={97} count={count} />
      <UnitList round={98} count={count} />
      <UnitList round={99} count={count} />
      <UnitList round={100} count={count} />
      <UnitList round={101} count={count} />
      <UnitList round={102} count={count} />
      <UnitList round={103} count={count} />
      <UnitList round={104} count={count} />
      <UnitList round={105} count={count} />
      <UnitList round={106} count={count} />
      <UnitList round={107} count={count} />
      <UnitList round={108} count={count} />
      <UnitList round={109} count={count} />
      <UnitList round={110} count={count} />
      <UnitList round={111} count={count} />
      <UnitList round={112} count={count} />
      <UnitList round={113} count={count} />
      <UnitList round={114} count={count} />
      <UnitList round={115} count={count} />
      <UnitList round={116} count={count} />
      <UnitList round={117} count={count} />
      <UnitList round={118} count={count} />
      <UnitList round={119} count={count} />
      <UnitList round={120} count={count} />
      <UnitList round={121} count={count} />
      <UnitList round={122} count={count} />
      <UnitList round={123} count={count} />
      <UnitList round={124} count={count} />
      <UnitList round={125} count={count} />
      <UnitList round={126} count={count} />
      <UnitList round={127} count={count} />
      <UnitList round={128} count={count} />
      <UnitList round={129} count={count} />
      <UnitList round={130} count={count} />
      <UnitList round={131} count={count} />
      <UnitList round={132} count={count} />
      <UnitList round={133} count={count} />
      <UnitList round={134} count={count} />
      <UnitList round={135} count={count} />
      <UnitList round={136} count={count} />
      <UnitList round={137} count={count} />
      <UnitList round={138} count={count} />
      <UnitList round={139} count={count} />
      <UnitList round={140} count={count} />
      <UnitList round={141} count={count} />
      <UnitList round={142} count={count} />
      <UnitList round={143} count={count} />
      <UnitList round={144} count={count} />
      <UnitList round={145} count={count} />
      <UnitList round={146} count={count} />
      <UnitList round={147} count={count} />
      <UnitList round={148} count={count} />
      <UnitList round={149} count={count} />
      <UnitList round={150} count={count} />
      <UnitList round={151} count={count} />
      <UnitList round={152} count={count} />
      <UnitList round={153} count={count} />
      <UnitList round={154} count={count} />
      <UnitList round={155} count={count} />
      <UnitList round={156} count={count} />
      <UnitList round={157} count={count} />
      <UnitList round={158} count={count} />
      <UnitList round={159} count={count} />
      <UnitList round={160} count={count} />
      <UnitList round={161} count={count} />
      <UnitList round={162} count={count} />
      <UnitList round={163} count={count} />
      <UnitList round={164} count={count} />
      <UnitList round={165} count={count} />
      <UnitList round={166} count={count} />
      <UnitList round={167} count={count} />
      <UnitList round={168} count={count} />
      <UnitList round={169} count={count} />
      <UnitList round={170} count={count} />
      <UnitList round={171} count={count} />
      <UnitList round={172} count={count} />
      <UnitList round={173} count={count} />
      <UnitList round={174} count={count} />
      <UnitList round={175} count={count} />
      <UnitList round={176} count={count} />
      <UnitList round={177} count={count} />
      <UnitList round={178} count={count} />
      <UnitList round={179} count={count} />
      <UnitList round={180} count={count} />
      <UnitList round={181} count={count} />
      <UnitList round={182} count={count} />
      <UnitList round={183} count={count} />
      <UnitList round={184} count={count} />
      <UnitList round={185} count={count} />
      <UnitList round={186} count={count} />
      <UnitList round={187} count={count} />
      <UnitList round={188} count={count} />
      <UnitList round={189} count={count} />
      <UnitList round={190} count={count} />
      <UnitList round={191} count={count} />
      <UnitList round={192} count={count} />
      <UnitList round={193} count={count} />
      <UnitList round={194} count={count} />
      <UnitList round={195} count={count} />
      <UnitList round={196} count={count} />
      <UnitList round={197} count={count} />
      <UnitList round={198} count={count} />
      <UnitList round={199} count={count} />
      <UnitList round={200} count={count} />
      <UnitList round={201} count={count} />
      <UnitList round={202} count={count} />
      <UnitList round={203} count={count} />
      <UnitList round={204} count={count} />
      <UnitList round={205} count={count} />
      <UnitList round={206} count={count} />
      <UnitList round={207} count={count} />
      <UnitList round={208} count={count} />
      <UnitList round={209} count={count} />
      <UnitList round={210} count={count} />
      <UnitList round={211} count={count} />
      <UnitList round={212} count={count} />
      <UnitList round={213} count={count} />
      <UnitList round={214} count={count} />
      <UnitList round={215} count={count} />
      <UnitList round={216} count={count} />
      <UnitList round={217} count={count} />
      <UnitList round={218} count={count} />
      <UnitList round={219} count={count} />
      <UnitList round={220} count={count} />
      <UnitList round={221} count={count} />
      <UnitList round={222} count={count} />
      <UnitList round={223} count={count} />
      <UnitList round={224} count={count} />
      <UnitList round={225} count={count} />
      <UnitList round={226} count={count} />
      <UnitList round={227} count={count} />
      <UnitList round={228} count={count} />
      <UnitList round={229} count={count} />
      <UnitList round={230} count={count} />
      <UnitList round={231} count={count} />
      <UnitList round={232} count={count} />
      <UnitList round={233} count={count} />
      <UnitList round={234} count={count} />
      <UnitList round={235} count={count} />
      <UnitList round={236} count={count} />
      <UnitList round={237} count={count} />
      <UnitList round={238} count={count} />
      <UnitList round={239} count={count} />
      <UnitList round={240} count={count} />
      <UnitList round={241} count={count} />
      <UnitList round={242} count={count} />
      <UnitList round={243} count={count} />
      <UnitList round={244} count={count} />
      <UnitList round={245} count={count} />
      <UnitList round={246} count={count} />
      <UnitList round={247} count={count} />
      <UnitList round={248} count={count} />
      <UnitList round={249} count={count} />
      <UnitList round={250} count={count} />
      <UnitList round={251} count={count} />
      <UnitList round={252} count={count} />
      <UnitList round={253} count={count} />
      <UnitList round={254} count={count} />
      <UnitList round={255} count={count} />
      <UnitList round={256} count={count} />
      <UnitList round={257} count={count} />
      <UnitList round={258} count={count} />
      <UnitList round={259} count={count} />
      <UnitList round={260} count={count} />
      <UnitList round={261} count={count} />
      <UnitList round={262} count={count} />
      <UnitList round={263} count={count} />
      <UnitList round={264} count={count} />
      <UnitList round={265} count={count} />
      <UnitList round={266} count={count} />
      <UnitList round={267} count={count} />
      <UnitList round={268} count={count} />
      <UnitList round={269} count={count} />
      <UnitList round={270} count={count} />
      <UnitList round={271} count={count} />
      <UnitList round={272} count={count} />
      <UnitList round={273} count={count} />
    </div>
  );
};

export default App;
