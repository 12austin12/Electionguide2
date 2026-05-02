# Test Scenarios & Cases 🧪

This document outlines the specific testing coverage for our core functionality, particularly focusing on our **Google Services Integration (Firebase & GenAI)** and application state.

## Test Suite 1: Firebase Authentication & Firestore
*(Located implicitly via manual/E2E workflows and verified component states)*

1. **Login with valid credentials → Success**
   - **Action**: User clicks "Login with Google" on the `MyVotingPlan` page.
   - **Expected Result**: Firebase Google Auth popup appears. Upon successful sign-in, the user's Google profile (UID) is stored in local state, the UI updates to show the "Logout" button, and their specific Firestore document is fetched.

2. **Login with invalid or cancelled credentials → Error shown**
   - **Action**: User clicks "Login with Google" but cancels the popup or encounters a network error.
   - **Expected Result**: The `try/catch` block inside `handleLogin` catches the Firebase Auth error. A native browser `alert()` is fired notifying the user that the login failed. The UI remains in the logged-out state.

3. **Save checklist → Data stored in Firestore**
   - **Action**: Authenticated user clicks on any checklist item (e.g., "Find Polling Location").
   - **Expected Result**: The local React state toggles the value to `true`. The `saveUserData` function immediately triggers, calling Firebase's `setDoc` to write the updated object to the `votingPlans/{uid}` collection. The "Saved Status Indicator" changes to "Saving to Firestore..." and then "All changes saved to cloud".

4. **Reload dashboard → Data persists**
   - **Action**: User refreshes the browser while logged in.
   - **Expected Result**: The `onAuthStateChanged` hook fires, recognizing the active session. It calls `loadUserData`, which triggers a `getDoc` request to Firestore. The checklist state is restored to its exact previous state, and the Progress Bar instantly reflects the correct completion percentage.

## Test Suite 2: Smart Assistant (Google Generative AI)

1. **Send valid query → AI responds correctly**
   - **Action**: User opens the floating chat window and types "How do I register in Texas?" and hits Send.
   - **Expected Result**: The component calls `chat.sendMessage()`. A "Typing..." indicator appears. The Google Gemini API returns a response, which is sanitized by DOMPurify and appended to the chat history.

2. **Network failure during chat → Graceful error handling**
   - **Action**: User sends a message while disconnected from the internet or if the API quota is exhausted.
   - **Expected Result**: The `try/catch` block catches the network error. A localized error message ("Sorry, I encountered an error checking my brain...") is displayed as the assistant's response, preventing the app from crashing.

## Test Suite 3: AppContext & Global State

1. **Toggle First-Time Voter Mode → UI updates globally**
   - **Action**: User opens Settings and toggles "Enable First-Time Voter Mode".
   - **Expected Result**: The `isFirstTimeVoter` state updates globally. The global banner appears, the Hero subtitle changes, and all secondary pages (Simulator, Guide, Quiz) reveal extra "💡 Tips" specific to beginners.

2. **Toggle Theme → CSS Variables swap**
   - **Action**: User clicks the Moon/Sun icon in the navigation bar.
   - **Expected Result**: The `data-theme` attribute on the `<html>` root element toggles between `light` and `dark`, instantly updating all global CSS Custom Properties.
