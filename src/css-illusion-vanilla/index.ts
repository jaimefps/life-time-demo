import { eachDayOfInterval } from "date-fns";
import { DATE_OF_BIRTH, LIFE_EXPECTANCY } from "../config";

console.log("___css-illusion-vanilla___");

const daysInLife = 365 * LIFE_EXPECTANCY;
const ageInDays = eachDayOfInterval({
  start: DATE_OF_BIRTH,
  end: new Date(),
}).length;

function getUnitStyle(idx: number) {
  if (idx < ageInDays) return "past";
  if (idx === ageInDays) return "present";
  return "future";
}

function addUnit(idx: number) {
  const unit = document.createElement("div");
  unit.classList.add("unit");
  unit.classList.add("hidden");
  unit.classList.add(getUnitStyle(idx));
  container.appendChild(unit);
}

const container = document.createElement("div");
const root = document.getElementById("root") as HTMLElement;
container.classList.add("container");
root.appendChild(container);

for (let i = 0; i < daysInLife; i++) {
  addUnit(i);
}

const units = document.getElementsByClassName("unit");

let counter = 0;
const interval = setInterval(() => {
  if (counter < daysInLife) {
    units[counter].classList.remove("hidden");
    counter += 1;
  } else {
    clearInterval(interval);
  }
}, 1);
