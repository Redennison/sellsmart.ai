import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getCarMakesAndModels() {
  const rows = await getCarData();

  const makeToModel = new Map();

  rows.forEach(row => {
    const make = row[3];
    const model = row[4];

    if (!makeToModel.has(make)) {
      makeToModel.set(make, []);
    }

    if (!makeToModel.get(make).includes(model)) {
      makeToModel.set(make, [...makeToModel.get(make), model]);
    }
  });

  return makeToModel;
}

export function getCurrentFormattedDate() {
  const today = new Date()

  const year = today.getFullYear() // Get the year
  const month = String(today.getMonth() + 1).padStart(2, '0') // Get the month (0-indexed) and pad with 0
  const day = String(today.getDate()).padStart(2, '0') // Get the day and pad with 0

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
