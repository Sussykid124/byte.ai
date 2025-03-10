
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements for Account Page
const accountContainer = document.getElementById("account-container");
const authContainer = document.getElementById("auth-container");
const userEmailSpan = document.getElementById("user-email");
const signOutBtn = document.getElementById("sign-out-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
const deleteAccountBtn = document.getElementById("delete-account-btn");
const googleBtn = document.getElementById("google-signin");
const githubBtn = document.getElementById("github-signin");
const emailSignInBtn = document.getElementById("email-signin");
const emailSignUpBtn = document.getElementById("email-signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const openrouterKeyInput = document.getElementById("openrouterKey");
const githubTokenInput = document.getElementById("githubToken");
const saveApiKeysBtn = document.getElementById("save-api-keys");
const notifications = document.getElementById("notifications");

// Utility function for notifications
function notify(message, type = "error") {
  notifications.textContent = message;
  notifications.style.color = type === "error" ? "#d9534f" : "#28a745";
  setTimeout(() => { notifications.textContent = ""; }, 5000);
}

// Auth Handlers (similar to index.js)
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
    const credential = firebase.auth.GithubAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      const user = result.user;
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

deleteAccountBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user && confirm("Are you sure you want to delete your account? This cannot be undone.")) {
    try {
      await user.delete();
      notify("Account deleted successfully.", "success");
    } catch (error) {
      notify("Delete account error: " + error.message);
    }
  } else {
    notify("No user is signed in.");
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
    accountContainer.classList.remove("hidden");
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
    accountContainer.classList.add("hidden");
  }
});
