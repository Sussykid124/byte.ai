
// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements for Authentication and Account Management
const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const userEmailSpan = document.getElementById("user-email");
const signOutBtn = document.getElementById("sign-out-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
const deleteAccountBtn = document.getElementById("delete-account-btn");
const saveApiKeysBtn = document.getElementById("save-api-keys");

const googleBtn = document.getElementById("google-signin");
const githubBtn = document.getElementById("github-signin");
const emailSignInBtn = document.getElementById("email-signin");
const emailSignUpBtn = document.getElementById("email-signup");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// DOM Elements for API Keys
const openrouterKeyInput = document.getElementById("openrouterKey");
const githubTokenInput = document.getElementById("githubToken");

// --- Authentication Handlers ---

// Google Sign In
googleBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    notify("Google sign-in error: " + error.message);
  }
});

// GitHub Sign In – automatically save the GitHub access token if not already set
githubBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  // Optionally, add the required scopes
  provider.addScope("repo");
  try {
    const result = await auth.signInWithPopup(provider);
    // Extract the GitHub access token from the credential
    const credential = firebase.auth.GithubAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      const user = result.user;
      // Save the token automatically if not already saved
      const userDocRef = db.collection("users").doc(user.uid);
      const doc = await userDocRef.get();
      if (!doc.exists || !doc.data().githubToken) {
        await userDocRef.set({ githubToken: token }, { merge: true });
        githubTokenInput.value = token;
        notify("GitHub token automatically saved.", "success");
      }
    }
  } catch (error) {
    notify("GitHub sign-in error: " + error.message);
  }
});

// Email Sign In
emailSignInBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    notify("Email sign-in error: " + error.message);
  }
});

// Email Sign Up
emailSignUpBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    notify("Email sign-up error: " + error.message);
  }
});

// Sign Out
signOutBtn.addEventListener("click", async () => {
  try {
    await auth.signOut();
    notify("Signed out successfully.", "success");
  } catch (error) {
    notify("Sign-out error: " + error.message);
  }
});

// Reset Password
resetPasswordBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await auth.sendPasswordResetEmail(user.email);
      notify("Password reset email sent.", "success");
    } catch (error) {
      notify("Reset password error: " + error.message);
    }
  } else {
    notify("No user is signed in.");
  }
});

// Delete Account
deleteAccountBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user) {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await user.delete();
        notify("Account deleted successfully.", "success");
      } catch (error) {
        notify("Delete account error: " + error.message);
      }
    }
  } else {
    notify("No user is signed in.");
  }
});

// Save API Keys to Firestore for the current user
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

// Listen for auth state changes to update the UI and load API keys
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

// Global variables for conversation memory and repository URL cache
let conversationMemory = [];
const repoUrlCache = {};

// Utility function to display notifications
function notify(message, type = "error") {
  const notifications = document.getElementById("notifications");
  notifications.textContent = message;
  notifications.style.color = type === "error" ? "#d9534f" : "#28a745";
  setTimeout(() => { notifications.textContent = ""; }, 5000);
}

// Append a chat entry to the chat history
function appendChatEntry(role, text) {
  const chatHistory = document.getElementById("chat-history");
  const entry = document.createElement("div");
  entry.classList.add("chat-entry", role);
  entry.innerHTML = `<strong>${role.charAt(0).toUpperCase() + role.slice(1)}:</strong> ${text}`;
  chatHistory.appendChild(entry);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Extract code blocks from AI response using regex with "# FILE:" marker.
function extractCodeBlocks(response) {
  const regex = /```(?:\w+)?\s*\n\s*(# FILE:\s*(\S+))\s*\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = regex.exec(response)) !== null) {
    const filename = match[2].trim();
    const code = match[3].trim();
    blocks.push({ filename, code });
  }
  return blocks;
}

// Extract project name using "# PROJECT:" marker.
function extractProjectName(response) {
  const regex = /# PROJECT:\s*(\S+)/;
  const match = regex.exec(response);
  return match ? match[1].trim() : "my_project";
}

// Send a message to the OpenRouter API
async function sendMessageToAI(message) {
  const openrouterKey = openrouterKeyInput.value.trim();
  if (!openrouterKey) {
    notify("Please enter your OpenRouter API Key.");
    return;
  }
  const systemPrompt = {
    role: "system",
    content: "You are Byte.ai, an advanced AI specialized in software development. Your tasks include understanding high-level prompts, planning software projects, generating clean code wrapped in triple backticks (), and IMPORTANT: Place # FILE: filename.extension inside the backticks at the start of each code block. Also, include a line starting with '# PROJECT:' followed by the project folder name. This should be at the start of every response outside of the , the first thing said, NOT IN THE CODE BLOCKS. Always generate a README.md file describing the project, including setup instructions, usage, and features. If a Python file is created, generate a requirements.txt listing all dependencies. If a JavaScript file is created, generate a package.json with dependencies if needed. Add build automation scripts: build.sh for Linux/Mac and build.bat for Windows if applicable. Create a .gitignore file for Git if applicable. Log execution outputs and errors in a logs/execution.log file inside the project directory."
  };

  const payload = {
    model: "microsoft/phi-3-medium-128k-instruct:free",
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

// Create GitHub repository via the GitHub API
async function createGithubRepo(repoName, githubToken) {
  const url = "https://api.github.com/user/repos";
  const payload = { name: repoName, private: false };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (response.status === 201) {
      const data = await response.json();
      return data.html_url;
    } else {
      const errorData = await response.json();
      console.error("GitHub repo creation error:", errorData);
      // If repository already exists, try to construct URL from username
      if (errorData.message && errorData.message.includes("name already exists")) {
        const userResp = await fetch("https://api.github.com/user", {
          headers: { "Authorization": `Bearer ${githubToken}` }
        });
        const userData = await userResp.json();
        return `https://github.com/${userData.login}/${repoName}`;
      } else {
        throw new Error(errorData.message || "Failed to create GitHub repository");
      }
    }
  } catch (error) {
    notify("Repo creation error: " + error.message);
    return null;
  }
}

