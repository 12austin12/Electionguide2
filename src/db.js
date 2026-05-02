import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Saves the user's voting plan checklist to Firestore securely.
 * This operation is protected by Firestore Security Rules.
 * @async
 * @param {Object} user - The authenticated Firebase user object.
 * @param {Object} checklist - The boolean checklist state to save.
 * @returns {Promise<string>} The ISO timestamp of the last update.
 * @throws {Error} If the user is unauthenticated or the network fails.
 */
export const savePlan = async (user, checklist) => {
  if (!user) throw new Error("User not authenticated");
  
  try {
    const docRef = doc(db, "votingPlans", user.uid);
    const data = {
      checklist: checklist,
      lastUpdated: new Date().toISOString()
    };
    await setDoc(docRef, data);
    return data.lastUpdated;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};

/**
 * Retrieves the user's saved voting plan checklist from Firestore.
 * @async
 * @param {Object} user - The authenticated Firebase user object.
 * @returns {Promise<Object|null>} The stored checklist data and lastUpdated timestamp, or null if none exists.
 * @throws {Error} If the user is unauthenticated or the document read fails.
 */
export const loadPlan = async (user) => {
  if (!user) throw new Error("User not authenticated");

  try {
    const docRef = doc(db, "votingPlans", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data(); // Returns { checklist, lastUpdated }
    }
    return null; // No existing plan
  } catch (error) {
    console.error("Error loading user data:", error);
    throw error;
  }
};
