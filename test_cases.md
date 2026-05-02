# Test Scenarios & Cases 🧪

This document outlines the specific testing coverage for our core functionality, particularly focusing on our **Google Services Integration (Firebase)**.

## Test Suite 1: Firebase Authentication & Firestore

- **Login with Google → Success**
  - **Action**: User clicks "Login with Google" on the `MyVotingPlan` page.
  - **Result**: Firebase Auth popup appears. Upon sign-in, the user's profile is loaded, displaying "Welcome, [Name]" on the dashboard.

- **Save checklist → Stored in Firestore**
  - **Action**: Authenticated user clicks an unchecked task.
  - **Result**: Task turns green and strikes through. A "Saving to Firestore..." spinner appears, followed by a bold "✔ Saved successfully" confirmation. The `lastUpdated` timestamp in the database and UI instantly updates.

- **Refresh → Data persists**
  - **Action**: User refreshes the browser window.
  - **Result**: The "Loading your plan from Firestore..." message appears. Once loaded, the checklist perfectly restores its previous state, the completion progress bar accurately reflects the stored percentage, and the Smart Reminder dynamically updates based on the retrieved data.

- **Unauthorized user → Access denied**
  - **Action**: A non-logged-in user attempts to save or view a plan.
  - **Result**: The UI completely hides the dashboard and forces a strict "Sign in to save your progress" wall. Firestore Security Rules block any raw API requests where `request.auth == null`.

## Test Suite 2: Smart Assistant (Rule-Based Fallback)

- **Send valid query → Assistant responds correctly**
  - **Action**: User types "register" and hits Send.
  - **Result**: The Smart Assistant shows a realistic typing indicator and responds with the appropriate state registration guidelines.

- **Send unrecognized query → Graceful fallback**
  - **Action**: User types an unknown question.
  - **Result**: The Assistant politely directs them to official election guidelines or dashboard tools without crashing.
