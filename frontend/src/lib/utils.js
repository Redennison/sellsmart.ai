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