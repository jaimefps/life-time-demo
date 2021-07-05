import { eachDayOfInterval } from "date-fns";
import { DATE_OF_BIRTH, LIFE_EXPECTANCY } from "../config";

console.log("___vanilla-dom___");

const daysInLife = 365 * LIFE_EXPECTANCY;
const ageInDays = eachDayOfInterval({
  start: DATE_OF_BIRTH,
  end: new Date(),
}).length;

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
