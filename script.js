
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements for Chat & Auth
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

// DOM Elements for API Keys on Chat Page
const openrouterKeyInput = document.getElementById("openrouterKey");
const githubTokenInput = document.getElementById("githubToken");
const saveApiKeysBtn = document.getElementById("save-api-keys");

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

// Authentication Handlers
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
    // Optionally, GitHub token auto-save is handled in account page; here you can load it too.
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

// Save API Keys to Firestore
saveApiKeysBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user) {
    const apiData = {
      openrouterKey: openrouterKeyInput.value.trim(),
      githubToken: githubTokenInput.value.trim()
    };
    try {
      await db.collection("users").doc(user.uid).set(apiData, { merge: true });
      notify("API keys saved.", "success");
    } catch (error) {
      notify("Error saving API keys: " + error.message);
    }
  } else {
    notify("You must be signed in to save API keys.");
  }
});

// Listen for auth state changes and load API keys
auth.onAuthStateChanged(user => {
  if (user) {
    userEmailSpan.textContent = user.email;
    authContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
    // Load user's saved API keys from Firestore
    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        openrouterKeyInput.value = data.openrouterKey || "";
        githubTokenInput.value = data.githubToken || "";
      }
    }).catch(error => {
      console.error("Error loading API keys: ", error);
      notify("Error loading API keys: " + error.message);
    });
  } else {
    authContainer.classList.remove("hidden");
    appContainer.classList.add("hidden");
  }
});

// OpenRouter API call
async function sendMessageToAI(message) {
  const openrouterKey = openrouterKeyInput.value.trim();
  if (!openrouterKey) {
    notify("Please enter your OpenRouter API Key in the API Settings.");
    return "";
  }
  const systemPrompt = {
    role: "system",
    content: "You are Byte.ai, an advanced AI specialized in software development. Your tasks include understanding high-level prompts, planning software projects, generating clean code wrapped in triple backticks (), and IMPORTANT: Place # FILE: filename.extension inside the backticks at the start of each code block. Also, include a line starting with '# PROJECT:' followed by the project folder name. This should be at the start of every response outside of the , the first thing said, NOT IN THE CODE BLOCKS, MAKE IT THE FIRST THING YOU SAY IN EVERY RESPONSE BEFORE ANYTHING ELSE, ANYTHING AT ALL, THIS SHOULD COME FIRST. Always generate a README.md file describing the project, including setup instructions, usage, and features. If a Python file is created, generate a requirements.txt listing all dependencies. If a JavaScript file is created, generate a package.json with dependencies if needed. Add build automation scripts: build.sh for Linux/Mac and build.bat for Windows if applicable. Create a .gitignore file for Git if applicable. Log execution outputs and errors in a logs/execution.log file inside the project directory."
  };
  const payload = {
    model: "google/gemini-2.0-pro-exp-02-05:free",
    messages: [systemPrompt, ...conversationMemory, { role: "user", content: message }],
    temperature: 0.7
  };
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openrouterKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error("Failed to get response from AI");
    }
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    }
    return "No response from AI.";
  } catch (error) {
    notify("Error sending message to AI: " + error.message);
    return "";
  }
}

// Chat form submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;
  appendChatEntry("user", message);
  messageInput.value = "";
  const aiResponse = await sendMessageToAI(message);
  if (!aiResponse) return;
  appendChatEntry("assistant", aiResponse);
  conversationMemory.push({ role: "user", content: message });
  conversationMemory.push({ role: "assistant", content: aiResponse });
});
