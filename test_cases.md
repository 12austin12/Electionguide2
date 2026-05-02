# 🧪 Test Cases

## 1. Authentication

- Login with Google  
  → Expected: User successfully logs in and dashboard loads  

- Logout  
  → Expected: User session cleared and redirected to login screen  

- Unauthorized access  
  → Expected: User cannot access dashboard without login  

---

## 2. Firestore Data

- Save checklist  
  → Expected: Data stored in Firestore under user.uid  

- Load checklist  
  → Expected: Saved data is retrieved and displayed correctly  

- Refresh page  
  → Expected: Data persists and reloads automatically  

- Cross-user access  
  → Expected: User cannot access another user's data (blocked by rules)  

---

## 3. UI Behavior

- Progress calculation  
  → Expected: Correct percentage displayed based on completed tasks  

- Smart reminders  
  → Expected: Message updates based on incomplete checklist  

- Completed items  
  → Expected: Completed steps are visually highlighted  

---

## 4. Error Handling

- Firestore failure (network issue)  
  → Expected: Error message displayed to user  

- Invalid API response  
  → Expected: Graceful fallback response shown  

- Loading state  
  → Expected: "Loading..." indicator visible while fetching data  

---

## 5. Edge Cases

- Empty checklist  
  → Expected: Progress shows 0%  

- All tasks completed  
  → Expected: Progress shows 100% with success message  

- Rapid updates  
  → Expected: No data loss or UI crash
