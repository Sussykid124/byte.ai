
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

let conversationMemory = [];
const repoUrlCache = {};

// Utility: display notifications
function notify(message, type = "error") {
  notifications.textContent = message;
  notifications.style.color = type === "error" ? "#d9534f" : "#28a745";
  setTimeout(() => { notifications.textContent = ""; }, 5000);
}

// Append a chat entry
function appendChatEntry(role, text) {
  const entry = document.createElement("div");
  entry.classList.add("chat-entry", role);
  entry.innerHTML = `<strong>${role.charAt(0).toUpperCase() + role.slice(1)}:</strong> ${text}`;
  chatHistory.appendChild(entry);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// OpenRouter API: send message
async function sendMessageToAI(message) {
  // Use the OpenRouter API key from the account page (or save it in the chat page if desired)
  const openrouterKeyInput = document.getElementById("openrouterKey");
  const openrouterKey = openrouterKeyInput ? openrouterKeyInput.value.trim() : "";
  if (!openrouterKey) {
    notify("Please enter your OpenRouter API Key in your account page.");
    return "";
  }
  const systemPrompt = {
    role: "system",
    content: "You are Byte.ai, an advanced AI specialized in software development. Your response must include code blocks wrapped in triple backticks with a '# FILE:' marker at the start and a '# PROJECT:' marker outside the code blocks. Do not include any extra commentary."
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

// GitHub repository creation and file upload functions remain as previously defined
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
  // Further processing (e.g., uploading code blocks) can be added here if needed.
});

// Listen for auth state changes on chat page
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
