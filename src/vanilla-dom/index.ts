import { eachDayOfInterval } from "date-fns";
console.log("___vanilla-dom___");
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

const daysInLife = 365 * LIFE_EXPECTANCY;
const ageInDays = eachDayOfInterval({
  start: DATE_OF_BIRTH,
  end: new Date(),
}).length;

// only once:
const container = document.createElement("div");
const root = document.getElementById("root") as HTMLElement;
container.classList.add("container");
root.appendChild(container);

function getUnitStyle(idx: number) {
  if (idx < ageInDays) return "past";
  if (idx === ageInDays) return "present";
  return "future";
}

function addUnit(idx: number) {
  const unit = document.createElement("div");
  unit.classList.add("unit");
  unit.classList.add(getUnitStyle(idx));
  container.appendChild(unit);
}

let counter = 0;
const interval = setInterval(() => {
  if (counter < daysInLife) {
    counter += 1;
    addUnit(counter);
  } else {
    clearInterval(interval);
  }
}, 1);

export {};
