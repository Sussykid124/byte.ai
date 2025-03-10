
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements for Chat and Auth (index.html)
const appContainer = document.getElementById("app-container");
const authContainer = document.getElementById("auth-container");
const userEmailSpan = document.getElementById("user-email");
const signOutBtn = document.getElementById("sign-out-btn");

const googleBtn = document.getElementById("google-signin");
const githubBtn = document.getElementById("github-signin");
const emailSignInBtn = document.getElementById("email-signin");
const emailSignUpBtn = document.getElementById("email-signup");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const chatHistory = document.getElementById("chat-history");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message");
const notifications = document.getElementById("notifications");

let conversationMemory = [];
const repoUrlCache = {};

// Utility function to display notifications
function notify(message, type = "error") {
  notifications.textContent = message;
  notifications.style.color = type === "error" ? "#d9534f" : "#28a745";
  setTimeout(() => { notifications.textContent = ""; }, 5000);
}

function appendChatEntry(role, text) {
  const entry = document.createElement("div");
  entry.classList.add("chat-entry", role);
  entry.innerHTML = `<strong>${role.charAt(0).toUpperCase() + role.slice(1)}:</strong> ${text}`;
  chatHistory.appendChild(entry);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Authentication Handlers for Chat Page
googleBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    notify("Google sign-in error: " + error.message);
  }
});

githubBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");
  try {
    const result = await auth.signInWithPopup(provider);
    // (GitHub token auto-save is handled in account page)
  } catch (error) {
    notify("GitHub sign-in error: " + error.message);
  }
});

emailSignInBtn.addEventListener("click", async () => {
  try {
    await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
  } catch (error) {
    notify("Email sign-in error: " + error.message);
  }
});

emailSignUpBtn.addEventListener("click", async () => {
  try {
    await auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
  } catch (error) {
    notify("Email sign-up error: " + error.message);
  }
});

signOutBtn.addEventListener("click", async () => {
  try {
    await auth.signOut();
    notify("Signed out successfully.", "success");
  } catch (error) {
    notify("Sign-out error: " + error.message);
  }
});

// Listen for auth state changes to update UI
auth.onAuthStateChanged(user => {
  if (user) {
    userEmailSpan.textContent = user.email;
    authContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
  } else {
    authContainer.classList.remove("hidden");
    appContainer.classList.add("hidden");
  }
});

// Send message to AI (placeholder function)
async function sendMessageToAI(message) {
  // Replace with your actual API call
  return "Echo: " + message;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;
  appendChatEntry("user", message);
  messageInput.value = "";
  const aiResponse = await sendMessageToAI(message);
  appendChatEntry("assistant", aiResponse);
  conversationMemory.push({ role: "user", content: message });
  conversationMemory.push({ role: "assistant", content: aiResponse });
});
