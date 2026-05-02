import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Saves the user's voting plan to Firestore.
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
 * Loads the user's voting plan from Firestore.
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
