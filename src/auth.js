import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

/**
 * Handles user login using Firebase Google Auth popup.
 * Secures user session on the client side.
 * @async
 * @returns {Promise<Object>} The authenticated Firebase user object.
 * @throws {Error} If the sign-in process fails or is cancelled.
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Handles user logout and securely clears the active session.
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If the sign-out process fails.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

/**
 * Listens for auth state changes to persist the user session across reloads.
 * @param {Function} callback - The function to execute when auth state changes.
 * @returns {Function} An unsubscribe function to clean up the listener.
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
