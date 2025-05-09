import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { doc, getDocs, setDoc, collection, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export const createUserHistory = async (user) => {
  if (!user) return; // Exit if no user is provided

  // Write to history
  const historyRef = collection(db, "history")

  // Create a query against the collection.
  const q = query(historyRef, where("email", "==", user?.email));
  const querySnapshot = await getDocs(q);

  // Check if there's a matching document
  if (querySnapshot.empty) {
    const docId = doc(historyRef).id; // Generate a new document ID

    // Update the document
    await setDoc(doc(historyRef, docId), {
      email: user?.email,
      cars: []
    });
  }
};


export function formatNumber(val) {
  console.log(val)
  return Number(String(val).replace(/,/g, '')).toLocaleString()
}

export function capitalizeFirstLetter(val) {
  return String(val)
    .split(/([-\s]+)/) // Split by spaces or dashes, but keep the delimiters (spaces and dashes)
    .map((part) => {
      if (part.match(/[-\s]+/)) {
        return part; // If it's a space or dash, just return it
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(); // Capitalize first letter of each word
    })
    .join(''); // Join everything back together without adding extra spaces
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function filterXAndYAxisValues(allXAxisValues, allYAxisValues, stepSize, minKm, maxKm, minStepSize=2500) {
  let stepXAxisValues = []
  let stepYAxisValues = []
  // Update current values to proper step size
  let inc = Math.floor(stepSize / minStepSize)

  for (let i=0; i<allXAxisValues.length; i+=inc) {
    stepXAxisValues.push(allXAxisValues[i])
    stepYAxisValues.push(allYAxisValues[i])
  }

  let filteredXAxisValues = []
  let filteredYAxisValues = []
  stepXAxisValues.forEach((km, idx) => {
    if (km >= minKm && km <= maxKm) {
      filteredXAxisValues.push(km)
      filteredYAxisValues.push(stepYAxisValues[idx])
    }
  })

  return [filteredXAxisValues, filteredYAxisValues]
}

export function calcIdxOfGreatestValueDrop(yAxisValues) {
  let idxOfGreatestValueDrop = 0
  let greatestValueDrop = 0
  for (let i=1; i<yAxisValues.length - 1; i++) {
    let curValueDrop = yAxisValues[i] - yAxisValues[i-1]
    idxOfGreatestValueDrop = curValueDrop < greatestValueDrop ? i-1 : idxOfGreatestValueDrop
    greatestValueDrop = idxOfGreatestValueDrop === i-1 ? curValueDrop : greatestValueDrop
  }
  return idxOfGreatestValueDrop
}

// Most updated cars.csv file must be placed in ml/dataset
async function getCarData() {
  const csvFilePath = '/dataset/cars_preprocessed.csv';
  
  try {
    const response = await fetch(csvFilePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const rows = csvText.split("\n").map(row => row.split(","));
    rows.shift(); // Remove header row
    return rows;
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    return [];
  }
}

// Function that counts exact and similar matches
export async function countMatches(make, model, km, year) {
  const allCars = await getCarData();

  let exactMatches = 0;
  let similarMatches = 0;

  allCars.forEach(row => {

    // Convert everything to strings for comparison and make and model to lowercase
    const fieldsToCompare = [
      [row[2], String(year)],   // Year
      [row[3]?.toLowerCase(), make.toLowerCase()], // Make
      [row[4]?.toLowerCase(), model.toLowerCase()] // Model
    ];

    // Count how many fields match
    const matchedCount = fieldsToCompare.reduce((count, [actual, desired]) => {
      return count + (actual === desired ? 1 : 0);
    }, 0);

    if (matchedCount === 3) {
      // All fields match exactly
      exactMatches++;
      similarMatches++;
    } else if (matchedCount === 2) {
      // Exactly 2 fields match
      similarMatches++;
    }
  });

  return { exactMatches, similarMatches };
}

export function confidenceRating(totalMatches) {
  return totalMatches > 0 ? Math.min(100, parseInt(100 - (100 / (totalMatches + 1)))) : 75;
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