// Upload file to GitHub using the API
async function uploadFileToGithub(repoUrl, filepath, code, githubToken) {
  try {
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0];
    const repoName = parts[1];
    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filepath}`;
    let sha = null;
    const getResponse = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (getResponse.ok) {
      const fileData = await getResponse.json();
      sha = fileData.sha;
    }
    const encodedContent = btoa(code);
    const payload = {
      message: sha ? `Update ${filepath}` : `Add ${filepath}`,
      content: encodedContent,
      branch: "main"
    };
    if (sha) payload.sha = sha;
    const putResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!putResponse.ok) {
      const errorData = await putResponse.json();
      throw new Error(errorData.message || `Failed to upload ${filepath}`);
    }
    return true;
  } catch (error) {
    notify("Upload error: " + error.message);
    return false;
  }
}

// Delete a file from GitHub using the API
async function deleteFileFromGithub(repoUrl, filepath, githubToken) {
  try {
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0];
    const repoName = parts[1];
    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filepath}`;
    const getResponse = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (!getResponse.ok) {
      const errorData = await getResponse.json();
      throw new Error(errorData.message || `Failed to get file info for ${filepath}`);
    }
    const fileData = await getResponse.json();
    const fileSha = fileData.sha;
    const payload = { message: `Delete ${filepath}`, sha: fileSha, branch: "main" };
    const deleteResponse = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(errorData.message || `Failed to delete ${filepath}`);
    }
    return true;
  } catch (error) {
    notify("Delete file error: " + error.message);
    return false;
  }
}

// Handler for chat form submission
document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  if (!message) return;
  appendChatEntry("user", message);
  messageInput.value = "";
  
  // Send message to AI
  const aiResponse = await sendMessageToAI(message);
  if (!aiResponse) return;
  appendChatEntry("assistant", aiResponse);
  conversationMemory.push({ role: "user", content: message });
  conversationMemory.push({ role: "assistant", content: aiResponse });
  
  // Process code blocks and upload files
  const projectName = extractProjectName(aiResponse);
  const codeBlocks = extractCodeBlocks(aiResponse);
  if (codeBlocks.length === 0) {
    notify("No code blocks extracted from AI response.", "info");
    return;
  }
  const githubToken = githubTokenInput.value.trim();
  if (!githubToken) {
    notify("Please enter your GitHub Token in the API Settings.");
    return;
  }
  let repoUrl = repoUrlCache[projectName];
  if (!repoUrl) {
    repoUrl = await createGithubRepo(projectName, githubToken);
    if (!repoUrl) {
      notify("Repository creation failed.");
      return;
    }
    repoUrlCache[projectName] = repoUrl;
  }
  for (const block of codeBlocks) {
    const success = await uploadFileToGithub(repoUrl, block.filename, block.code, githubToken);
    if (success) {
      notify(`File ${block.filename} uploaded successfully.`, "success");
    }
  }
});

// Handler for delete form submission
document.getElementById("delete-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const filepath = document.getElementById("filepath").value.trim();
  const projectName = document.getElementById("projectName").value.trim();
  const githubToken = githubTokenInput.value.trim();
  if (!githubToken) {
    notify("Please enter your GitHub Token in the API Settings.");
    return;
  }
  let repoUrl = repoUrlCache[projectName];
  if (!repoUrl) {
    repoUrl = await createGithubRepo(projectName, githubToken);
    if (!repoUrl) {
      notify("Repository creation failed.");
      return;
    }
    repoUrlCache[projectName] = repoUrl;
  }
  const success = await deleteFileFromGithub(repoUrl, filepath, githubToken);
  if (success) {
    notify(`File ${filepath} deleted successfully.`, "success");
  }
});
